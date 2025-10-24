
'use client';

import { useState } from 'react';
import { messaging, firestore } from '../lib/firebase';
import { getToken } from 'firebase/messaging';
import { collection, addDoc } from 'firebase/firestore';

const DailyReminderButton = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('09:00');

  const handleSave = async () => {
    setShowModal(false);
    if (permission === 'granted') {
      saveToken(time);
      return;
    }

    const newPermission = await Notification.requestPermission();
    setPermission(newPermission);

    if (newPermission === 'granted') {
      saveToken(time);
    }
  };

  const saveToken = async (selectedTime) => {
    try {
      const token = await getToken(messaging, { vapidKey: 'BIFEdgUNUtPAlAaCGZuJjk17Qkt6vje3WBJSSxRH4pHsAIom8YC4AwcT_wHlfm5o2bOob7Un7y-b9TboG-MI_0k' });
      if (token) {
        await addDoc(collection(firestore, 'tokens'), { token, time: selectedTime });
      }
    } catch (error) {
      console.error('An error occurred while retrieving token. ', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={permission === 'granted'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {permission === 'granted' ? 'Reminder Set' : 'Get Daily Reminders'}
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Select a time for your daily reminder
                    </h3>
                    <div className="mt-2">
                      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyReminderButton;
