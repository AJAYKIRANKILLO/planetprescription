
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface ConnectivityBadgeProps {
  isOnline: boolean;
}

export const ConnectivityBadge: React.FC<ConnectivityBadgeProps> = ({ isOnline }) => {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
      isOnline 
        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
        : 'bg-red-500/10 text-red-400 border-red-500/20'
    }`}>
      {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {isOnline ? 'Online' : 'Offline - Syncing'}
      </span>
    </div>
  );
};
