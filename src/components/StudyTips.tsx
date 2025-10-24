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
    <div className="mt-10 p-5 bg-blue-50 rounded-lg text-center shadow-md max-w-xl w-11/12">
      <h2 className="text-2xl font-semibold text-blue-600">Study Tip of the Day</h2>
      <p className="text-lg my-5 text-gray-700">{studyTips[currentTipIndex]}</p>
      <div className="flex justify-center gap-3">
        <button onClick={handlePreviousTip} className="px-4 py-2 rounded-md border-none bg-blue-500 text-white cursor-pointer text-base hover:bg-blue-600">Previous</button>
        <button onClick={handleNextTip} className="px-4 py-2 rounded-md border-none bg-blue-500 text-white cursor-pointer text-base hover:bg-blue-600">Next</button>
      </div>
    </div>
  );
};

export default StudyTips;