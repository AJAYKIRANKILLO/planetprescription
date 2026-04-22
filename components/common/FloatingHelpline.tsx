import React from 'react';
import { Phone } from 'lucide-react';

export const FloatingHelpline: React.FC = () => {
  const handleCall = () => {
    window.location.href = 'tel:1800-PHARMA-SAFE';
  };

  return (
    <button
      onClick={handleCall}
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-2 bg-blue-600 text-white p-4 md:px-6 md:py-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 group animate-in slide-in-from-right-10 duration-500"
      aria-label="Call Helpline"
      title="Call Helpline"
    >
      <div className="relative">
        <Phone className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-600 animate-pulse"></span>
      </div>
      <span className="font-bold text-lg hidden md:block">Helpline</span>
      <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
        Call Support
      </span>
    </button>
  );
};