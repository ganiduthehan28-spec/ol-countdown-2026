// src/components/Footer.tsx

'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 p-5 text-center bg-background-color text-text-color w-full box-border border-t border-border-color">
      <p>&copy; 2024 O/L Countdown. All rights reserved.</p>
      <p>Designed with ❤️</p>
    </footer>
  );
};

export default Footer;