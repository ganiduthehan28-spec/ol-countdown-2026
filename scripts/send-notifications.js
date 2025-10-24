const admin = require('firebase-admin');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const sendNotifications = async () => {
  const tokensSnapshot = await db.collection('tokens').get();
  const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

  const message = {
    notification: {
      title: 'Daily Reminder',
      body: 'Don\'t forget to check the countdown!',
    },
    tokens: tokens,
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

sendNotifications();

