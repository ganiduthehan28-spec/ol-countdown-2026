
'use client';

import dynamic from 'next/dynamic';

const DailyReminderButton = dynamic(() => import('./DailyReminderButton'), { ssr: false });

const DailyReminderWrapper = () => {
  return <DailyReminderButton />;
};

export default DailyReminderWrapper;
