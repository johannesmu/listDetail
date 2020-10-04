import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const ExpenseItem = (props) {
  return (
    <TouchableOpacity onPress={ () => props.clickHandler(props.item) }>
      <View>
        <Text>{props.category}</Text>
        <Text>$ {props.amount}</Text>
      </View>
    </TouchableOpacity>
  )
}