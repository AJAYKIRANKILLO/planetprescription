
import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface DeliveryStatusActionsProps {
  onComplete: () => void;
  onReschedule: () => void;
  onSkip: () => void;
}

export const DeliveryStatusActions: React.FC<DeliveryStatusActionsProps> = ({ 
  onComplete, 
  onReschedule, 
  onSkip 
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      <button 
        onClick={(e) => { e.stopPropagation(); onComplete(); }}
        className="flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-green-900/20"
      >
        <CheckCircle className="w-4 h-4" /> Picked Up
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onReschedule(); }}
        className="flex items-center justify-center gap-2 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-xl font-medium transition-all active:scale-95"
      >
        <Clock className="w-4 h-4" /> Reschedule
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onSkip(); }}
        className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl font-medium transition-all active:scale-95"
      >
        <XCircle className="w-4 h-4" /> Cannot Pickup
      </button>
    </div>
  );
};
