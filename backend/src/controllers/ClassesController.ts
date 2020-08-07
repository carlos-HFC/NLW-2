import { Request, Response } from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"

interface ScheduleItem {
   weekDay: number
   from: string
   to: string
}

class ClassesController {
   async index(req: Request, res: Response) {
      const filters = req.query
      const subject = filters.subject as string
      const weekDay = filters.weekDay as string
      const time = filters.time as string

      if (!subject || !weekDay || !time) {
         return res.status(400).json({ error: "Você não filtrou a(s) aula(s) desejada(s)" })
      }

      const timeInMinutes = convertHourToMinutes(time)

      // console.log(timeInMinutes)

      const classes = await db('classes')
         .whereExists(function () { //RETORNA APENAS SE EXISTE
            this.select('class_schedule.*')
               .from('class_schedule')
               .whereRaw('`class_schedule`.`classId` = `classes`.`id`')
               .whereRaw('`class_schedule`.`weekDay` = ??', [Number(weekDay)]) //ONDE O DIA DA SEMANA SEJA IGUAL AO QUE FOI CADASTRADO
               .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) //ONDE A HORA INICIAL SEJA MENOR OU IGUAL
               .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) //ONDE A HORA FINAL SEJA MAIOR
         })
         .where('classes.subject', '=', subject)
         .join('users', 'classes.userId', '=', 'users.id')
         .select(['classes.*', 'users.*'])

      return res.json(classes)
   }

   async create(req: Request, res: Response) {
      const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body

      /* 
      EXECUTARÁ TODAS AS REQUISIÇÕES
      CASO ALGUMA REQUISIÇÃO DÊ ERRO, ELE REVERTE O QUE JÁ FOI INSERIDO
      */
      const trx = await db.transaction()

      try {
         const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
         })

         const userId = insertedUsersIds[0]

         const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            userId
         })

         const classId = insertedClassesIds[0]

         const classSchedule = schedule.map((item: ScheduleItem) => {
            return {
               classId,
               weekDay: item.weekDay,
               from: convertHourToMinutes(item.from),
               to: convertHourToMinutes(item.to),
            }
         })

         await trx('class_schedule').insert(classSchedule)

         //EFETUA TODAS AS ALTERAÇÕES NO BANCO, AQUI SERÁ EFETUADA A INSERÇÃO
         await trx.commit()

         return res.status(201).send()
      } catch (error) {
         //VAI DESFAZER QUALQUER ALTERAÇÃO QUE HOUVE NO BANCO ANTERIORMENTE
         await trx.rollback()
         return res.status(400).json({ error: "Erro inesperado ao criar uma nova aula" })
      }
   }
}

export default new ClassesController()