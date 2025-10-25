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
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

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
      alert('Push notifications are not enabled or permission not granted. Please enable them to set a reminder.');
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
      const token = await getToken(messaging, { vapidKey: 'BBrYkhAbdbhw0lGdWTDm7CTbIgcYoxYaCkl_tg4OkgS_H9LK5BDdWpzvq1D2CGl53zL07osx0hg-TdHgQG6Yqcc' }); // Replace with your VAPID key

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
        className="px-5 py-2 rounded-md border-none bg-primary-color text-white cursor-pointer text-base hover:bg-secondary-color disabled:bg-border-color"
      >
        {permission === 'granted' ? 'Reminder Set' : 'Get Daily Reminders'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-card-background p-6 rounded-lg text-center shadow-lg max-w-sm w-full text-text-color">
            <h3 className="text-xl font-bold mb-4 text-primary-color">Select a time for your daily reminder</h3>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-border-color rounded-md mb-4 bg-background-color text-text-color"
            />
            <div className="flex justify-end gap-3">
              <button onClick={handleSaveTime} className="px-4 py-2 rounded-md border-none bg-primary-color text-white cursor-pointer hover:bg-secondary-color">Save</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md border border-border-color bg-card-background text-text-color cursor-pointer hover:bg-border-color">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyReminderButton;