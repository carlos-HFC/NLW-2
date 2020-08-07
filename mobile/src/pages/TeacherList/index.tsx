import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

export default function TeacherList() {
   const [filterVisible, setFilterVisible] = useState(false)
   const [subject, setSubject] = useState("")
   const [weekDay, setWeekDay] = useState("")
   const [time, setTime] = useState("")
   const [teachers, setTeachers] = useState([])
   const [favorites, setFavorites] = useState<number[]>([])

   function loadFavorites() {
      /* 
      POR PADRÃO, O DISPOSITIVO MÓVEL SALVA COMO TEXTO POR NÃO SER UM BANCO DE DADOS
      A MELHOR FORMA É BUSCAR TODOS OS DADOS E CONVERTER EM JSON
      */
      AsyncStorage.getItem("favorites").then(response => {
         if (response) {
            const favoritedTeachers = JSON.parse(response)
            const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)

            setFavorites(favoritedTeachersIds)
         }
      })
   }

   function handleToggleFilters() {
      setFilterVisible(!filterVisible)
   }

   async function handleFiltersSubmit() {
      loadFavorites()
      const response = await api.get("/classes", {
         params: {
            subject: subject.trim(),
            weekDay,
            time
         }
      })

      setFilterVisible(false)
      setTeachers(response.data)
   }

   return (
      <View style={styles.container}>
         <PageHeader
            title="Proffys disponíveis"
            headerRight={(
               <BorderlessButton onPress={handleToggleFilters}>
                  <Feather name="filter" color="#fff" size={20} />
               </BorderlessButton>
            )}
         >
            {filterVisible && (
               <View style={styles.searchForm}>
                  <Text style={styles.label}>Matéria</Text>
                  <TextInput
                     style={styles.input}
                     value={subject}
                     onChangeText={text => setSubject(text)}
                     placeholder="Qual a matéria?"
                     placeholderTextColor="#c1bccc"
                  />

                  <View style={styles.inputGroup}>
                     <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                        <TextInput
                           style={styles.input}
                           value={weekDay}
                           onChangeText={text => setWeekDay(text)}
                           placeholder="Qual o dia?"
                           placeholderTextColor="#c1bccc"
                        />
                     </View>

                     <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput
                           style={styles.input}
                           value={time}
                           onChangeText={text => setTime(text)}
                           placeholder="Qual horário?"
                           placeholderTextColor="#c1bccc"
                        />
                     </View>
                  </View>

                  <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                     <Text style={styles.submitButtonText}>Filtrar</Text>
                  </RectButton>
               </View>
            )}
         </PageHeader>

         <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
               paddingHorizontal: 16,
               paddingBottom: 16
            }}
         >
            {teachers.map((teacher: Teacher) => {
               return (
                  <TeacherItem
                     key={teacher.id}
                     teacher={teacher}
                     favorited={favorites.includes(teacher.id)}
                  />
               )
            })}
         </ScrollView>
      </View>
   )
}
