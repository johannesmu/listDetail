import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// firebase config
import {firebaseConfig} from './config/firebase'
// firebase library
import * as firebase from 'firebase'
// initialise app
if ( !firebase.apps.length ){
  firebase.initializeApp( firebaseConfig )
}

import { HomeScreen } from './components/HomeScreen'
import { DetailScreen } from './components/DetailScreen'
import { AuthScreen } from './components/AuthScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {

  const [auth,setAuth] = useState(false)
  const [dataRef,setDataRef] = useState(null)
  // const [listData, setListData] = useState([])
  const [updating,setUpdating] = useState(false)
  
  let listData = []

  const register = (intent, email,password) => {
    if( intent == 'register'){
      firebase.auth().createUserWithEmailAndPassword( email, password )
      .catch( error => console.log(error) )
    }
    else if( intent == 'login' ) {
      firebase.auth().signInWithEmailAndPassword( email, password )
      .catch( error => console.log(error) )
    }
  }

  const addData = (item) => {
    if( !dataRef ) {
      return;
    }
    const dataObj = { 
      amount: item.amount,
      note: item.note,
      category: item.category
    }
    firebase.database().ref(`${dataRef}/items/${item.id}`).set(dataObj, () => {
      // update state for rendering of list
      setUpdating(false)
    })
  }

  // listen for data changes
  const db = firebase.database().ref(`${dataRef}/items`)
  db.on('value', (snapshot) => {
    const dataObj = snapshot.val()
    if(dataObj) {
      let keys = Object.keys(dataObj)
      listData = []
      keys.forEach( (key) => {
        let item = dataObj[key]
        item.id = key
        listData.push(item)
      })
    }
  })

  firebase.auth().onAuthStateChanged( (user) => {
    if( user ) {
      setAuth(true)
      setDataRef(`users/${user.uid}`)
    }
    else {
      setAuth(false)
      setDataRef(null)
    }
  } )

  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register">
          { (props) => <AuthScreen {...props} signup={ register } loggedIn={auth} /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Home"
          options={({navigation,route}) => ({
            headerTitle: "Expenses",
            headerRight: () => (
              <TouchableOpacity style={styles.signout} onPress={ () => {
                firebase.auth().signOut().then( () => {
                  setAuth(false)
                  navigation.reset({ index: 0, routes: [{name: "Register"}] })
                })
              }}>
                <Text style={styles.signOutText}>Sign out</Text>
              </TouchableOpacity>
            )
          })}
        >
          { (props) => <HomeScreen {...props} 
          text="Hello Home Screen" 
          data={listData}
          add={addData}
          extra={updating}
           /> }
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
  signout: {
    backgroundColor: '#444444',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: '#eeeeee'
  },
});
