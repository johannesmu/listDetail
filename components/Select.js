import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


export const Select = (props) => {
  const [selected,setSelected] = useState(props.initial)
  const [open,setOpen] = useState(false)

  useEffect( () => {

  })

const Items = props.items.map(( item, index ) => {
  return (<Text key={index}>{item.label}</Text>)
})
    

  return (
    <View>
      <TouchableOpacity>
        <TextInput value={selected}/>
      </TouchableOpacity>
      <View>
        <ScrollView>
          {Items}
        </ScrollView>
      </View>
    </View>
  )
}