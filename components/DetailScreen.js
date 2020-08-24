import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const DetailScreen = ( props ) => {
  return (
    <View>
      <Text>Detail page</Text>
      <Text>id: {props.route.params.id}</Text>
      <Text>amount: {props.route.params.amount}</Text>
      <Text>category: {props.route.params.category}</Text>
      <Text>note: {props.route.params.note}</Text>
    </View>
  )
}