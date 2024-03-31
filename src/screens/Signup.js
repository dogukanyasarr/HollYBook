import { View, Text,StyleSheet, TextInput, Pressable, Image, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from "expo-checkbox"

const Signup = ({navigation}) => {
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
      <Text style={styles.hesap}>Hesap Oluştur</Text>
      <Text style={styles.metin}>Aramıza Hoş Geldin!</Text>

      <TextInput
      placeholder="E-mail Giriniz.."
      style={[styles.input, { top: 50 }]}
      />
      <TextInput
      placeholder="Şifre Giriniz.."
      style={[styles.input, { top: 70 }]}
      secureTextEntry
      />

      <TextInput
      style={[styles.input, {top: 90}]}
      placeholder="+90"
      keyboardType="numeric"
      />
      <View
      style={{
        flexDirection:'row',
        marginVertical:6,
        top:100,
        left:30
      }}>
        <Checkbox
          style={{marginRight:8}}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? 'rgba(253, 166, 50, 0.7)' : undefined}
      />
      <Text style={styles.yazi}>Şartları ve koşulları kabul ediyorum.</Text>
      </View>

      <Pressable>
        <Text style={styles.kayıt}>Hesap Oluştur</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#BF3131'
  },
  hesap:{
    textAlign:'left',
    left:'3%',
    color:'white',
    fontWeight:'bold',
    fontSize:30,
    top:25,
  },
  metin:{
    textAlign:'left',
    left:'3%',
    color:'white',
    fontSize:20,
    top:30,
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
    fontSize:14
  },
  kayıt:{
    top:130,
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

export default Signup