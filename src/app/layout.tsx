// src/app/layout.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import DailyReminderButton from '@/components/DailyReminderButton';
import PWAInstallButton from '@/components/PWAInstallButton';
import Footer from '@/components/Footer';
import TimedPopup from '@/components/TimedPopup'; // Import the TimedPopup component
import './globals.css'; // Import global styles

/**
 * The metadata for the app.
 * This is used for SEO and PWA.
 */
export const metadata: Metadata = {
  title: 'Next.js PWA with Firebase Notifications',
  description: 'A Next.js PWA with Firebase push notifications.',
  manifest: '/manifest.json',
};

/**
 * The root layout for the app.
 * This component wraps all pages.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Theme color for the browser address bar */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        {/* Google Analytics 4 script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-KCSLNETY6M`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KCSLNETY6M');
          `}
        </Script>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <DailyReminderButton />
          <PWAInstallButton />
        </div>

        {children}
        <Footer />
        <TimedPopup /> {/* Add the TimedPopup component here */}

        {/* Service Worker Registration */}
        <Script id="sw-registration" strategy="lazyOnload">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                  console.log('Service Worker registered with scope: ', registration.scope);
                }).catch(registrationError => {
                  console.log('Service Worker registration failed: ', registrationError);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}