// src/app/page.tsx

import Countdown from '@/components/Countdown';
import StudyTips from '@/components/StudyTips';

/**
 * The home page of the app.
 */
export default function Home() {
  const targetDate = "2026-01-01T00:00:00"; // Example target date

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-5 text-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Countdown to 2026 O/L Examination</h1>
      <p className="text-lg mb-8">Prepare yourself!</p>
      <Countdown targetDate={targetDate} />

      <div className="mt-10 p-5 bg-orange-100 rounded-lg shadow-md max-w-xl w-11/12">
        <h2 className="text-2xl font-semibold text-orange-500 mb-3">Motivation</h2>
        <p className="text-lg italic text-gray-700 mb-2">
          "The future belongs to those who believe in the beauty of their dreams."
        </p>
        <p className="text-sm text-gray-600">- Eleanor Roosevelt</p>
      </div>

      <StudyTips />
    </main>
  );
}
