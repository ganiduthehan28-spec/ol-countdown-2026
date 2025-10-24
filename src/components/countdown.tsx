
'use client';

import { useEffect, useState } from 'react';
import { quotes } from '@/lib/quotes';

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [quote, setQuote] = useState({ en: '', si: '' });

  useEffect(() => {
    const targetDate = new Date('February 17, 2026 08:30:00');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTime({ days, hours, minutes, seconds });
      } else {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    updateCountdown();
    updateQuote();

    const countdownInterval = setInterval(updateCountdown, 1000);
    const quoteInterval = setInterval(updateQuote, 10000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="time-card">
          <span className="time-value">{time.days}</span>
          <span className="time-unit">Days</span>
        </div>
        <div className="time-card">
          <span className="time-value">{time.hours}</span>
          <span className="time-unit">Hours</span>
        </div>
        <div className="time-card">
          <span className="time-value">{time.minutes}</span>
          <span className="time-unit">Minutes</span>
        </div>
        <div className="time-card">
          <span className="time-value">{time.seconds}</span>
          <span className="time-unit">Seconds</span>
        </div>
      </div>
      <div className="quote-bar">
        <p className="quote-en">{quote.en}</p>
        <p className="quote-si">{quote.si}</p>
      </div>
    </div>
  );
}
