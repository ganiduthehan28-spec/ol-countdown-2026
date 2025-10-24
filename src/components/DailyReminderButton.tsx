// src/components/DailyReminderButton.tsx

'use client';

import { useState, useEffect } from 'react';
import { messaging } from '../lib/firebase';
import { getToken } from 'firebase/messaging';

/**
 * DailyReminderButton component handles requesting notification permission,
 * displaying a time selection modal, and saving the FCM token to the backend.
 */
const DailyReminderButton = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    // Check initial notification permission status
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  /**
   * Handles the click event for the "Get Daily Reminders" button.
   * Requests notification permission from the user.
   */
  const handleGetReminders = async () => {
    if (!messaging) {
      console.warn('Messaging not available.');
      return;
    }

    const newPermission = await Notification.requestPermission();
    setPermission(newPermission);

    if (newPermission === 'granted') {
      setShowModal(true);
    } else {
      console.warn('Notification permission denied or dismissed.');
    }
  };

  /**
   * Handles saving the selected time and FCM token.
   * Sends the token and time to the API route for storage in Firestore.
   */
  const handleSaveTime = async () => {
    if (!messaging) {
      console.warn('Messaging not available.');
      return;
    }

    try {
      // Get the FCM registration token
      const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }); // Replace with your VAPID key

      if (token) {
        console.log('FCM Token:', token);
        // Send the token and selected time to your API route
        const response = await fetch('/api/save-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, time }),
        });

        if (response.ok) {
          console.log('Token and time saved successfully!');
          // @ts-ignore: gtag is globally available after script load
          gtag('event', 'reminder_set', { event_category: 'engagement', event_label: time });
        } else {
          console.error('Failed to save token and time.', await response.text());
        }
      }
    } catch (error) {
      console.error('Error getting or saving FCM token:', error);
    }
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleGetReminders}
        disabled={permission === 'granted'}
        className="px-5 py-2 rounded-md border-none bg-blue-600 text-white cursor-pointer text-base hover:bg-blue-700 disabled:bg-gray-400"
      >
        {permission === 'granted' ? 'Reminder Set' : 'Get Daily Reminders'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select a time for your daily reminder</h3>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-700"
            />
            <div className="flex justify-end gap-3">
              <button onClick={handleSaveTime} className="px-4 py-2 rounded-md border-none bg-blue-600 text-white cursor-pointer hover:bg-blue-700">Save</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md border border-gray-300 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyReminderButton;
