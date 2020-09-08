import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


export const Select = (props) => {
  const [selected,setSelected] = useState(props.initial)
  const [open,setOpen] = useState(false)

  useEffect( () => {

  })

  const Items = props.items.map(( item, index ) => {
    return (
      <TouchableOpacity style={selectStyles.item}>
        <Text key={index}>{item.label}</Text>
      </TouchableOpacity>
    )
  })

  const toggleMenu = () => {
    if( !open ) {
      setOpen(true)
    }
    else{
      setOpen(false)
    }
  }
    

  return (
    <View style={selectStyles.selectView}>
      <TouchableOpacity onPress={()=>{ toggleMenu() }}>
        <Text>select</Text>
      </TouchableOpacity>
      <View style={[selectStyles.itemsView,{display: open ? 'flex' : 'none'}]}>
        <ScrollView>
          {Items}
        </ScrollView>
      </View>
    </View>
  )
}

const selectStyles = StyleSheet.create({
  selectView: {
    position: 'relative',
    zIndex: 999999,
  },
  itemsView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: '100%',
    width: '100%',
    zIndex: 9999,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
})