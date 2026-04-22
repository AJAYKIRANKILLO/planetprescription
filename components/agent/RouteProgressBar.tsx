
import React from 'react';
import { Flag } from 'lucide-react';

interface RouteProgressBarProps {
  completed: number;
  total: number;
}

export const RouteProgressBar: React.FC<RouteProgressBarProps> = ({ completed, total }) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Flag className="w-3 h-3 text-orange-500" />
            Route Progress
        </span>
        <span className="text-sm font-bold text-white">
            {completed} <span className="text-slate-500">/ {total} Stops</span>
        </span>
      </div>
      
      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
            <div className="absolute top-0 bottom-0 right-0 w-full bg-white/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
