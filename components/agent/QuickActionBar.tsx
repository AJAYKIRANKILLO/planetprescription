
import React from 'react';
import { Play, MapPin, Phone, Camera } from 'lucide-react';

interface QuickActionBarProps {
  onScan?: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onScan }) => {
  const actions = [
    { label: 'Start Route', icon: Play, color: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-900/20', onClick: () => {} },
    { label: 'Navigate', icon: MapPin, color: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700', onClick: () => {} },
    { label: 'Call Next', icon: Phone, color: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700', onClick: () => {} },
    { label: 'Scan Item', icon: Camera, color: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700', onClick: onScan },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-2 border border-slate-800 shadow-sm h-full flex items-center">
      <div className="grid grid-cols-4 gap-4 w-full">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={action.onClick}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-lg transition-all active:scale-95 group ${action.color}`}
          >
            <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold whitespace-nowrap hidden xl:inline-block">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
