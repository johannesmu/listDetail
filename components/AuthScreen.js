import React, { useState } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const AuthScreen = ( props ) => {
  const [login,setLogin] = useState(false)

  if (!login) {
    return (
      // register view
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput style={styles.input} placeholder="you@email.com" /> 
        <TextInput 
          style={styles.input}
          placeholder="min 8 characters" 
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.altText}>Already have an account?</Text>
        <TouchableOpacity style={styles.altButton}>
          <Text style={styles.altButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      // login view
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput style={styles.input} placeholder="you@email.com" /> 
        <TextInput 
          style={styles.input}
          placeholder="min 8 characters" 
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.altText}>Don't have an account?</Text>
        <TouchableOpacity style={styles.altButton}>
          <Text style={styles.altButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#777777',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#444444',
  },
  buttonText: {
    color: '#eeeeee',
    textAlign: 'center',
  },
  altText : {
    textAlign: 'center',
    marginTop: 20,
  },
  altButton: {
    marginTop: 10,
    padding: 10,
  },
  altButtonText: {
    color: 'blue',
    textAlign: 'center',
  }
})