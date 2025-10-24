import Script from 'next/script';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DailyReminderWrapper from '@/components/DailyReminderWrapper';
import ChannelPopup from "@/components/ChannelPopup";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "2026 O/L countdown",
  description: "Countdown to the 2026 O/L Examination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="O/L Countdown" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </head>
      <body className={poppins.className}>
        {/* Plausible Analytics */}
        <Script
          strategy="afterInteractive"
          async
          src="https://plausible.io/js/pa-4nM6S3t7S13uJeL0NcJOs.js"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function(){(plausible.q = plausible.q || []).push(arguments)};
            plausible.init = plausible.init || function(i){plausible.o = i || {}};
            plausible.init();
          `}
        </Script>

        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-KCSLNETY6M`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KCSLNETY6M', {
              page_path: window.location.pathname
            });

            // Track outbound links
            document.addEventListener("DOMContentLoaded", () => {
              document.querySelectorAll("a").forEach(link => {
                const url = link.getAttribute("href");
                if (url && url.startsWith("http")) {
                  link.addEventListener("click", () => {
                    gtag('event', 'outbound_click', {
                      event_category: 'engagement',
                      event_label: url
                    });
                  });
                }
              });

              // Track scroll depth
              let scrollTracked = false;
              window.addEventListener("scroll", () => {
                const scrollY = window.scrollY + window.innerHeight;
                const scrollHeight = document.documentElement.scrollHeight;
                const percent = Math.round((scrollY / scrollHeight) * 100);

                if (!scrollTracked) {
                  if (percent > 25) gtag('event', 'scroll_25');
                  if (percent > 50) gtag('event', 'scroll_50');
                  if (percent > 75) gtag('event', 'scroll_75');
                  if (percent >= 100) {
                    gtag('event', 'scroll_100');
                    scrollTracked = true;
                  }
                }
              });

              // Device type tracking
              const isMobile = /Mobi/i.test(navigator.userAgent);
              gtag('event', 'device_type', {
                device: isMobile ? 'Mobile' : 'Desktop'
              });

              // Track button clicks
              document.querySelectorAll("button").forEach(button => {
                button.addEventListener("click", () => {
                  gtag('event', 'button_click', {
                    event_category: 'engagement',
                    event_label: button.textContent || 'No text'
                  });
                });
              });
            });
          `}
        </Script>

        <header className="p-4">
          <div className="container mx-auto flex justify-end">
            <DailyReminderWrapper />
          </div>
        </header>
        {children}
        <ChannelPopup />
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                  console.log('SW registered: ', registration);
                }).catch(registrationError => {
                  console.log('SW registration failed: ', registrationError);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
