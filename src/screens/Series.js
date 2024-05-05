import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Series = () => {
  const [diziData, setDiziData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/dogukanyasarr/HollyBook/master/data/Dizi.json')
      .then(response => response.json())
      .then(data => setDiziData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderDiziItem = ({ item }) => (
    <View style={styles.diziContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.url }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover', marginTop: '30%' }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.baslik}>İsim</Text>
        <Text style={styles.text}>{item.isim}</Text>
        <Text style={styles.baslik}>Platform</Text>
        <Text style={styles.text}>{item.platform}</Text>
        <Text style={styles.baslik}>Sezon</Text>
        <Text style={styles.text}>{item.sezon}</Text>
        <Text style={styles.baslik}>Başlangıç</Text>
        <Text style={styles.text}>{item.baslangic}</Text>
        <Text style={styles.baslik}>Bitiş</Text>
        <Text style={styles.text}>{item.bitis}</Text>
        <Text style={styles.baslik}>Ülke</Text>
        <Text style={styles.text}>{item.ulke}</Text>
        <Text style={styles.baslik}>Durum</Text>
        <Text style={styles.text}>{item.durum}</Text>
        <Text style={styles.baslik}>Oyuncular</Text>
        <Text style={styles.text}>{item.oyuncular.join(", ")}</Text>
      </View>
    </View>
  );

  const filteredData = diziData.filter(item => item.isim.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dizi Listesi</Text>
      <TextInput
        style={styles.input}
        placeholder="Dizi Ara"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={filteredData}
        renderItem={renderDiziItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#931621',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(253, 166, 50, 0.4)',
    borderRadius:20,
    width:200,
    alignSelf:'center',
    textAlign:'center'
  },
  diziContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 166, 50, 0.4)',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    marginTop: '13%',
    alignItems: 'center'
  },
  baslik: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#931621'

  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'

  },
  title: {
    marginTop: 25,
    width: 350,
    marginBottom: 10,
    backgroundColor: '#931621',
    letterSpacing: 6,
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    fontWeight: 'bold'

  }
});

export default Series;
