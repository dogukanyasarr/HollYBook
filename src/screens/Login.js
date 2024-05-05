import { View, Text, StyleSheet, TextInput, Pressable, Image, Button, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from "expo-checkbox"
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthChanged, signOut, onAuthStateChanged } from 'firebase/auth';

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

const Login = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
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
          right: 45,
          alignSelf: 'flex-end',
        }}
      >
        <Checkbox
          style={{ marginRight: 8, width: 25, height: 25 }}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? 'rgba(253, 166, 50, 0.7)' : undefined}
        />
        <Text style={styles.yazi}>Beni Hatıla</Text>
      </View>
      <Pressable onPress={handleAuthentication}>
        <Text style={styles.kayıt}>Giriş Yap</Text>
      </Pressable>
      <Text style={{
        color: 'white',
        textAlign: 'center',
        top: 110,
        fontSize: 17,
      }}>
        Şifremi Unuttum
      </Text>
    </View>
  );
}

const Logined = ({ user, handleAuthentication, navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Çıkış Yap"
        onPress={() => {
          handleAuthentication();
          navigation.navigate("Login");
        }}
      />
      <Pressable
        onPress={() => navigation.navigate("Profil")}
      >
        <Text style={{ alignItems: 'center', top: 20 }}>
          Giriş Başarılı! Profiline Git
        </Text>
      </Pressable>
    </View>
  );
};

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
        console.log("Signing out...");
        await signOut(auth);
      } else {
        if (isLogin) {
          
          if (password) {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
          } else {
            console.error('Missing password for login');
          }
        } else {
          
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('New user created successfully');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Logined user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <Login
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#931621',
  },
  input: {
    width: 330,
    height: 50,
    backgroundColor: 'rgba(253, 166, 50, 0.7)',
    alignSelf: 'center',
    borderRadius: 20,
    paddingLeft: 20,
  },
  yazi: {
    color: 'white',
    fontSize: 17,
  },
  kayıt: {
    top: 100,
    width: 230,
    height: 50,
    backgroundColor: 'rgba(253, 166, 50, 0.7)',
    color: 'white',
    borderRadius: 20,
    borderWidth: 0,
    justifyContent: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 10,
  },
});

export default App;


