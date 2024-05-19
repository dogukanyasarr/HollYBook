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
import Movie from './src/screens/Movie';
import Kitap from './src/screens/Kitap';
import Series from './src/screens/Series';
import KayitKitap from './src/screens/KayitKitap';
import KayitFilm from './src/screens/KayitFilm';
import KayitDizi from './src/screens/KayitDizi';
import { firebase } from '@react-native-firebase/auth';
import 'firebase/database';

const Stack = createNativeStackNavigator();


const App = ({navigation}) => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' 
        screenOptions={{headerShown:false}}>
        <Stack.Screen name='Profil' component={Profil}/>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Login' component={Login}/>       
        <Stack.Screen name='KayitFilm' component={KayitFilm}/>
        <Stack.Screen name='KayitKitap' component={KayitKitap}/>
        <Stack.Screen name='KayitDizi' component={KayitDizi}/>
        <Stack.Screen name='Movie' component={Movie}/>
        <Stack.Screen name='Kitap' component={Kitap}/>
        <Stack.Screen name='Series' component={Series}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
