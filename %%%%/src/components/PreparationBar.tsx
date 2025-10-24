'use client';

import { useEffect, useState } from 'react';

export default function PreparationBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date('January 1, 2024 00:00:00').getTime();
    const targetDate = new Date('February 17, 2026 08:30:00').getTime();

    const updateProgress = () => {
      const now = new Date().getTime();
      const totalDuration = targetDate - startDate;
      const elapsedTime = now - startDate;

      if (elapsedTime > 0 && totalDuration > 0) {
        const percentage = Math.min((elapsedTime / totalDuration) * 100, 100);
        setProgress(percentage);
      } else if (elapsedTime >= totalDuration) {
        setProgress(100);
      } else {
        setProgress(0);
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl p-4">
        <h2 className="text-2xl font-semibold text-center mb-2">Preparation Progress</h2>
        <div className="w-full bg-gray-700 rounded-full h-4 my-2">
            <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
            >
            </div>
        </div>
        <p className="text-center text-sm">{progress.toFixed(2)}% of your preparation time has passed</p>
        <div className="flex justify-between text-sm mt-2">
            <span>Started: Jan 1, 2024</span>
            <span>Ends: Feb 17, 2026</span>
        </div>
    </div>
  );
}