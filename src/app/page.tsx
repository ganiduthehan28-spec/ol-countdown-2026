// src/app/page.tsx

// src/app/page.tsx

import Countdown from '@/components/Countdown';

import PreparationProgress from '@/components/PreparationProgress';

import MotivationalQuote from '@/components/MotivationalQuote';



/**

 * The home page of the app.

 */

export default function Home() {

  const examEndDate = "2026-02-17T08:30:00"; // Updated target date and time

  const preparationStartDate = "2024-01-01"; // Based on the provided text output



  return (

    <main className="flex flex-col items-center justify-start min-h-screen p-5 pt-24 sm:pt-32 text-center bg-background-color text-text-color font-poppins relative">

      <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-color mb-4 sm:mb-6 tracking-wide leading-tight">

        Apex Success Behind 9As

      </h1>

      <p className="text-lg sm:text-xl mb-8 text-text-color tracking-wider">

        Countdown to the 2026 O/L Examination

      </p>



      <Countdown targetDate={examEndDate} />



      <PreparationProgress startDate={preparationStartDate} endDate={examEndDate.split('T')[0]} />



      <MotivationalQuote />

    </main>

  );

}