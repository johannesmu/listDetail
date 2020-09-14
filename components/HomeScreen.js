import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {Select} from './Select'



export const HomeScreen = (props) => {
  const selectItems = [
    {label: "Food", value: "food"},
    {label: "Transport", value: "transport"},
    {label: "Groceries", value: "groceries"},
    {label: "Bills", value: "bills"},
    {label: "Entertainment", value: "entertainment"},
    {label: "Fuel", value: "fuel"},
  ]

  const [category,setCategory] = useState(null)
  const [amount,setAmount] = useState(0)
  const [note,setNote] = useState(null)

  const [validAmount,setValidAmount] = useState(false)

  const navigation = useNavigation()

  const renderList = ({item}) => (
    <ListItem 
    id={item.id} 
    amount={item.amount} 
    category={item.category} 
    clickHandler = {showDetail}
    item = {item}
    />
  )
  
  const showDetail = ( item ) => {
    navigation.navigate("Detail", item )
  }

  const validateAmount = (amount) => {
    if(parseFloat(amount)) {
      setValidAmount(true)
      setAmount(amount)
    }
    else{
      setValidAmount(false)
    }
  }

  const categorise = ( val ) => {
    setCategory(val)
  }

  useEffect( () => {
    
  })

  return (
    <View style={homeStyle.container}>
      <View>
        <TextInput 
        style={homeStyle.input} 
        placeholder="amount" 
        onChangeText={ (amount) => validateAmount(amount) }
        />        
        <Select items={selectItems} onselect={categorise} />
        <TextInput 
          style={homeStyle.input} 
          placeholder="notes" 
          onChangeText={ (note) => setNote(note)}
        />
        <TouchableOpacity style={ validAmount ? homeStyle.button : homeStyle.buttonDisabled }>
          <Text style={homeStyle.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data = {props.data}
      renderItem = {renderList} 
      keyExtractor = { item => item.id }
      />
    </View>
  )
}

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={ () => props.clickHandler(props.item) }>
      <View style={homeStyle.item}>
        <Text>{props.category}</Text>
        <Text>$ {props.amount}</Text>
      </View>
    </TouchableOpacity>
  )
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    opacity: 0.5,
  },
  buttonText: {
    textAlign: 'center',
  },
})