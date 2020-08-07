import { Request, Response } from "express";

import db from "../database/connection";

class ConnectionsController {
   async index(req: Request, res: Response) {
      const totalConnections = await db('connections').count('* as total')

      const { total } = totalConnections[0]

      return res.json({ total })
   }

   async create(req: Request, res: Response) {
      const { userId } = req.body

      await db('connections').insert({
         userId
      })

      return res.status(201).send()
   }
}

export default new ConnectionsController()