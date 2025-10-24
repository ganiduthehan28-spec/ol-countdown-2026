// src/app/page.tsx

import Countdown from '@/components/Countdown';
import StudyTips from '@/components/StudyTips';
import PreparationProgress from '@/components/PreparationProgress';

/**
 * The home page of the app.
 */
export default function Home() {
  const examEndDate = "2026-02-17T08:30:00"; // Updated target date and time
  const preparationStartDate = "2024-01-01"; // Based on the provided text output

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

      <div className="mt-12 p-6 bg-card-background rounded-lg shadow-xl max-w-2xl w-11/12 border border-border-color transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold text-primary-color mb-4 tracking-wide">Motivation</h2>
        <p className="text-lg italic text-text-color mb-3 leading-relaxed">
          "The future belongs to those who believe in the beauty of their dreams."
        </p>
        <p className="text-base text-text-color">- Eleanor Roosevelt</p>
      </div>

      <StudyTips />
    </main>
  );
}