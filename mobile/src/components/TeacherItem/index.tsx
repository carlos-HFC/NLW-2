import React, { useState } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api'

export interface Teacher {
   id: number
   avatar: string
   bio: string
   name: string
   subject: string
   whatsapp: string
   cost: number
}

interface TeacherProps {
   teacher: Teacher
   favorited: boolean
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher, favorited }) => {
   const [isFavorite, setIsFavorite] = useState(favorited)

   function handleLinkWhats() {
      api.post("/connections", {
         userId: teacher.id
      })

      Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`)
   }

   async function handleToggleFavorite() {
      let arr = []
      const favorites = await AsyncStorage.getItem("favorites") //PEGAR TODOS OS FAVORITADOS

      if (favorites) { //VERIFICAR SE HÁ ALGUM FAVORITADO
         arr = JSON.parse(favorites) //SE TEM, ADICIONA OS FAVORITOS A VARIÁVEL
      }

      if (isFavorite) {
         const favIndex = arr.findIndex((fav: Teacher) => { //VERIFICO O ÍNDICE DO PROFESSOR NO ARRAY
            return fav.id === teacher.id
         })

         arr.splice(favIndex, 1) //REMOVO O PROFESSOR DO ARRAY DE FAVORITOS
         setIsFavorite(false) //MARCO COMO NÃO FAVORITO
      } else {
         arr.push(teacher) //ADICIONA O NOVO PROFESSOR AO ARRAY DE FAVORITOS

         setIsFavorite(true) //MARCO QUE ELE ESTÁ FAVORITADO
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(arr)) //ENVIA O NOVO ARRAY COMO TEXTO PARA O DISPOSITIVO
   }

   return (
      <View style={styles.container}>
         <View style={styles.profile}>
            <Image
               style={styles.avatar}
               source={{ uri: teacher.avatar }}
            />

            <View style={styles.profileInfo}>
               <Text style={styles.name}>{teacher.name}</Text>
               <Text style={styles.subject}>{teacher.subject}</Text>
            </View>
         </View>

         <Text style={styles.bio}>{teacher.bio}</Text>

         <View style={styles.footer}>
            <Text style={styles.price}>
               Preço/hora {'   '}
               <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
            </Text>

            <View style={styles.buttonsContainer}>
               <RectButton
                  onPress={handleToggleFavorite}
                  style={[
                     styles.favoriteButton,
                     isFavorite ? styles.favorited : {}
                  ]}
               >
                  {
                     isFavorite
                        ? <Image source={unfavoriteIcon} />
                        : <Image source={heartOutlineIcon} />
                  }
               </RectButton>

               <RectButton style={styles.contactButton} onPress={handleLinkWhats}>
                  <Image source={whatsappIcon} />
                  <Text style={styles.contactButtonText}>Entrar em contato</Text>
               </RectButton>
            </View>
         </View>
      </View>
   )
}

export default TeacherItem