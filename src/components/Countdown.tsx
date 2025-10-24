// src/components/Countdown.tsx

'use client';

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // YYYY-MM-DD format
}

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  (Object.keys(timeLeft) as Array<keyof TimeLeft>).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="bg-gray-700 rounded-lg p-5 text-white min-w-[100px] text-center shadow-lg">
        <div className="text-4xl font-bold">{timeLeft[interval]}</div>
        <div className="text-sm uppercase opacity-80 mt-1">{interval}</div>
      </span>
    );
  });

  return (
    <div className="flex justify-center gap-5 flex-wrap mt-10">
      {timerComponents.length ? timerComponents : <span className="text-xl text-red-500">Time's up!</span>}
    </div>
  );
};

export default Countdown;
