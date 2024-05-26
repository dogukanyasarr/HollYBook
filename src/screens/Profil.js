import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Profil = ({ navigation }) => {
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
          top: 70,
        }}
      />

      <Image
        source={require('./images/arrowico.png')}
        style={{
          width: 45,
          height: 45,
          left: '3%',
          bottom: 70
        }}
      />
      <Image
        source={require('./images/settingico.png')}
        style={{
          width: 45,
          height: 45,
          alignSelf: 'flex-end',
          bottom: 113,
          right: '3%'
        }}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center',
          color: 'white',
          top: -10,
          letterSpacing: 4
        }}
      >Doğukan Yaşar</Text>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center',
          color: 'gray',
          top: -10,
          letterSpacing: 1,
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >dogukanyasar.79@gmail.com</Text>

      <View style={styles.middleSectionTextContainer}>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Film</Text>
          <Text style={styles.bottomtext}>27</Text>
        </View>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Dizi</Text>
          <Text style={styles.bottomtext}>27</Text>
        </View>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Kitap</Text>
          <Text style={styles.bottomtext}>27</Text>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Image
            source={require('./images/hakeretlifilm.gif')}
            style={styles.boxImage}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonFilm}
              onPress={() => navigation.navigate("KayitFilm")}
            >
              <Text style={styles.buttonText}>Filmlerim</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.box}>
          <Image
            source={require('./images/hareketlidizi.gif')}
            style={styles.boxImage}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonFilm}
              onPress={() => navigation.navigate("KayitDizi")}
            >
              <Text style={styles.buttonText}>Dizilerim</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.box}>
          <Image
            source={require('./images/hareketlikitap.gif')}
            style={styles.boxImage}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonFilm}
              onPress={() => navigation.navigate("KayitKitap")}
            >
              <Text style={styles.buttonText}>Kitaplarım</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Iconlar */}
      <View style={styles.iconContainer}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Image
            source={require('./images/profil.png')}
            style={styles.iconImage}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Movie")}
        >
          <Image
            source={require('./images/film.png')}
            style={styles.iconImage}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Kitap")}
        >
          <Image
            source={require('./images/kitap.png')}
            style={styles.iconImage}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Series")}
        >
          <Image
            source={require('./images/dizi.png')}
            style={styles.iconImage}
          />
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
  middleSectionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  middleSectionText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toptext: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700'
  },
  bottomtext: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  },
  boxContainer: {
    flexDirection: 'column', 
    alignItems: 'center',    
    marginTop: 30,           
    paddingHorizontal: 20,   
  },
  box: {
    flexDirection: 'row',    
    alignItems: 'center',    
    justifyContent: 'center',
    width: '100%',    
    height: 110, 
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, 
  },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 10,

  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonFilm: {
    backgroundColor: '#931621',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius:5,
    borderTopWidth:2,
    borderColor:'white',
    paddingTop:20,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});


export default Profil;

