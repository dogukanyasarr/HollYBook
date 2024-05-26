import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../screens/FirebaseDataSet'; // Firebase bağlantısı

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = async () => {
    // E-posta formatını kontrol etmek için regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      Alert.alert('Geçersiz E-posta', 'Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Şifre Gerekli', 'Lütfen şifrenizi giriniz.');
      return;
    }

    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Başarılı kayıt işlemi
      console.log('Yeni kullanıcı oluşturuldu:', userCredential.user.uid);
      Alert.alert('Başarılı', 'Hesap başarıyla oluşturuldu.');
    } catch (error) {
      console.error('Kullanıcı oluşturma hatası:', error.message);
      Alert.alert('Hata', 'Hesap oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/image.png')}
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          alignSelf: 'center',
          marginTop: 70,
        }}
      />
      <Text style={styles.hesap}>Hesap Oluştur</Text>
      <Text style={styles.metin}>Aramıza Hoş Geldin!</Text>

      <TextInput
        style={[styles.input, { marginTop: 30 }]}
        onChangeText={(text) => setEmail(text)}
        placeholder="E-mail Giriniz.."
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Şifre Giriniz.."
        secureTextEntry
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Checkbox
          style={{ marginRight: 8 }}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? 'rgba(253, 166, 50, 0.7)' : undefined}
        />
        <Text style={styles.yazi}>Şartları ve koşulları kabul ediyorum.</Text>
      </View>

      <Pressable onPress={handleSignup}>
        <Text style={styles.kayit}>Hesap Oluştur</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#931621',
    alignItems: 'center',
  },
  hesap: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  metin: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    color: 'white',
    width: 300,
    height: 50,
    backgroundColor: 'rgba(253, 166, 50, 0.7)',
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom: 10,
  },
  yazi: {
    color: 'white',
    fontSize: 14,
  },
  kayit: {
    width: 200,
    height: 50,
    backgroundColor: 'rgba(253, 166, 50, 0.7)',
    color: 'white',
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Signup;
