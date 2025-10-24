// src/components/StudyTips.tsx

'use client';

import React from 'react';

const studyTips = [
  "Break down your study sessions into smaller, manageable chunks.",
  "Find a quiet and comfortable place to study.",
  "Take regular breaks to avoid burnout.",
  "Review your notes regularly to reinforce learning.",
  "Test yourself frequently to identify areas for improvement.",
  "Stay hydrated and eat healthy snacks.",
  "Get enough sleep to optimize your brain function.",
  "Don't be afraid to ask for help when you need it.",
];

const StudyTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = React.useState(0);

  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % studyTips.length);
  };

  const handlePreviousTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + studyTips.length) % studyTips.length);
  };

  return (
    <div className="mt-10 p-6 bg-card-background rounded-lg text-center shadow-xl max-w-2xl w-11/12 border border-border-color text-text-color transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-color to-primary-color opacity-5 animate-pulse"></div>
      <h2 className="text-3xl font-semibold text-primary-color mb-4 relative z-10">Study Tip of the Day</h2>
      <p className="text-lg my-5 text-text-color relative z-10">{studyTips[currentTipIndex]}</p>
      <div className="flex justify-center gap-3 relative z-10">
        <button onClick={handlePreviousTip} className="px-5 py-2 rounded-md border-none bg-primary-color text-white cursor-pointer text-base hover:bg-secondary-color">Previous</button>
        <button onClick={handleNextTip} className="px-5 py-2 rounded-md border-none bg-primary-color text-white cursor-pointer text-base hover:bg-secondary-color">Next</button>
      </div>
    </div>
  );
};

export default StudyTips;