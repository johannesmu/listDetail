import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DateFormat } from './DateFormat'

export const DetailScreen = ( props ) => {
  return (
    <View>
      <Text style={styles.amount}>$ {props.route.params.amount}</Text>
      <DateFormat date={props.route.params.id} styling={styles.date} />
      <Text>category: {props.route.params.category}</Text>
      <Text>note: {props.route.params.note}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  amount: {
    textAlign: 'center',
    fontSize: 32,
    marginVertical: 15,
  },
  date: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '700',
  },
})