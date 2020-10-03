import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DateFormat } from './DateFormat'
import { Select } from './Select'

export const DetailScreen = (props) => {
  const [amount, setAmount] = useState(props.route.params.amount)
  const [category, setCategory] = useState(props.route.params.category)
  const [note, setNote] = useState(props.route.params.note)
  const [editing, setEditing] = useState(false)
  const [edited, setEdited] = useState(false)

  const navigation = useNavigation()

  // variables for fields ref
  let _amountRef = null

  useEffect(() => {
    // console.log('effect')
  })

  const resetValues = () => {
    setAmount(props.route.params.amount)
    setNote(props.route.params.note)
    setCategory(props.route.params.category)
  }

  const changeCategory = (value) => {
    setEdited(true)
    setCategory(value)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>You spent </Text>
      <View style={styles.amountView}>
        <Text style={styles.amount}>$</Text>
        <TextInput
          style={[styles.amountInput]}
          placeholder={props.route.params.amount}
          keyboardType="decimal-pad"
          onChangeText={(amount) => {
            setAmount(amount)
            setEdited(true)
          }}
          value={amount}
          ref={(component) => (_amountRef = component)}
        />
      </View>
      <View style={[styles.row, styles.center]}>
        <Text>On</Text>
        <DateFormat date={props.route.params.id} styling={styles.date} />
      </View>
      <Text style={styles.textCenter}>in category</Text>
      <View style={styles.categoryView}>
        <Select items={props.categories} onSelect={changeCategory} default={category} />
      </View>
      <Text style={styles.textCenter}>with note</Text>

      <TextInput 
      style={[styles.textCenter, styles.noteInput]} 
      value={note} 
      onChangeText={(text) => {
        setEdited(true)
        setNote(text)
      }}
      />

      <View style={[styles.row, styles.bottom]}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            props.delete(props.route.params.id)
            navigation.goBack()
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, edited ? '' : styles.saveButtonDisabled]}
          disabled={edited ? false : true}
          onPress={() => {
            navigation.goBack()
            let item = {
              amount: amount,
              note: note,
              category: category,
              id: props.route.params.id,
            }
            if (edited) {
              props.update(item)
            }
          }}
        >
          <Text
            style={[
              styles.buttonText,
              edited ? { color: 'black' } : { color: '#cccccc' },
            ]}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            resetValues()
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  detailTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 15,
  },
  amountView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  amount: {
    textAlign: 'center',
    fontSize: 32,
    marginVertical: 15,
  },
  amountInput: {
    fontSize: 32,
    marginVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  date: {
    textAlign: 'center',
    fontWeight: '700',
    marginHorizontal: 5,
  },
  categoryView: {
    width: 280,
    marginVertical: 15,
  },
  noteInput: {
    width: 280,
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  center: {
    justifyContent: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#cccccc',
    flex: 1,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#33ffcc',
    flex: 2,
    borderRightWidth: 1,
    borderColor: 'white',
    borderLeftWidth: 1,
  },
  saveButtonDisabled: {
    backgroundColor: '#c0f9eb',
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#cccccc',
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
})
