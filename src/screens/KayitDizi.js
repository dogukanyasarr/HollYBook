import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../screens/FirebaseDataSet'; // firebaseConfig dosyanızın yolunu ayarlayın
import { ref, onValue, off } from 'firebase/database';

const KayitDizi = () => {
  const [loading, setLoading] = useState(true);
  const [diziler, setDiziler] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiziler, setFilteredDiziler] = useState([]);

  useEffect(() => {
    const dizilerRef = ref(database, 'yeniDiziler');

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setDiziler(data);
        setFilteredDiziler(data);
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

    onValue(dizilerRef, handleData, handleError);

    // Listener'ı kaldır
    return () => {
      off(dizilerRef, 'value', handleData);
    };
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDiziler(diziler);
    } else {
      setFilteredDiziler(
        diziler.filter(dizi => 
          dizi.başlık.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, diziler]);

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
        <Text style={styles.header}>Dizilerim</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredDiziler.length === 0 ? (
        <Text style={styles.text}>Veri bulunamadı.</Text>
      ) : (
        <FlatList
          data={filteredDiziler}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:30,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomColor:'white'
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 6,
    top:8,
    marginRight:15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
    height: 30,
    width:215,
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
  author: {
    fontSize: 16,
    marginBottom: 3,
    color: '#666',
  },
  details: {
    fontSize: 14,
    marginBottom: 3,
    color: '#666',
  },
});

export default KayitDizi;