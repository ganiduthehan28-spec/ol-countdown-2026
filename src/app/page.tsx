// src/app/page.tsx

import Countdown from '@/components/Countdown';

/**
 * The home page of the app.
 */
export default function Home() {
  const targetDate = "2026-01-01T00:00:00"; // Example target date

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 100px)', // Adjust based on header/footer height
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      color: '#333',
    }}>
      <h1>Countdown to 2026 O/L Examination</h1>
      <p>Prepare yourself!</p>
      <Countdown targetDate={targetDate} />
    </main>
  );
}
