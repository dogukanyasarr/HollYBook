import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, TextInput, Linking } from 'react-native';
import { database } from '../screens/FirebaseDataSet'; // firebaseConfig dosyanızın yolunu ayarlayın
import { ref, onValue, off, push } from 'firebase/database';

const Movie = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const moviesRef = ref(database, 'Movie');

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setMovies(data);
        setFilteredMovies(data);
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

    onValue(moviesRef, handleData, handleError);

    // Listener'ı kaldır
    return () => {
      off(moviesRef, 'value', handleData);
    };
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = movies.filter(item => 
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filteredData);
  };

  const handleSave = (movie) => {
    const newMovieRef = ref(database, 'yeniFilm');
    push(newMovieRef, movie)
      .then(() => {
        console.log('Film başarıyla kaydedildi.');
      })
      .catch((error) => {
        console.error('Film kaydedilirken bir hata oluştu:', error);
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
        <Text style={styles.header}>Filmler</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Film ara..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {filteredMovies.length === 0 ? (
        <Text style={styles.text}>Veri bulunamadı.</Text>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => Linking.openURL(`https://en.wikipedia.org/wiki/${item.href}`)}>
                <Image
                  style={styles.image}
                  source={{ uri: item.thumbnail }}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>Yıl: {item.year}</Text>
                <Text style={styles.details}>Tür: {item.genres ? item.genres.join(', ') : 'Bilinmiyor'}</Text>
                <Text style={styles.details}>Oyuncular: {item.cast ? item.cast.join(', ') : 'Bilinmiyor'}</Text>
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(item)}>
                  <Text style={styles.saveButtonText}>Kaydet</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    paddingBottom: 10,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 6,
    top: 5,
    marginRight: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
    height: 30,
    width: 250,
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

export default Movie;
