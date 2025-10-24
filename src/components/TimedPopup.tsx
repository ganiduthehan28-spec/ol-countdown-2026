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
      <div className="bg-card-background p-8 rounded-lg text-center shadow-2xl max-w-md w-11/12 text-text-color border border-primary-color relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color to-secondary-color opacity-10 animate-pulse"></div>
        <h3 className="text-2xl font-bold mb-4 text-primary-color relative z-10">Welcome!</h3>
        <p className="mb-6 relative z-10">Thanks for visiting our site. Don't forget to set your daily reminders!</p>
        <button
          onClick={() => setIsVisible(false)}
          className="px-6 py-3 rounded-md border-none bg-primary-color text-white cursor-pointer hover:bg-secondary-color relative z-10"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TimedPopup;
