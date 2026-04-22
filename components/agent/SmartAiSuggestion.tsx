
import React from 'react';
import { Sparkles, X } from 'lucide-react';

export const SmartAiSuggestion: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-4 shadow-lg shadow-indigo-900/20 overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
      
      <div className="relative z-10 flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-400/30">
          <Sparkles className="w-4 h-4 text-indigo-300" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
             <h4 className="text-sm font-bold text-indigo-200 mb-1">AI Route Optimization</h4>
             <button className="text-indigo-300/50 hover:text-indigo-200"><X className="w-3 h-3" /></button>
          </div>
          <p className="text-xs text-indigo-100/80 leading-relaxed">
            Traffic is building up on M.G. Road. 
            <br />
            <span className="text-white font-medium">Tip:</span> Prioritize <span className="font-bold text-amber-300">Stop #4 (Jagdish)</span> to save 12 mins.
          </p>
        </div>
      </div>
    </div>
  );
};
