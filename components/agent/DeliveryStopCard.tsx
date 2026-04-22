
import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, ChevronUp, AlertCircle, Phone, Navigation } from 'lucide-react';
import { DeliveryStatusActions } from './DeliveryStatusActions';
import { ProofOfCollection } from './ProofOfCollection';

interface StopData {
  id: string;
  name: string;
  address: string;
  timeSlot: string;
  riskLevel: 'High' | 'Low' | 'Medium';
  distance: string;
  phoneNumber?: string;
}

interface DeliveryStopCardProps {
  stop: StopData;
  onComplete: () => void;
  onReschedule: () => void;
  onSkip: () => void;
  onCall: () => void;
  onPhoto: () => void;
  onNote: () => void;
}

export const DeliveryStopCard: React.FC<DeliveryStopCardProps> = ({ 
  stop, 
  onComplete, 
  onReschedule, 
  onSkip,
  onCall,
  onPhoto,
  onNote
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHighRisk = stop.riskLevel === 'High';

  return (
    <div className={`bg-slate-900 rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 ${isHighRisk ? 'border-red-500/50 shadow-red-900/10' : 'border-slate-800'}`}>
      {/* High Risk Header */}
      {isHighRisk && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-1.5 flex items-center justify-between">
           <span className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider animate-pulse">
             <AlertCircle className="w-3 h-3" /> High Risk Handling
           </span>
           <span className="text-[10px] text-red-300/70 font-mono">ID: {stop.id}</span>
        </div>
      )}

      {/* Main Content */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {stop.name}
              {!isHighRisk && <span className="text-xs font-normal text-slate-500 border border-slate-700 px-1.5 rounded">#{stop.id}</span>}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[200px]">{stop.address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{stop.timeSlot}</span>
            </div>
          </div>
          
          <div className="text-right">
             <div className="flex flex-col items-end gap-1">
                <span className="text-xl font-bold text-white">{stop.distance}</span>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
             </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-800/50 animate-in slide-in-from-top-2 duration-200 cursor-default" onClick={(e) => e.stopPropagation()}>
            
            {/* Quick Contact Actions */}
            <div className="flex gap-3 mb-6">
                <button 
                  onClick={onCall}
                  className="flex-1 py-2.5 bg-slate-800 rounded-lg text-sm font-bold text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2 border border-slate-700"
                >
                    <Phone className="w-4 h-4" /> Call
                </button>
                <button className="flex-1 py-2.5 bg-slate-800 rounded-lg text-sm font-bold text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2 border border-slate-700">
                    <Navigation className="w-4 h-4" /> Map
                </button>
            </div>

            <ProofOfCollection onPhoto={onPhoto} onNote={onNote} />
            
            <DeliveryStatusActions 
              onComplete={onComplete}
              onReschedule={onReschedule}
              onSkip={onSkip}
            />
          </div>
        )}
      </div>
    </div>
  );
};
