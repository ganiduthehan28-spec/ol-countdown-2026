// src/app/api/save-token/route.ts

import { NextResponse } from 'next/server';
import { db } from '../../../src/lib/firebase-admin';

/**
 * API route to handle saving FCM tokens to Firestore.
 * Expects a POST request with a JSON body containing 'token' and 'time'.
 */
export async function POST(request: Request) {
  try {
    const { token, time } = await request.json();

    if (!token || !time) {
      return NextResponse.json({ error: 'Token and time are required' }, { status: 400 });
    }

    // Save the token and time to a Firestore collection named 'fcmTokens'
    await db.collection('fcmTokens').add({
      token,
      time,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: 'Token and time saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}