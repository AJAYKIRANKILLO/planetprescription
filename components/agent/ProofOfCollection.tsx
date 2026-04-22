
import React from 'react';
import { Camera, PenTool, FileText } from 'lucide-react';

interface ProofOfCollectionProps {
  onPhoto: () => void;
  onNote: () => void;
}

export const ProofOfCollection: React.FC<ProofOfCollectionProps> = ({ onPhoto, onNote }) => {
  return (
    <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Proof of Collection</h4>
      <div className="flex gap-3">
        <button 
          onClick={(e) => { e.stopPropagation(); onPhoto(); }}
          className="flex-1 py-4 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-orange-500 hover:border-orange-500 hover:bg-slate-800 transition-all group"
        >
          <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold">Take Photo</span>
        </button>
        
        <div className="flex-1 flex flex-col gap-3">
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
          >
            <PenTool className="w-4 h-4" />
            Signature
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNote(); }}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
          >
            <FileText className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};
