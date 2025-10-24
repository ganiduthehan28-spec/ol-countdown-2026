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
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: permission === 'granted' ? '#ccc' : '#0070f3',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {permission === 'granted' ? 'Reminder Set' : 'Get Daily Reminders'}
      </button>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Select a time for your daily reminder</h3>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ margin: '10px 0', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <div>
              <button onClick={handleSaveTime} style={{ ...buttonStyle, marginRight: '10px', backgroundColor: '#0070f3' }}>Save</button>
              <button onClick={() => setShowModal(false)} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Basic styling for the modal and buttons
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  maxWidth: '300px',
  width: '90%',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  borderRadius: '5px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
};

export default DailyReminderButton;