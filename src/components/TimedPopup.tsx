// src/components/TimedPopup.tsx

'use client';

import React, { useState, useEffect } from 'react';

const TimedPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 25000); // 25 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm w-11/12">
        <h3 className="text-2xl font-bold mb-4">Join our WhatsApp Channel</h3>
        <p className="mb-6">Get daily reminders and stay motivated!</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsVisible(false)}
            className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Close
          </button>
          <a
            href="https://chat.whatsapp.com/your-channel-link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 animate-bounce"
          >
            Join
          </a>
        </div>
      </div>
    </div>
  );
};

export default TimedPopup;