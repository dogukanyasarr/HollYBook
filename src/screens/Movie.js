import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json')
      .then((response) => response.json())
      .then((json) => setMovies(json))
      .catch((error) => console.error(error));
  }, []);

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
    </View>
  );

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
      <FlatList
        data={movies}
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
});

export default Movie;
