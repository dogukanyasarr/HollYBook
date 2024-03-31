import { View, Text,StyleSheet, TextInput, Pressable, Image, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from "expo-checkbox"

const Login = ({navigation}) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <View style={styles.container}>
        <Image
        source={require('./images/image.png')}
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          alignSelf:'center',
          left:0,
          top:70,
        }}
        />
        <View style={{ flexDirection: 'row', alignSelf:'center' }}>
          <Image
            source={require('./images/kitap.jpg')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              marginLeft: 5, // Left margin added
              marginTop: 90, // Top margin added
            }}
          />
          <Image
            source={require('./images/film.jpg')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              marginLeft: 20, // Left margin added
              marginTop: 90, // Top margin added
            }}
          />
          <Image
            source={require('./images/dizi.jpg')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              marginLeft: 20, // Left margin added
              marginTop: 90, // Top margin added
            }}
          />
        </View>
  
        <TextInput
        placeholder="E-mail Giriniz.."
        style={[styles.input, { top: 50 }]}
        />
        <TextInput
        placeholder="Şifre Giriniz.."
        style={[styles.input, { top: 70 }]}
        secureTextEntry
        />
        <View
        style={{
          flexDirection:'row',
          marginVertical:6,
          top:80,
          right:45,
          alignSelf:'flex-end',
        }}>
          <Checkbox
            style={{marginRight:8, width:25, height:25}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? 'rgba(253, 166, 50, 0.7)' : undefined}
        />
        <Text style={styles.yazi}>Beni Hatıla</Text>
        </View>
        <Pressable>
          <Text style={styles.kayıt}>Giriş Yap</Text>
        </Pressable>
        <Text style={{
          color:'white',
          textAlign:'center',
          top:110,
          fontSize:17,
        }}>Şifremi Unuttum</Text>
      </View>
    )
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#BF3131'
    },
    input:{
      width:330,
      height:50,
      backgroundColor:'rgba(253, 166, 50, 0.7)',
      alignSelf:'center',
      borderRadius:20,
      paddingLeft:20
    },
    yazi:{
      color:'white',
      fontSize:17
    },
    kayıt:{
      top:100,
      width:230,
      height:50,
      backgroundColor:'rgba(253, 166, 50, 0.7)',
      color:'white',
      borderRadius:20,
      borderWidth:0,    
      justifyContent:'center',
      fontSize:19,
      fontWeight:'bold',
      textAlign:'center',
      alignSelf:'center',
      paddingTop:10   
    }
  })
  
  export default Login