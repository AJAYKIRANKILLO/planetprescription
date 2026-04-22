
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none"
    >
      <circle cx="100" cy="100" r="90" fill="url(#tealGradient)" />
      <path 
        d="M100 45 V155 M45 100 H155" 
        stroke="white" 
        strokeWidth="35" 
        strokeLinecap="round" 
      />
      <path 
        d="M100 100 C100 100 130 50 170 60 C190 65 195 90 175 110 C155 130 100 100 100 100" 
        fill="#86efac" 
        opacity="0.9"
      />
      <defs>
        <linearGradient id="tealGradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f766e" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
    </svg>
  );
};
