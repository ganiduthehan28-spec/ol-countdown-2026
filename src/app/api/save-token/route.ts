import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Ensure env vars exist
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    return NextResponse.json({ error: 'Firebase env not configured' }, { status: 500 });
  }

  // Lazy-import Firebase Admin
  const admin = await import('firebase-admin');

  // Initialize only if not initialized
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }

  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const db = admin.firestore();
    await db.collection('fcmTokens').doc(token).set({
      created: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
