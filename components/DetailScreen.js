import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DateFormat } from './DateFormat'
import { Select } from './Select'

export const DetailScreen = ( props ) => {
  const [amount,setAmount] = useState(props.route.params.amount)
  const [editing,setEditing] = useState(false)
  const [note,setNote] = useState(props.route.params.note)

  const navigation = useNavigation()

  return (
    <View>
      <Text style={[styles.amount ]}>
        $ {amount}
      </Text>
      <TextInput 
        style={[styles.amount, { display: editing ? 'flex' : 'none'}]} 
        placeholder={props.route.params.amount}
        onChangeText={ (amount) => { setAmount(amount) }}
      />
      <Button 
        title={ editing? "save" : "edit" } 
        onPress={ () => { 
          if( editing ) {
            setEditing(false)
            let item = {
              amount: amount,
              note: props.route.params.note,
              category: props.route.params.category,
              id: props.route.params.id
            }
            // use the update function passed to this component
            props.update( item )
          }
          else {
            setEditing(true) 
          }
        } } 
      />
      <DateFormat date={props.route.params.id} styling={styles.date} />
      <Text style={styles.date}>{props.route.params.category}</Text>
      <Text style={styles.date}>{note}</Text>
      <TextInput style={styles.data} />
      <Button title="edit" />
      <Button 
        title="Delete" 
        onPress={ () => { 
          props.delete(props.route.params.id) 
          navigation.goBack()
        }}
      />
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