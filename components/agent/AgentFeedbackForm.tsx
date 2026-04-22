
import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, ThumbsUp } from 'lucide-react';
import { saveFeedback } from '../../utils/feedbackStorage';
import { getAgentProfile } from '../../utils/storage';

export const AgentFeedbackForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const profile = getAgentProfile();
    const name = profile ? profile.name : 'Agent Partner';
    const role = 'Logistics Partner';

    saveFeedback(name, role, message, 'agent');
    setIsSubmitted(true);
    setMessage('');

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4 text-orange-500">
        <ThumbsUp className="w-5 h-5" />
        <h3 className="font-bold text-white">Agent Feedback</h3>
      </div>

      <p className="text-slate-400 text-sm mb-4">
        Help us improve the logistics network. Your feedback helps other agents.
      </p>

      {isSubmitted ? (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2 font-bold animate-pulse">
          <CheckCircle className="w-5 h-5" />
          Feedback Received!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 placeholder:text-slate-600 resize-none transition-all"
            rows={3}
            placeholder="How is the route optimization working for you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 active:scale-95"
          >
            <Send className="w-4 h-4" /> Post to Community
          </button>
        </form>
      )}
    </div>
  );
};
