// src/components/PreparationProgress.tsx

'use client';

import React from 'react';

interface PreparationProgressProps {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

const PreparationProgress: React.FC<PreparationProgressProps> = ({ startDate, endDate }) => {
  const calculateProgress = () => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();

    if (now < start) return 0; // Not started yet
    if (now > end) return 100; // Finished

    const totalDuration = end - start;
    const elapsedDuration = now - start;

    return (elapsedDuration / totalDuration) * 100;
  };

  const progress = calculateProgress();

  return (
    <div className="mt-10 p-6 bg-card-background rounded-lg shadow-xl max-w-2xl w-11/12 text-center text-text-color border border-border-color transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-color to-secondary-color opacity-5 animate-pulse"></div>
      <h2 className="text-3xl font-semibold text-primary-color mb-4 relative z-10">PREPARATION PROGRESS</h2>
      <p className="text-lg mb-3 relative z-10">{progress.toFixed(2)}% of your preparation time has passed</p>
      <div className="w-full bg-border-color rounded-full h-4 mt-4 relative z-10">
        <div
          className="bg-secondary-color h-4 rounded-full transition-all duration-500 ease-out progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm mt-3 relative z-10">
        <span>Started: {startDate}</span>
        <span>Ends: {endDate}</span>
      </div>
    </div>
  );
};

export default PreparationProgress;
