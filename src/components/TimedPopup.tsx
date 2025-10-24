// src/components/TimedPopup.tsx

'use client';

import React, { useState, useEffect } from 'react';

const TimedPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in the current session
    const hasShownPopup = sessionStorage.getItem('hasShownPopup');

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasShownPopup', 'true');
      }, 25000); // 25 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-blue-100 p-8 rounded-xl text-center shadow-2xl max-w-md w-11/12 text-gray-800 border border-blue-300 relative overflow-hidden">
        <h3 className="text-2xl font-bold mb-4 text-blue-700 relative z-10">Welcome!</h3>
        <p className="mb-6 relative z-10">Thanks for visiting our site. Don't forget to set your daily reminders!</p>
        <button
          onClick={() => setIsVisible(false)}
          className="px-6 py-3 rounded-lg border-none bg-blue-600 text-white cursor-pointer hover:bg-blue-700 relative z-10"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TimedPopup;