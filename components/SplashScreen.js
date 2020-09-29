import React, { useState, useEffect } from 'react'
import {StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const SplashScreen = (props) => {
  const navigation = useNavigation()

  useEffect(()=>{
    props.loggedIn.onAuthStateChanged((user)=> {
      if(user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home"}]
        })
      }
      else{
        navigation.reset({
          index: 0,
          routes: [{ name: "Register"}]
        })
      }
    })
  })

  return (
    <View style={splashStyle.container}>
      <Text style={splashStyle.splashText}>Expenses</Text>
      <ActivityIndicator size="large" color="white"/>
    </View>
  )
}

const splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33ffcc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splashText: {
    fontSize: 24,
    color: 'white',
    marginVertical: 15,
  }
})