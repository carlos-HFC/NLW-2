import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import TeacherList from '../pages/TeacherList'
import Favorites from '../pages/Favoites'

const { Navigator, Screen } = createBottomTabNavigator()

export default function StudyTabs() {
   return (
      <Navigator
         tabBarOptions={{
            style: {
               elevation: 0, //BOX-SHADOW DO CSS
               shadowOpacity: 0,
               height: 64
            },
            tabStyle: {
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "center"
            },
            iconStyle: {
               flex: 0,
               width: 20,
               height: 20,
            },
            labelStyle: {
               fontFamily: "Archivo_700Bold",
               fontSize: 13,
               marginLeft: 16
            },
            inactiveBackgroundColor: "#fafafc", //BACKGROUND QUANDO INATIVO
            inactiveTintColor: "#c1bccc", //COR DO TEXTO QUANDO INATIVO
            activeBackgroundColor: "#ebebf5", //BACKGROUND QUANDO ATIVO
            activeTintColor: "#32264d", //COR DO TEXTO QUANDO ATIVO
         }}
      >
         <Screen
            options={{
               tabBarLabel: "Proffys", //LABEL DA TAB
               tabBarIcon: ({ color, size, focused }) => {
                  return (
                     <Ionicons name="ios-easel" size={size} color={focused ? "#8257e5" : color} />
                  )
               }
            }}
            name="TeacherList"
            component={TeacherList}
         />
         <Screen
            options={{
               tabBarLabel: "Favoritos", //LABEL DA TAB
               tabBarIcon: ({ color, size, focused }) => {
                  return (
                     <Ionicons name="ios-heart" size={size} color={focused ? "#8257e5" : color} />
                  )
               }
            }}
            name="Favorites"
            component={Favorites}
         />
      </Navigator>
   )
}
