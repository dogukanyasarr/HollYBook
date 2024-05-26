import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { database } from '../screens/FirebaseDataSet'; // firebaseConfig dosyanızın yolunu ayarlayın
import { ref, onValue, off, remove } from 'firebase/database';

const KayitKitap = () => {
  const [loading, setLoading] = useState(true);
  const [kitaplar, setKitaplar] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredKitaplar, setFilteredKitaplar] = useState([]);

  useEffect(() => {
    const kitaplarRef = ref(database, 'yeniKitap');

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([key, value]) => ({ key, ...value }));
        setKitaplar(data);
        setFilteredKitaplar(data);
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

    onValue(kitaplarRef, handleData, handleError);

    // Listener'ı kaldır
    return () => {
      off(kitaplarRef, 'value', handleData);
    };
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredKitaplar(kitaplar);
    } else {
      setFilteredKitaplar(
        kitaplar.filter(kitap => 
          kitap.başlık.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, kitaplar]);

  const handleDelete = (key) => {
    Alert.alert(
      "Kitabı Sil",
      "Bu kitabı silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Evet",
          onPress: () => {
            const kitapRef = ref(database, `yeniKitap/${key}`);
            remove(kitapRef)
              .then(() => {
                console.log('Kitap başarıyla silindi.');
                setKitaplar(kitaplar.filter(kitap => kitap.key !== key));
                setFilteredKitaplar(filteredKitaplar.filter(kitap => kitap.key !== key));
              })
              .catch((error) => {
                console.error('Kitap silinirken bir hata oluştu:', error);
              });
          }
        }
      ]
    );
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
        <Text style={styles.header}>Kitaplarım</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredKitaplar.length === 0 ? (
        <Text style={styles.text}>Veri bulunamadı.</Text>
      ) : (
        <FlatList
          data={filteredKitaplar}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
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
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.key)}>
                  <Text style={styles.deleteButtonText}>Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#931621',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default KayitKitap;

