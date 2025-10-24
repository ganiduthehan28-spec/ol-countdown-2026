import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCMHQFfXIGVU67yUPjIYkg8rsteMEYzUw8",
  authDomain: "ol-9a-36aae.firebaseapp.com",
  projectId: "ol-9a-36aae",
  storageBucket: "ol-9a-36aae.firebasestorage.app",
  messagingSenderId: "218194791435",
  appId: "1:218194791435:web:9ad06a82bd80c2ce9e8b0e",
  measurementId: "G-KCSLNETY6M"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);
const messaging = getMessaging(app);

export { app, firestore, messaging };
