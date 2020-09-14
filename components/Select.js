import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'



export const Select = (props) => {
  const [selected,setSelected] = useState(props.initial)
  const [visible,setVisible] = useState(false)

  useEffect( () => {

  })

  const onSelect = ( value ) => {
    setSelected(value)
    setVisible(false)
    props.onselect( value )
  }


  const Items = props.items.map(( item, index ) => {
    const id = new Date().getTime();
    return (
      <TouchableOpacity style={selectStyles.item} onPress={() => {
        onSelect(item.value)
      }}
      >
        <Text key={id}>{item.label}</Text>
      </TouchableOpacity>
    )
  })

    

  return (
    <View style={selectStyles.selectView}>
      <TouchableOpacity onPress={()=>{ setVisible(true) }}>
        <Text>{ selected ? selected : 'select'}</Text>
      </TouchableOpacity>
      <Image source={ require('../assets/chevron-circle-down-solid.png') } style={selectStyles.selectImage}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        transparent={true}
      >
        <View style={selectStyles.modalView}>
          <ScrollView>
            {Items}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const selectStyles = StyleSheet.create({
  selectView: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'relative'
  },
  selectImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalView: {
    backgroundColor: 'white',
    marginTop: 100,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 999999,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
})