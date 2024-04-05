import { View, Text,StyleSheet, TextInput, Pressable, Image, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Profil = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image
        source={require('./images/file.jpg')}
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          alignSelf: 'center',
          left: 0,
          top: 90,
        }}
      />

      <Image
      source={require('./images/arrow.png')}
      style={{
        width:45,
        height:45,
        left:'3%',
        bottom:70
      }}
      />
      <Image
      source={require('./images/setting.png')}
      style={{
        width:45,
        height:45,
        alignSelf:'flex-end',
        bottom:113,
        right:'3%'
      }}
      />
      <Text
      style={{
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center',
        color:'white',
        top:10,
        letterSpacing:4
      }}
      >Doğukan Yaşar</Text>
      <Text
      style={{
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center',
        color:'gray',
        top:10,
        letterSpacing:1
      }}
      >dogukanyasar.79@gmail.com</Text>

      <View style={styles.middleSectionTextContainer}>
        <View style={styles.middleSectionText}>
            <Text style={styles.toptext}>Takipçi</Text>
            <Text style={styles.bottomtext}>27</Text>
        </View>
        <View style={styles.middleSectionText}>
            <Text style={styles.toptext}>Takipçi</Text>
            <Text style={styles.bottomtext}>27</Text>
        </View>
        <View style={styles.middleSectionText}>
            <Text style={styles.toptext}>Takipçi</Text>
            <Text style={styles.bottomtext}>27</Text>
        </View>
      </View>
      <View style={{ flexDirection:'column', alignSelf: 'center',}}>
        <Image
          source={require('./images/whitescreen.png')}
          style={{
            width:350,
            height:100,
            borderRadius: 20,
            marginBottom:20,
            marginTop:30
          }}      
        />
        <Text
        style={{
            position: 'absolute', 
            top: 60, 
            left:'60%',
            fontWeight:'bold',
            fontSize:20,
            letterSpacing:4
          }}

        >Keşfet</Text>
        <Image
          source={require('./images/film.jpg')}
          style={{
            position: 'absolute', 
            top: 40, 
            left: 10,
            width: 80,
            height: 80,
            borderRadius: 20,
            bottom:100
          }}
        />
        <Image
          source={require('./images/whitescreen.png')}
          style={{
            width:350,
            height:100,
            borderRadius: 20,
            marginBottom:20,
          }}
        />
        <Text
        style={{
            position: 'absolute', 
            top: 180, 
            left:'60%',
            fontWeight:'bold',
            fontSize:20,
            letterSpacing:4
          }}

        >Keşfet</Text>
        <Image
          source={require('./images/dizi.jpg')}
          style={{
            position: 'absolute', 
            top: 160, 
            left: 10,
            width: 80,
            height: 80,
            borderRadius: 20,
            bottom:100
          }}
        />
        <Image
          source={require('./images/whitescreen.png')}
          style={{
            width:350,
            height:100,
            borderRadius: 20,
            marginBottom:20,
          }}
        />
        <Text
        style={{
            position: 'absolute', 
            top: 300, 
            left:'60%',
            fontWeight:'bold',
            fontSize:20,
            letterSpacing:4
          }}

        >Keşfet</Text>
        <Image
          source={require('./images/kitap.jpg')}
          style={{
            position: 'absolute', 
            top: 280, 
            left: 10,
            width: 80,
            height: 80,
            borderRadius: 20,
            bottom:100
          }}
        />
      </View>




    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#BF3131',
    },
    middleSectionTextContainer:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        marginTop:30,     
    },
    middleSectionText:{
        alignItems:'center',
        justifyContent:'center',

    },
    toptext:{
        fontSize:18,
        color:'white',
        fontWeight:'700'
    },
    bottomtext:{
        fontSize:16,
        color:'white',
        fontWeight:'600'

    }
  });

export default Profil