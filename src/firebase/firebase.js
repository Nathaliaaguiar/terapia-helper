// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database"; // Importando os métodos necessários

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4taE_cFNy_DXmshKU5mobhum-Wu8Bc8Q",
  authDomain: "terapia-82d23.firebaseapp.com",
  projectId: "terapia-82d23",
  storageBucket: "terapia-82d23.firebasestorage.app",
  messagingSenderId: "487696543015",
  appId: "1:487696543015:web:47cb5563f4276bbb8c0d02",
  measurementId: "G-FM2866NRYR"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o banco de dados
const database = getDatabase(app);

// Exportando os métodos necessários
export { database, ref, set, push, onValue };
