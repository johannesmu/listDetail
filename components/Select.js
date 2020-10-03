import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'

export const Select = (props) => {
  const [selected, setSelected] = useState( props.default )
  const [visible, setVisible] = useState(false)
  const [addNew, setAddNew] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
  //setSelected(props.default)
  })

  const Items = props.items.map((item, index) => {
    return (
      <TouchableOpacity
        style={[item.value == selected ? selectStyles.active : selectStyles.selectItem]}
        key={index}
        onPress={() => {
          setSelected(item.value)
          setPressed(true)
          props.onSelect(item.value)
          setVisible(false)
          setAddNew(false)
        }}
      >
        <Text style={item.value == selected ? selectStyles.activeText : ''} >{item.label}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <View style={selectStyles.selectView}>
      <TouchableOpacity onPress={() => {
        setVisible(true)
        }} >
        <Text>{selected}</Text>
        <Image
          style={selectStyles.selectImage}
          source={require('../assets/chevron-circle-down-solid.png')}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
      >
        <View style={selectStyles.modalView}>
          <View style={selectStyles.modalHeader}>
            <Text style={selectStyles.modalTitle}>Select a category</Text>
            <TouchableOpacity onPress={()=> {setVisible(false)}}>
              <Image style={selectStyles.modalHeaderButton} source={require('../assets/times-solid.png')} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {Items}
            <TextInput 
              style={[ selectStyles.newInput,{ display: addNew ? 'flex' : 'none' }]} 
              placeholder="new category name" 
            />
          </ScrollView>
          <TouchableOpacity style={selectStyles.new} onPress={()=>{ setAddNew( addNew ? false: true) }}>
            <Text style={selectStyles.newText}>
              { addNew ? 'Save' : 'Add a new category'}
            </Text>
          </TouchableOpacity>
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
    borderRadius: 10,
  },
  selectImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 3,
    top: 3,
  },
  selectItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  active: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    backgroundColor: '#33ffcc',
  },
  activeText: {
    color: '#333333',
  },
  modalView: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalHeaderButton: {
    width: 30,
    height: 30,
  },
  modalTitle: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  new: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#33ffcc',
  },
  newText: {
    textAlign: 'center',
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
})