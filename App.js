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

import { SplashScreen } from './components/SplashScreen'
import { HomeScreen } from './components/HomeScreen'
import { DetailScreen } from './components/DetailScreen'
import { AuthScreen } from './components/AuthScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {

  const [auth,setAuth] = useState(false)
  const [dataRef,setDataRef] = useState(null)
  const [updating,setUpdating] = useState(false)

  useEffect(() => {
    // get user's items
    readData()
    // get default categories
    getDefaultCategories()
  })
  
  let listData = []

  let categoryItems = []

  
  // user's items
  const addData = (item) => {
    if( !dataRef ) {
      return;
    }
    setUpdating(false)
    const dataObj = { 
      amount: item.amount,
      note: item.note,
      category: item.category
    }
    firebase.database().ref(`${dataRef}/items/${item.id}`).set(dataObj, () => {
      // update state for rendering of list
      setUpdating(true)
    })
  }

  const readData = () => {
    if(!dataRef) {
      return
    }
    firebase.database().ref(`${dataRef}/items`).once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      if(data) {
        let keys = Object.keys(data)
        listData = []
        keys.forEach((key) => {
          let item = data[key]
          item.id = key
          listData.push(item)
        })
        setUpdating(true)
      }
    })
  }

  const updateData = (item) => {
    setUpdating(false)
    const data = {amount: item.amount,note: item.note, category: item.category }
    firebase.database().ref(`${dataRef}/items/${item.id}`).update( data )
    .then(() => {
      // data is updated
      setUpdating(true)
    })
  }

  const deleteData = (id) => {
    setUpdating(false)
    firebase.database().ref(`${dataRef}/items/${id}`).remove()
    .then( () => {
      setUpdating(true)
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

  // listen for auth changes
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

  // register or login user
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

  // default categories
  const getDefaultCategories = () => {
    firebase.database().ref('categories').once('value')
    .then((snapshot) => {
      let dataObj = snapshot.val()
      let keys = Object.keys(dataObj)
      
      keys.forEach( (key) => {
        let catItem = dataObj[key]
        catItem.id = key
        categoryItems.push(catItem)
      } )
    })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* splash screen is added to check if the user is logged in, so the user does not see a flash of the auth screen */}
        <Stack.Screen name="Splash" options={{headerShown: false}}>
          { (props) => <SplashScreen {...props} loggedIn={firebase.auth()} /> }
        </Stack.Screen>
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
          categories={categoryItems}
           /> }
        </Stack.Screen>
        <Stack.Screen name="Detail">
          { (props) => <DetailScreen {...props} 
            update={updateData} 
            delete={deleteData} 
            categories={categoryItems}
          /> }
        </Stack.Screen>
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

