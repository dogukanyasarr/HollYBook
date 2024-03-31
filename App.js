import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./src/screens/Login"
import Welcome from './src/screens/Welcome';
import Signup from './src/screens/Signup';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' 
        screenOptions={{headerShown:false}}>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Login' component={Login}/>
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App
