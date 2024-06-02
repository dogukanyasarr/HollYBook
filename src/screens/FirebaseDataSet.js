import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFCWE_6eEpr2ofvkS7nl_pYsfDYKblpJA",
  authDomain: "hollybookproject.firebaseapp.com",
  databaseURL: "https://hollybookproject-default-rtdb.firebaseio.com",
  projectId: "hollybookproject",
  storageBucket: "hollybookproject.appspot.com",
  messagingSenderId: "824374345054",
  appId: "1:824374345054:web:a8122e864a1d94ed8823cf"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Realtime Database için database bağlantısı
const firestore = getFirestore(app); // Firestore için firestore bağlantısı

export { database, firestore };
