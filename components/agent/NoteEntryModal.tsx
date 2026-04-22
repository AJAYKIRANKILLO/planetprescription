
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { VoiceTextarea } from '../common/VoiceTextarea';

interface NoteEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  customerName?: string;
}

export const NoteEntryModal: React.FC<NoteEntryModalProps> = ({ isOpen, onClose, onSave, customerName }) => {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold text-white">Add Note for <span className="text-orange-500">{customerName || 'Customer'}</span></h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4">
          <VoiceTextarea
            autoFocus
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type delivery details, gate code, or issues here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-orange-500 transition-colors resize-none placeholder:text-slate-600"
          />
        </div>
        <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-800/30">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors text-sm">Cancel</button>
          <button
            onClick={() => { onSave(note); setNote(''); }}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20 text-sm"
          >
            <Save className="w-4 h-4" /> Save Note
          </button>
        </div>
      </div>
    </div>
  );
};
