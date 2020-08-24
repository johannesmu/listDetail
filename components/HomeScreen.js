import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const HomeScreen = (props) => {
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

  return (
    <View>
      <Text>{props.text}</Text>
      {/* <Button title="Go to Detail" onPress={() => {navigation.navigate("Detail")}} /> */}
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
  item: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})