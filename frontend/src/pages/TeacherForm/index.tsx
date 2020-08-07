import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import WarningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

const TeacherForm = () => {
   const history = useHistory()
   const [scheduleItems, setScheduleItems] = useState([
      { weekDay: 0, from: "", to: "" },
   ])

   const [name, setName] = useState("")
   const [avatar, setAvatar] = useState("")
   const [whatsapp, setWhatsapp] = useState("")
   const [bio, setBio] = useState("")

   const [subject, setSubject] = useState("")
   const [cost, setCost] = useState("")

   const addNewScheduleItem = () => {
      setScheduleItems([
         ...scheduleItems,
         { weekDay: 0, from: "", to: "" }
      ])
   }

   const handleCreateClass = (e: FormEvent) => {
      e.preventDefault()

      api.post("/classes", {
         name,
         avatar,
         whatsapp,
         bio,
         subject,
         cost: Number(cost),
         schedule: scheduleItems
      })
         .then(() => {
            alert("Cadastro realizado com sucesso")
            return history.push('/')
         })
         .catch(() => alert("Erro ao cadastrar"))
   }

   const setScheduleItemValue = (index: number, field: string, value: string) => {
      const arr = scheduleItems.map((item, i) => {
         if (i === index) {
            return { ...item, [field]: value }
         }

         return item
      })

      setScheduleItems(arr)
   }

   return (
      <div id="page-teacher-form" className="container">
         <PageHeader
            title="Que incrível que você quer dar aulas."
            description="O primeiro passo é preencher esse formulário de inscrição"
         />

         <main>
            <form onSubmit={handleCreateClass}>
               <fieldset>
                  <legend>Seus dados</legend>
                  <Input name="name" label="Nome Completo" onChange={e => setName(e.target.value)} value={name} />
                  <Input name="avatar" label="Avatar" onChange={e => setAvatar(e.target.value)} value={avatar} />
                  <Input name="whatsapp" label="WhatsApp" onChange={e => setWhatsapp(e.target.value)} value={whatsapp} />
                  <Textarea name="bio" label="Biografia" onChange={e => setBio(e.target.value)} value={bio} />
               </fieldset>

               <fieldset>
                  <legend>Sobre a aula</legend>
                  <Select
                     name="subject"
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
                     value={subject}
                     onChange={e => setSubject(e.target.value)}
                  />
                  <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => setCost(e.target.value)} />
               </fieldset>

               <fieldset>
                  <legend>
                     Horários disponíveis
                     <button type="button" onClick={addNewScheduleItem}>
                        + Novo horário
                     </button>
                  </legend>

                  {scheduleItems.map((item, i) => (
                     <div className="schedule-item" key={item.weekDay}>
                        <Select
                           name="weekDay"
                           label="Dia da semana"
                           value={item.weekDay}
                           onChange={e => setScheduleItemValue(i, 'weekDay', e.target.value)}
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
                        <Input name="from" label="Das" type="time" value={item.from} onChange={e => setScheduleItemValue(i, 'from', e.target.value)} />
                        <Input name="to" label="Até" type="time" value={item.to} onChange={e => setScheduleItemValue(i, 'to', e.target.value)} />
                     </div>
                  ))}
               </fieldset>

               <footer>
                  <p>
                     <img src={WarningIcon} alt="Aviso importante" />
                     Importante! <br />
                     Preencha todos os dados
                  </p>
                  <button type="submit">
                     Salvar cadastro
                  </button>
               </footer>
            </form>
         </main>
      </div>
   )
}

export default TeacherForm
