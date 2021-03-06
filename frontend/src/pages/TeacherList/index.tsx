import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

const TeacherList = () => {
   const [subject, setSubject] = useState("")
   const [weekDay, setWeekDay] = useState("")
   const [time, setTime] = useState("")
   const [teachers, setTeachers] = useState([])

   const searchTeachers = async (e: FormEvent) => {
      e.preventDefault()

      const response = await api.get(`/classes`, {
         params: {
            subject,
            weekDay,
            time
         }
      })

      setTeachers(response.data)
   }

   return (
      <div id="page-teacher-list" className="container">
         <PageHeader title="Estes são os proffys disponíveis.">
            <form id="search-teachers" onSubmit={searchTeachers}>
               <Select
                  name="subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  label="Matéria"
                  options={[
                     { value: "Artes", label: "Artes" },
                     { value: "Biologia", label: "Biologia" },
                     { value: "Ciências", label: "Ciências" },
                     { value: "Ed. Física", label: "Ed. Física" },
                     { value: "Física", label: "Física" },
                     { value: "Química", label: "Química" },
                     { value: "Matemática", label: "Matemática" },
                     { value: "Português", label: "Português" },
                     { value: "História", label: "História" },
                     { value: "Geografia", label: "Geografia" },
                  ].sort((a, b) => a.label < b.label ? -1 : 1)}
               />
               <Select
                  name="weekDay"
                  value={weekDay}
                  onChange={e => setWeekDay(e.target.value)}
                  label="Dia da semana"
                  options={[
                     { value: "0", label: "Domingo" },
                     { value: "1", label: "Segunda-feira" },
                     { value: "2", label: "Terça-feira" },
                     { value: "3", label: "Quarta-feira" },
                     { value: "4", label: "Quinta-feira" },
                     { value: "5", label: "Sexta-feira" },
                     { value: "6", label: "Sábado" },
                  ].sort((a, b) => a.value < b.value ? -1 : 1)}
               />
               <Input
                  type="time"
                  name="time"
                  label="Hora"
                  value={time}
                  onChange={e => setTime(e.target.value)}
               />
               <button type="submit">
                  Buscar
               </button>
            </form>
         </PageHeader>

         <main>
            {teachers.map((teacher: Teacher) => (
               <TeacherItem key={teacher.id} teacher={teacher} />
            ))}
         </main>
      </div>
   )
}

export default TeacherList
