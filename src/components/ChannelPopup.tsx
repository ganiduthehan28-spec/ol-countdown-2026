"use client";

import { useEffect, useState } from "react";

export default function ChannelPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup 45 seconds after page load
    const timer = setTimeout(() => setShow(true), 25000); // 25,000 ms = 25 seconds

    return () => clearTimeout(timer); // cleanup timer if user leaves early
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl transform transition-transform duration-500 ease-out animate-popup">
        <h2 className="text-lg md:text-xl font-bold mb-3 text-center">📢 Follow Our Channel!</h2>
        <p className="text-gray-700 text-sm md:text-base mb-5 text-center">
          Follow the <strong>Success Behind 9A (OL) 🇱🇰✨</strong> official channel on WhatsApp:
          <br />
          <a
            href="https://whatsapp.com/channel/0029VaDgoQDLSmbS6vs09W1A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-words"
          >
            Click here
          </a>
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <a
            href="https://whatsapp.com/channel/0029VaDgoQDLSmbS6vs09W1A"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition bounce text-center"
            onClick={handleClose}
          >
            Join
          </a>
          <button
            onClick={handleClose}
            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition text-center"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes popupAnimation {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes bounceButton {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }

        .animate-popup {
          animation: popupAnimation 0.4s ease-out forwards;
        }

        .bounce {
          animation: bounceButton 2s infinite;
        }
      `}</style>
    </div>
  );
}

