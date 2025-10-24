// src/components/PWAInstallButton.tsx

'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

/**
 * PWAInstallButton component displays a button to trigger the PWA install prompt.
 */
const PWAInstallButton = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event to show the install button
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setShowInstallButton(true);
    });

    // Listen for appinstalled event to hide the install button if PWA is already installed
    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false);
    });
  }, []);

  /**
   * Handles the click event for the "Add to Home Screen" button.
   * Triggers the PWA install prompt.
   */
  const handleInstall = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // @ts-ignore: gtag is globally available after script load
          gtag('event', 'pwa_install', { event_category: 'engagement', event_label: 'accepted' });
        } else {
          console.log('User dismissed the install prompt');
          // @ts-ignore: gtag is globally available after script load
          gtag('event', 'pwa_install', { event_category: 'engagement', event_label: 'dismissed' });
        }
        window.deferredPrompt = null;
        setShowInstallButton(false);
      });
    }
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <button
      onClick={handleInstall}
      style={{
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#28a745',
        color: 'white',
        cursor: 'pointer',
      }}
    >
      Add to Home Screen
    </button>
  );
};

export default PWAInstallButton;
