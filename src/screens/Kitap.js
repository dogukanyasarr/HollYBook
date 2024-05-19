import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { database } from '../screens/FirebaseDataSet'; // firebaseConfig dosyanızın yolunu ayarlayın
import { ref, onValue, off } from 'firebase/database';

const Kitap = () => {
  const [loading, setLoading] = useState(true);
  const [kitaplar, setKitaplar] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredKitaplar, setFilteredKitaplar] = useState([]);

  useEffect(() => {
    const kitapRef = ref(database, 'Kitap');

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const kitapList = Object.values(snapshot.val());
        setKitaplar(kitapList);
        setFilteredKitaplar(kitapList);
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

    onValue(kitapRef, handleData, handleError);

    // Listener'ı kaldır
    return () => {
      off(kitapRef, 'value', handleData);
    };
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text === '') {
      setFilteredKitaplar(kitaplar);
    } else {
      const filtered = kitaplar.filter((kitap) =>
        kitap.başlık.toLowerCase().includes(text.toLowerCase()) ||
        kitap.yazar.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredKitaplar(filtered);
    }
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
        <Text style={styles.header}>Kitaplar</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Ara..."
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      {filteredKitaplar.length === 0 ? (
        <Text style={styles.text}>Veri bulunamadı.</Text>
      ) : (
        <FlatList
          data={filteredKitaplar}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.image}
                source={{ uri: item.resimBağlantısı }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.başlık}</Text>
                <Text style={styles.author}>Yazar: {item.yazar}</Text>
                <Text style={styles.details}>Dil: {item.dil}</Text>
                <Text style={styles.details}>Kategori: {item.kategori}</Text>
                <Text style={styles.details}>Sayfa Sayısı: {item.sayfa}</Text>
                <Text style={styles.details}>Yıl: {item.yıl}</Text>
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

export default Kitap;
