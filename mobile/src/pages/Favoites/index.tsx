import React, { useState, useCallback } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

export default function Favorites() {
   const [favorites, setFavorites] = useState([])

   useFocusEffect(
      useCallback(() => {
         loadFavorites()
      }, [])
   )

   function loadFavorites() {
      /* 
      POR PADRÃO, O DISPOSITIVO MÓVEL SALVA COMO TEXTO POR NÃO SER UM BANCO DE DADOS
      A MELHOR FORMA É BUSCAR TODOS OS DADOS E CONVERTER EM JSON
      */
      AsyncStorage.getItem("favorites").then(response => {
         if (response) {
            const favoritedTeachers = JSON.parse(response)

            setFavorites(favoritedTeachers)
         }
      })
   }
   return (
      <View style={styles.container}>
         <PageHeader title="Meus proffys favoritos" />

         <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
               paddingHorizontal: 16,
               paddingBottom: 16
            }}
         >
            {favorites.map((teacher: Teacher) => {
               return (
                  <TeacherItem
                     key={teacher.id}
                     teacher={teacher}
                     favorited
                  />
               )
            })}
         </ScrollView>
      </View>
   )
}
