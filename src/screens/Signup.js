import { View, Text,StyleSheet, TextInput, Pressable, Image, Button, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from "expo-checkbox"
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthChanged, signOut, onAuthStateChanged } from 'firebase/auth';
import { get } from "firebase/database";



const Signup = ({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {

  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/image.png')}
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          alignSelf: 'center',
          left: 0,
          top: 70,
        }}
      />
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Image
          source={require('./images/kitap.jpg')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            marginLeft: 5,
            marginTop: 90,
          }}
        />
        <Image
          source={require('./images/film.jpg')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            marginLeft: 20,
            marginTop: 90,
          }}
        />
        <Image
          source={require('./images/dizi.jpg')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            marginLeft: 20,
            marginTop: 90,
          }}
        />
      </View>
      <Text style={styles.hesap}>{isLogin ? 'Hesap Oluştur' : 'Giriş Yap'}</Text>
      <Text style={styles.metin}>Aramıza Hoş Geldin!</Text>

      <TextInput
        style={[styles.input, { top: 50 }]}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail Giriniz.."
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { top: 70 }]}
        value={password}
        onChangeText={setPassword}
        placeholder="Şifre Giriniz.."
        secureTextEntry
      />

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 6,
          top: 80,
          left: 30
        }}>
        <Checkbox
          style={{ marginRight: 8 }}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? 'rgba(253, 166, 50, 0.7)' : undefined}
        />
        <Text style={styles.yazi}>Şartları ve koşulları kabul ediyorum.</Text>
      </View>

      <Pressable
      onPress={handleAuthentication}
      >
          <Text style={styles.kayıt}>Hesap Oluştur</Text>
        </Pressable>
    </View>
  )
}

const Signedup = ({ user, handleAuthentication }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <Text>{user.email}</Text>
      <Pressable>
        <Text onPress={handleAuthentication}>Çıkış Yap</Text>
      </Pressable>
    </View>
  )
}
const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log("başarıyla giriş yapıldı");
        await signOut(auth);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('başarıyla yeni kullanıcı oluşturuldu');
      }
    } catch (error) {
      console.error('Authentication error: ', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      {user ? (
        <Signedup user={user} handleAuthentication={handleAuthentication}/>
      ) : (
        <Signup
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
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
    color:'white',
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

export default App