import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./src/screens/Login"
import Welcome from './src/screens/Welcome';
import Signup from './src/screens/Signup';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import Profil from './src/screens/Profil';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBFCWE_6eEpr2ofvkS7nl_pYsfDYKblpJA",
  authDomain: "hollybookproject.firebaseapp.com",
  projectId: "hollybookproject",
  storageBucket: "hollybookproject.appspot.com",
  messagingSenderId: "824374345054",
  appId: "1:824374345054:web:a8122e864a1d94ed8823cf"
};

const app = initializeApp(firebaseConfig);

const App = ({navigation}) => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' 
        screenOptions={{headerShown:false}}>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Profil' component={Profil}/>
      </Stack.Navigator>

    </NavigationContainer>

  )
}

export default App
