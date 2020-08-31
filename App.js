import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// firebase config
import {firebaseConfig} from './config/firebase'
// firebase library
import * as firebase from 'firebase'
// initialise app
// if ( !firebase.app.length ){
  firebase.initializeApp( firebaseConfig )
// }

import { HomeScreen } from './components/HomeScreen'
import { DetailScreen } from './components/DetailScreen'
import { AuthScreen } from './components/AuthScreen'

const Data = [
  {
    "amount": 50,
    "category": "food",
    "id": "1598241633",
    "note": "buying lunch"
  },
  {
    "amount": 20,
    "category": "transport",
    "id": "1598241768",
    "note": "catching train"
  },
  {
    "amount": 80,
    "category": "groceries",
    "id": "1598241782",
    "note": "shopping at Coles"
  },
  {
    "amount": 13,
    "category": "food",
    "id": "1598241795",
    "note": "snack time"
  },
  {
    "amount": 35,
    "category": "entertainment",
    "id": "1598241806",
    "note": "buying Untitled Goose"
  },
  {
    "amount": 350,
    "category": "rent",
    "id": "1598241817",
    "note": "weeks rent"
  },
  {
    "amount": 60,
    "category": "transport",
    "id": "1598241827",
    "note": "topping up Opal card"
  },
  {
    "amount": 30,
    "category": "food",
    "id": "1598241841",
    "note": "buying dinner"
  }
]

export default function App() {
  const listData = Data

  const register = (email,password) => {
    firebase.auth().createUserWithEmailAndPassword( email, password )
    .catch( error => console.log(error) )
  }

  firebase.auth().onAuthStateChanged( (user) => {
    if( user ) {
      console.log('user logged in')
    }
    else {
      console.log('user not logged in')
    }
  } )

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register">
          { (props) => <AuthScreen {...props} signup={ register } /> }
        </Stack.Screen>
        <Stack.Screen name="Home">
          { (props) => <HomeScreen {...props} text="Hello Home Screen" data={listData} /> }
        </Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
