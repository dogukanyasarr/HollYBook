import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Series = () => {
  const diziData = [
    {
        "isim": "13 Reasons Why",
        "platform": "Netflix",
        "sezon": "4",
        "baslangic": "2016",
        "bitis": "2020",
        "ulke": "ABD",
        "durum": "Final Yaptı.",
        "oyuncular": ["Katherine Langford", "Dylan Minnette", "Alisha Boe", "Brandon Flynn", "Christian Navarro", "Justin Prentice", "Miles Heizer", "Ross Butler", "Devin Druid", "Amy Hargreaves", "Derek Luke"],
        "url": "https://tr.web.img3.acsta.net/r_1280_720/pictures/17/10/09/10/43/3021888.jpg"
      },
      {
        "isim": "The Society",
        "platform": "Netflix",
        "sezon": "1",
        "baslangic": "2019",
        "bitis": "-",
        "ulke": "ABD",
        "durum": "İptal edildi.",
        "oyuncular": ["Kathryn Newton", "Gideon Adlon", "Sean Berdy", "Natasha Liu Bordizzo", "Jacques Colimon", "Olivia DeJonge", "Alex Fitzalan", "Kristine Froseth", "Jose Julian", "Alex MacNicoll", "Toby Wallace", "Rachel Keller"],
        "url": "https://tr.web.img3.acsta.net/pictures/19/06/18/12/09/4795420.jpg?coixp=51&coiyp=61"
      },
      {
        "isim": "Wednesday",
        "platform": "Netflix",
        "sezon": "1",
        "baslangic": "2022",
        "bitis": "Devam Ediyor",
        "ulke": "ABD",
        "durum": "Devam Ediyor",
        "oyuncular": ["Jenna Ortega", "Catherine Zeta-Jones", "Ricardo Gomez", "Gwendoline Christie", "Thora Birch", "Riki Lindhome", "Katie Finneran", "Sam Strike", "Emily Rudd"],
        "url": "https://tr.web.img2.acsta.net/c_310_420/pictures/22/09/23/15/22/4271932.jpg"
      },
      {
          "isim": "Dark",
          "platform": "Netflix",
          "sezon": "3",
          "baslangic": "2017",
          "bitis": "2020",
          "ulke": "Almanya",
          "durum": "Final Yaptı",
          "oyuncular": ["Louis Hofmann", "Lisa Vicari", "Oliver Masucci", "Karoline Eichhorn", "Jördis Triebel", "Maja Schöne", "Stephan Kampwirth", "Moritz Jahn", "Gina Stiebitz", "Andreas Pietschmann"],
          "url": "https://tr.web.img4.acsta.net/pictures/17/11/09/13/41/0101371.jpg"
        },
        {
          "isim": "Friends",
          "platform": ["Netflix", "Amazon Prime"],
          "sezon": "10",
          "baslangic": "1994",
          "bitis": "2004",
          "ulke": "ABD",
          "durum": "Final Yaptı",
          "oyuncular": ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow", "Matt LeBlanc", "Matthew Perry", "David Schwimmer"],
          "url": "https://tr.web.img2.acsta.net/r_1280_720/pictures/21/05/14/08/25/4008276.jpg"
        },
        {
          "isim": "How I Met Your Mother",
          "platform": "Disney+",
          "sezon": "9",
          "baslangic": "2005",
          "bitis": "2014",
          "ulke": "ABD",
          "durum": "Final Yaptı",
          "oyuncular": ["Josh Radnor", "Jason Segel", "Cobie Smulders", "Neil Patrick Harris", "Alyson Hannigan", "Cristin Milioti"],
          "url": "https://s3.cloud.ngn.com.tr/kitantik/images/2022-07-17/1br9qfyl5odiqet1dd0.jpg"
        },
        {
          "isim": "Modern Family",
          "platform": "Disney+",
          "sezon": "11",
          "baslangic": "2009",
          "bitis": "2020",
          "ulke": "ABD",
          "durum": "Final Yaptı",
          "oyuncular": ["Ed O'Neill", "Sofía Vergara", "Julie Bowen", "Ty Burrell", "Jesse Tyler Ferguson", "Eric Stonestreet", "Sarah Hyland", "Ariel Winter", "Nolan Gould", "Rico Rodriguez"],
          "url": "https://image.tmdb.org/t/p/original/rsBdRVprohdM76s8L6daGBCv64K.jpg"
        },
        {
          "isim": "Elite",
          "platform": "Netflix",
          "sezon": "7",
          "baslangic": "2018",
          "bitis": "Devam Ediyor",
          "ulke": "İspanya",
          "durum": "Devam Ediyor",
          "oyuncular": ["Itzan Escamilla", "Miguel Bernardeau", "Álvaro Rico", "Arón Piper", "Omar Ayuso", "Mina El Hammani", "Ester Expósito", "Danna Paola", "Jorge López", "Claudia Salas"],
          "url": "https://i.pinimg.com/474x/24/0e/ec/240eec659b5ce8608e5aca780f95fe7f.jpg"
        }
  ];

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dizi Listesi</Text>
      <FlatList
        data={diziData}
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
  title:{
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
