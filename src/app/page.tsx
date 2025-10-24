// src/app/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Countdown from '@/components/Countdown';
import StudyTips from '@/components/StudyTips';
import PreparationProgress from '@/components/PreparationProgress';

const motivationQuotes = [
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
];

/**
 * The home page of the app.
 */
export default function Home() {
  const examEndDate = "2026-02-17T08:30:00"; // Updated target date and time
  const preparationStartDate = "2024-01-01"; // Based on the provided text output

  const [currentMotivationIndex, setCurrentMotivationIndex] = useState(0);

  // Automatic rotation every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivationIndex((prevIndex) => (prevIndex + 1) % motivationQuotes.length);
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleNextMotivation = () => {
    setCurrentMotivationIndex((prevIndex) => (prevIndex + 1) % motivationQuotes.length);
  };

  const handlePreviousMotivation = () => {
    setCurrentMotivationIndex((prevIndex) => (prevIndex - 1 + motivationQuotes.length) % motivationQuotes.length);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-5 text-center bg-background-color text-text-color font-orbitron">
      <h1 className="text-5xl font-extrabold text-primary-color mb-6 sm:text-6xl tracking-wide leading-tight">
        2026 O/L COUNTDOWN
      </h1>
      <p className="text-xl mb-10 text-secondary-color sm:text-2xl tracking-wider">
        PREPARATION PROGRESS
      </p>

      <PreparationProgress startDate={preparationStartDate} endDate={examEndDate.split('T')[0]} />

      <Countdown targetDate={examEndDate} />

      <div className="mt-12 p-6 bg-card-background rounded-lg shadow-xl max-w-2xl w-11/12 border border-border-color transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color to-secondary-color opacity-5 animate-pulse"></div>
        <h2 className="text-3xl font-bold text-primary-color mb-4 tracking-wide relative z-10">Motivation</h2>
        <p className="text-lg italic text-text-color mb-3 leading-relaxed relative z-10">
          "{motivationQuotes[currentMotivationIndex].quote}"
        </p>
        <p className="text-base text-text-color relative z-10">- {motivationQuotes[currentMotivationIndex].author}</p>
        <div className="flex justify-center gap-3 mt-4 relative z-10">
          <button onClick={handlePreviousMotivation} className="px-5 py-2 rounded-md border-none bg-primary-color text-white cursor-pointer text-base hover:bg-secondary-color">Previous</button>
          <button onClick={handleNextMotivation} className="px-5 py-2 rounded-md border-none bg-primary-color text-white cursor-pointer text-base hover:bg-secondary-color">Next</button>
        </div>
      </div>

      <StudyTips />
    </main>
  );
}
