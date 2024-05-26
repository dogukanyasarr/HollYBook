// Series.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../screens/FirebaseDataSet'; // firebaseConfig dosyanızın yolunu ayarlayın
import { ref, onValue, off, push } from 'firebase/database';

const Series = () => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSeries, setFilteredSeries] = useState([]);

  useEffect(() => {
    const seriesRef = ref(database, 'Dizi');

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setSeries(data);
        setFilteredSeries(data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log('Veri bulunamadı.');
      }
    };

    const handleError = (error) => {
      console.error('Veri alınırken bir hata oluştu:', error);
      setLoading(false);
    };

    onValue(seriesRef, handleData, handleError);

    // Listener'ı kaldır
    return () => {
      off(seriesRef, 'value', handleData);
    };
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = series.filter(item => 
      item.isim.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSeries(filteredData);
  };

  const handleSave = (item) => {
    const newSeriesRef = ref(database, 'yeniDiziler');
    push(newSeriesRef, item)
      .then(() => {
        console.log('Dizi başarıyla kaydedildi.');
      })
      .catch((error) => {
        console.error('Dizi kaydedilirken bir hata oluştu:', error);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Diziler</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Dizi ara..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {filteredSeries.length === 0 ? (
        <Text style={styles.text}>Veri bulunamadı.</Text>
      ) : (
        <FlatList
          data={filteredSeries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.image}
                source={{ uri: item.url }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.isim}</Text>
                <Text style={styles.details}>Platform: {item.platform}</Text>
                <Text style={styles.details}>Sezon: {item.sezon}</Text>
                <Text style={styles.details}>Başlangıç: {item.baslangic}</Text>
                <Text style={styles.details}>Bitiş: {item.bitis}</Text>
                <Text style={styles.details}>Ülke: {item.ulke}</Text>
                <Text style={styles.details}>Durum: {item.durum}</Text>
                <Text style={styles.details}>Oyuncular: {item.oyuncular.join(', ')}</Text>
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(item)}>
                  <Text style={styles.saveButtonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#931621',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:30,
    paddingBottom:10,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor:'white'
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 6,
    top:5,
    marginRight:15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
    height: 30,
    width:250,
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    marginBottom: 3,
    color: '#666',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#931621',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Series;
