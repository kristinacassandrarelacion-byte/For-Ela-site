import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSoGfaw3anfbA3la048VicOlnXuZRbwq8",
  authDomain: "black-heart-4a43e.firebaseapp.com",
  projectId: "black-heart-4a43e",
  storageBucket: "black-heart-4a43e.firebasestorage.app",
  messagingSenderId: "515424956611",
  appId: "1:515424956611:web:1cdcd02400e0d125013276",
  measurementId: "G-7P4TB8CYMN"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };