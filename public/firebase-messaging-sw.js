/* public/firebase-messaging-sw.js */

// Import Firebase scripts for messaging support
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyCMHQFfXIGVU67yUPjIYkg8rsteMEYzUw8",
  authDomain: "ol-9a-36aae.firebaseapp.com",
  projectId: "ol-9a-36aae",
  storageBucket: "ol-9a-36aae.firebasestorage.app",
  messagingSenderId: "218194791435",
  appId: "1:218194791435:web:9ad06a82bd80c2ce9e8b0e",
  measurementId: "G-KCSLNETY6M"
});

// Retrieve messaging instance
const messaging = firebase.messaging();

// Optional: show notification when app is closed
messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});
