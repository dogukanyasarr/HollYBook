import { View, Text,StyleSheet, TextInput, Pressable, Image, Button,  } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Welcome = ({navigation}) => {
  return (

    <View style={styles.container}>
          <Image
        source={require('./images/kitap.jpg')}
        style={{
          width: 90,
          height: 90,
          borderRadius: 20,
          position:"absolute",
          left:-5,
          top:-5,
          transform:[
            {translateX: 20},
            {translateY: 50},
            {rotate: "-15deg"}
          ]
        }}
        />
        <Image
        source={require('./images/film.jpg')}
        style={{
          width: 90,
          height: 90,
          borderRadius: 20,
          position:"absolute",
          left:70,
          top:-20,
          transform:[
            {translateX: 60},
            {translateY: 40},
            {rotate: "10deg"}
          ]
        }}
        />
        <Image
        source={require('./images/dizi.jpg')}
        style={{
          width: 90,
          height: 90,
          borderRadius: 20,
          position:"absolute",
          left:0,
          top:110,
          transform:[
            {translateX: 50},
            {translateY: 50},
            {rotate: "15deg"}
          ]
        }}
        />
        <Image
        source={require('./images/image.png')}
        style={{
          width: 180,
          height: 180,
          borderRadius: 20,
          position:"absolute",
          top:70,
          left: 130,
          transform:[
            {translateX: 50},
            {translateY: 50},
            {rotate: "-15deg"}
          ]
        }}
        />
          <View>
            <Text style={styles.baslik}>HOLLYBOOK</Text>
            
            <Pressable style={styles.buttonFilm}
            >
              <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Filmler!</Text>
            </Pressable>
            
            <Pressable style={styles.buttonKitap}
            >
              <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Kitaplar!</Text>
            </Pressable>
            
            <Pressable style={styles.buttonDizi}
            >
              <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Diziler!</Text>
            </Pressable>

            <Pressable style={styles.button}
            onPress={()=> navigation.navigate("Login")}
            >
              <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Haydi Başlayalım!</Text>
            </Pressable>

            <Text style={styles.hesap}>Hesabın Yok mu?</Text>
            <Pressable
            onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.kayıt}>Kayıt Ol</Text>
            </Pressable>
          </View>
  
      </View>

  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#931621',
    },
    baslik:{
      top:325,
      textAlign:'left',
      marginLeft:15,
      color:'white',
      fontSize:50,
      fontWeight: 'bold'
    },
    buttonFilm:{
      alignItems:'center',
      justifyContent:'center',
      fontSize:40,
      width:130,
      height:50,
      borderRadius:10,
      marginLeft:'5%',
      top:335,
      backgroundColor:'rgba(253, 166, 50, 0.7)',
      color:'white',
    },
    buttonKitap:{
      alignItems:'center',
      justifyContent:'center',
      fontSize:40,
      width:130,
      height:50,
      borderRadius:10,
      marginLeft:'5%',
      top:350,
      backgroundColor:'rgba(253, 166, 50, 0.7)',
      color:'white',

    },
    buttonDizi:{
      alignItems:'center',
      justifyContent:'center',
      fontSize:40,
      width:130,
      height:50,
      borderRadius:10,
      marginLeft:'5%',
      top:365,
      backgroundColor:'rgba(253, 166, 50, 0.7)',
      color:'white',
    },
    button:{
      top:350,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:0,
      width:230,
      height:50,
      borderRadius:10,
      alignSelf:'center',
      top:390,
      backgroundColor:'rgba(253, 166, 50, 0.7)',
      color:'white',
    },
    hesap:{
      top:398,
      textAlign:'center',
      justifyContent:'center',
      fontSize:17,
      color:'white'
    },
    kayıt:{
      top:407,
      textAlign:'center',
      justifyContent:'center',
      fontSize:17,
      color:'white',
      fontWeight:'bold'
    }
  });
export default Welcome