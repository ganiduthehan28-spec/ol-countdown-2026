// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

/**
 * Your web app's Firebase configuration.
 * This configuration is provided by the user.
 */
const firebaseConfig = {
  apiKey: "AIzaSyCMHQFfXIGVU67yUPjIYkg8rsteMEYzUw8",
  authDomain: "ol-9a-36aae.firebaseapp.com",
  projectId: "ol-9a-36aae",
  storageBucket: "ol-9a-36aae.firebasestorage.app",
  messagingSenderId: "218194791435",
  appId: "1:218194791435:web:9ad06a82bd80c2ce9e8b0e",
  measurementId: "G-KCSLNETY6M"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get a reference to the Firestore database service
const firestore = getFirestore(app);

// Get a reference to the Firebase Cloud Messaging service
const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

export { app, firestore, messaging };