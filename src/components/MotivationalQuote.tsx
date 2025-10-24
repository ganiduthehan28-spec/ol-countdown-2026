// src/components/MotivationalQuote.tsx

'use client';

import React, { useState, useEffect } from 'react';

const quotes = [
  "The secret of getting ahead is getting started.",
  "Don't watch the clock; do what it does. Keep going.",
  "The expert in anything was once a beginner.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there."
];

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="mt-8 text-center">
      <p className="text-lg italic">"{quote}"</p>
    </div>
  );
};

export default MotivationalQuote;
