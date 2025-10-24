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
    <div className="mt-10 p-5 bg-card-background rounded-lg shadow-lg max-w-xl w-11/12 text-center text-text-color border border-border-color">
      <h2 className="text-2xl font-semibold text-primary-color mb-3">PREPARATION PROGRESS</h2>
      <p className="text-lg mb-2">{progress.toFixed(2)}% of your preparation time has passed</p>
      <div className="w-full bg-border-color rounded-full h-4 mt-4">
        <div
          className="bg-secondary-color h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span>Started: {startDate}</span>
        <span>Ends: {endDate}</span>
      </div>
    </div>
  );
};

export default PreparationProgress;