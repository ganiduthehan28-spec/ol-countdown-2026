// src/lib/firebase-admin.ts

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK only if it hasn't been initialized yet.
if (!admin.apps.length) {
  // Use environment variables for Firebase Admin SDK credentials for security.
  // These should be set in your deployment environment (e.g., Netlify, Vercel).
  // For local development, you might use a .env file or directly set them.
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();
const messagingAdmin = admin.messaging();

export { db, messagingAdmin };
