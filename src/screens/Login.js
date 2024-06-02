import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../screens/FirebaseDataSet'; // Firebase bağlantısı
import Checkbox from "expo-checkbox";
import Profil from "../screens/Profil"; // Profil bileşeni eklendi

const Stack = createNativeStackNavigator();

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

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

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
            navigation.navigate("Profil"); // Doğrudan Profil sayfasına yönlendir
          } else {
            console.error('Missing password for login');
          }
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('New user created successfully');
          navigation.navigate("Profil"); // Doğrudan Profil sayfasına yönlendir
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Profil user={user} />
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
