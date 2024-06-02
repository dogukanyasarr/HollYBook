import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { database } from "../screens/FirebaseDataSet";
import { ref, onValue, off } from "firebase/database";

const Profil = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [filmCount, setFilmCount] = useState(0);
  const [diziCount, setDiziCount] = useState(0);
  const [kitapCount, setKitapCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const filmRef = ref(database, "yeniFilm");
    const diziRef = ref(database, "yeniDiziler");
    const kitapRef = ref(database, "yeniKitap");

    const fetchCounts = () => {
      onValue(filmRef, (snapshot) => {
        if (snapshot.exists()) {
          const filmData = snapshot.val();
          setFilmCount(Object.keys(filmData).length);
        } else {
          setFilmCount(0);
        }
      });

      onValue(diziRef, (snapshot) => {
        if (snapshot.exists()) {
          const diziData = snapshot.val();
          setDiziCount(Object.keys(diziData).length);
        } else {
          setDiziCount(0);
        }
      });

      onValue(kitapRef, (snapshot) => {
        if (snapshot.exists()) {
          const kitapData = snapshot.val();
          setKitapCount(Object.keys(kitapData).length);
        } else {
          setKitapCount(0);
        }
      });

      // Get the currently signed-in user's email
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserEmail(currentUser.email);
      }
    };

    fetchCounts();

    // Clean up listeners when component unmounts
    return () => {
      off(filmRef);
      off(diziRef);
      off(kitapRef);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Kullanıcı çıkış yaptı");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Çıkış hatası", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./images/buzzphoto.jpeg")}
        style={{
          width: 130,
          height: 130,
          borderRadius: 20,
          alignSelf: "center",
          marginTop: 70,
        }}
      />

      <Pressable
        style={{
          position: "absolute",
          top: 70,
          right: 20,
        }}
        onPress={() => setShowMenu(!showMenu)}
      >
        <Image
          source={require("./images/settingico.png")}
          style={{
            width: 45,
            height: 45,
          }}
        />
      </Pressable>

      {showMenu && (
        <View style={styles.menu}>
          <Pressable style={styles.menuItem} onPress={handleSignOut}>
            <Text style={styles.menuText}>Çıkış Yap</Text>
          </Pressable>
        </View>
      )}

      <Pressable
        style={{
          position: "absolute",
          top: 70,
          left: 20,
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          source={require("./images/arrowico.png")}
          style={{
            width: 45,
            height: 45,
          }}
        />
      </Pressable>

      <Text style={styles.username}>HOŞ GELDİN!</Text>
      <Text style={styles.email}>{userEmail}</Text>

      <View style={styles.middleSectionTextContainer}>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Film</Text>
          <Text style={styles.bottomtext}>{filmCount}</Text>
        </View>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Dizi</Text>
          <Text style={styles.bottomtext}>{diziCount}</Text>
        </View>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Kitap</Text>
          <Text style={styles.bottomtext}>{kitapCount}</Text>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Image
            source={require("./images/hakeretlifilm.gif")}
            style={styles.boxImage}
          />
          <Pressable
            style={styles.buttonFilm}
            onPress={() => navigation.navigate("KayitFilm")}
          >
            <Text style={styles.buttonText}>Filmlerim</Text>
          </Pressable>
        </View>
        <View style={styles.box}>
          <Image
            source={require("./images/hareketlidizi.gif")}
            style={styles.boxImage}
          />
          <Pressable
            style={styles.buttonFilm}
            onPress={() => navigation.navigate("KayitDizi")}
          >
            <Text style={styles.buttonText}>Dizilerim</Text>
          </Pressable>
        </View>
        <View style={styles.box}>
          <Image
            source={require("./images/hareketlikitap.gif")}
            style={styles.boxImage}
          />
          <Pressable
            style={styles.buttonFilm}
            onPress={() => navigation.navigate("KayitKitap")}
          >
            <Text style={styles.buttonText}>Kitaplarım</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Image
            source={require("./images/profil.png")}
            style={styles.iconImage}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Movie")}
        >
          <Image
            source={require("./images/film.png")}
            style={styles.iconImage}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Kitap")}
        >
          <Image
            source={require("./images/kitap.png")}
            style={styles.iconImage}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate("Series")}
        >
          <Image
            source={require("./images/dizi.png")}
            style={styles.iconImage}
          />
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#931621",
  },
  middleSectionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  middleSectionText: {
    alignItems: "center",
    justifyContent: "center",
  },
  toptext: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
  bottomtext: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    marginTop: 10,
    letterSpacing: 4,
  },
  email: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: 1,
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 110,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 10,
  },
  buttonFilm: {
    backgroundColor: "#931621",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 4,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 5,
    borderTopWidth: 2,
    borderColor: "white",
    paddingTop: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  menu: {
    position: "absolute",
    top: 120,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 18,
    color: "#931621",
  },
});

export default Profil;
