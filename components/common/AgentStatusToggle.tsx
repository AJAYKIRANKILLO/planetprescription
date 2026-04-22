
import React, { useState } from 'react';

interface AgentStatusToggleProps {
  onToggle?: (isOnline: boolean) => void;
  initialStatus?: boolean;
}

export const AgentStatusToggle: React.FC<AgentStatusToggleProps> = ({ 
  onToggle, 
  initialStatus = false 
}) => {
  const [isOnline, setIsOnline] = useState(initialStatus);

  const handleToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    if (onToggle) {
      onToggle(newStatus);
    }
  };

  return (
    <div 
      onClick={handleToggle}
      className={`
        relative w-36 h-10 rounded-full cursor-pointer transition-all duration-300 ease-in-out flex items-center px-1 shadow-inner border border-white/10 select-none group
        ${isOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}
      `}
      role="switch"
      aria-checked={isOnline}
    >
      {/* Sliding Circle (Thumb) */}
      <div 
        className={`
          w-8 h-8 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)] z-20
          ${isOnline ? 'translate-x-[6.5rem]' : 'translate-x-0'}
        `}
      />
      
      {/* Text Labels Layer */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <span className={`
          text-xs font-bold uppercase tracking-wider text-white transition-opacity duration-300 transform
          ${isOnline ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-2'}
        `}>
          On Duty
        </span>
        <span className={`
          text-xs font-bold uppercase tracking-wider text-slate-300 transition-opacity duration-300 transform
          ${!isOnline ? 'opacity-100 -translate-x-1' : 'opacity-0 translate-x-2'}
        `}>
          Off Duty
        </span>
      </div>
    </div>
  );
};
