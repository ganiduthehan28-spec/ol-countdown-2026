// src/components/Footer.tsx

'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 p-5 text-center bg-card-background text-text-color w-full box-border border-t border-border-color relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-color to-secondary-color opacity-5 animate-pulse"></div>
      <p className="relative z-10">Prepared by: Admin Apex Success Behind 9As Crew</p>
      <p className="relative z-10">Contact me: 0742674380</p>
      <p className="relative z-10">&copy;2026."Success behind 9As" WhatsApp Channel</p>
    </footer>
  );
};

export default Footer;