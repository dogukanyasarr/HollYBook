import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const Kitap = () => {
  const bookData = [
    {
      "yazar": "Clifford D. Simak",
      "başlık": "ARA İSTASTON",
      "orijinal":"WAY STATION",
      "resimBağlantısı": "https://www.ithakiyayingrubu.com/dosyalar/2024/04/ara-istasyon-clifford-simak-ithaki-bilimkurgu-klasikleri.jpg",
      "dil": "Türkçe",
      "kategori": "Bilimkurgu Klasikleri",
      "sayfa": 248,
      "yıl": 2024
    },
    {
      "yazar": "Arkadi ve Boris Strugatski",
      "başlık": "Ölme Yazgılı Şehir",
      "orijinal":"-",
      "resimBağlantısı": "https://www.ithakiyayingrubu.com/dosyalar/2024/02/olume-yazgili.jpg",
      "dil": "Türkçe",
      "kategori": "Bilimkurgu Klasikleri",
      "sayfa": 472,
      "yıl": 2024
    },
    {
      "yazar": "Theodore Sturgeon",
      "başlık": "İnsandan Öte",
      "orijinal":"-",
      "resimBağlantısı": "https://www.ithakiyayingrubu.com/dosyalar/2024/01/9786052652923_I%CC%87nsandan-O%CC%88te-500x779.jpg",
      "dil": "Türkçe",
      "kategori": "Bilimkurgu Klasikleri",
      "sayfa": 264,
      "yıl": 2024
    },
    {
        "yazar": "Arkadi ve Boris Strugatski",
        "başlık": "Ölme Yazgılı Şehir",
        "orijinal":"-",
        "resimBağlantısı": "https://www.ithakiyayingrubu.com/dosyalar/2024/02/olume-yazgili.jpg",
        "dil": "Türkçe",
        "kategori": "Bilimkurgu Klasikleri",
        "sayfa": 472,
        "yıl": 2024
      },
      {
        "yazar": "Arkadi ve Boris Strugatski",
        "başlık": "Ölme Yazgılı Şehir",
        "orijinal":"-",
        "resimBağlantısı": "https://www.ithakiyayingrubu.com/dosyalar/2024/02/olume-yazgili.jpg",
        "dil": "Türkçe",
        "kategori": "Bilimkurgu Klasikleri",
        "sayfa": 472,
        "yıl": 2024
      },
  ];

  const renderBookItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.resimBağlantısı }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover', marginTop:'30%'}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.baslik}>Başlık</Text>
        <Text style={styles.text}>{item.başlık}</Text>
        <Text style={styles.baslik}>Yazar</Text>
        <Text style={styles.text}>{item.yazar}</Text>
        <Text style={styles.baslik}>Dil</Text>
        <Text style={styles.text}>{item.dil}</Text>
        <Text style={styles.baslik}>Kategori</Text>
        <Text style={styles.text}>{item.kategori}</Text>
        <Text style={styles.baslik}>Sayfa</Text>
        <Text style={styles.text}>{item.sayfa}</Text>
        <Text style={styles.baslik}>Basım Yılı</Text>
        <Text style={styles.text}>{item.yıl}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitap Listesi</Text>
      <FlatList
        data={bookData}
        renderItem={renderBookItem}
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
  bookContainer: {
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: 'rgba(253, 166, 50, 0.4)',
    borderWidth:2,
    borderColor:'white',
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
    marginTop:'13%',
    alignItems:'center'
  },
  baslik:{
    fontWeight:'bold',
    fontSize: 18,
    color: '#931621'

  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color:'white'
    
  },
  title:{
    marginTop:25,
    width:350,
    marginBottom:10,
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
  }
});

export default Kitap;
