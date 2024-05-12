import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import database from '@react-native-firebase/database';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json')
      .then((response) => response.json())
      .then((json) => setMovies(json))
      .catch((error) => console.error(error));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.thumbnail}
        resizeMode="contain"
        onError={() => console.log("Görüntü yüklenemedi")}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.year}>{item.year}</Text>
      <Text style={styles.desc}>{item.extract}</Text>
      <Text style={styles.subtitle}>Oyuncular:</Text>
      <Text style={styles.text}>{item.cast.join(', ')}</Text>
      <Text style={styles.subtitle}>Türler:</Text>
      <Text style={styles.text}>{item.genres.join(', ')}</Text>
      <TouchableOpacity onPress={() => saveMovie(item)}>
        <Text style={styles.saveButton}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );

  const saveMovie = async (movie) => {
    try {
      await database().ref('yeniFilm').push().set(movie);
      Alert.alert('Başarılı', 'Film kaydedildi.');
    } catch (error) {
      console.error('Film kaydedilirken bir hata oluştu:', error);
      Alert.alert('Hata', 'Film kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text 
          style={{
              marginTop:45,
              backgroundColor: '#931621',
              letterSpacing:6,
              color:'white',
              textAlign:'center',
              fontSize:30,
              padding:20,
              borderWidth: 2,
              borderColor:'white',
              borderRadius:50,
              fontWeight:'bold'
              }}>Film Listesi</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Film ara..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#931621',
  },
  flatList: {
    marginTop:10,
    flex: 1,
    backgroundColor: '#931621',
  },
  item: {
    backgroundColor: 'rgba(253, 166, 50, 0.4)',
    padding: 20,
    marginVertical: 8,
    marginLeft:'5%',
    marginRight:'5%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  title: {
    color: '#931621',
    fontSize: 24,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 18,
    color: '#931621',
  },
  desc: {
    fontSize: 16,
    color:'white',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color:'#931621'
  },
  text: {
    fontSize: 16,
    color:'white'
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    marginTop:12,
    borderColor: '#931621',
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(253, 166, 50, 0.4)',
    borderRadius:20,
    width:200,
    alignSelf:'center',
    textAlign:'center'
  },
  saveButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    color: '#931621',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Movie;
