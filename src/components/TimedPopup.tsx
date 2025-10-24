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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm w-full text-gray-800">
        <h3 className="text-xl font-bold mb-4">Welcome!</h3>
        <p className="mb-4">Thanks for visiting our site. Don't forget to set your daily reminders!</p>
        <button
          onClick={() => setIsVisible(false)}
          className="px-4 py-2 rounded-md border-none bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TimedPopup;
