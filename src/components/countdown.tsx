// src/components/Countdown.tsx

'use client';

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // YYYY-MM-DD format
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    // @ts-ignore
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} style={timeCardStyle}>
        <div style={timeValueStyle}>{@ts-ignore timeLeft[interval]}</div>
        <div style={timeUnitStyle}>{interval}</div>
      </span>
    );
  });

  return (
    <div style={countdownContainerStyle}>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

const countdownContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  marginTop: '20px',
};

const timeCardStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  minWidth: '100px',
  color: 'white',
};

const timeValueStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
};

const timeUnitStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  opacity: 0.8,
};

export default Countdown;