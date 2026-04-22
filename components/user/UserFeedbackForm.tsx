
import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { saveFeedback } from '../../utils/feedbackStorage';
import { getUserProfile } from '../../utils/storage';
import { VoiceTextarea } from '../../components/common/VoiceTextarea';

export const UserFeedbackForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const profile = getUserProfile();
    const name = profile ? profile.name : 'Guest User';
    const role = 'Planet Member';

    saveFeedback(name, role, message, 'user');
    setIsSubmitted(true);
    setMessage('');

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-teal-600" />
        <h3 className="font-bold text-slate-900">Share Your Experience</h3>
      </div>

      {isSubmitted ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center justify-center gap-2 font-medium">
          <CheckCircle className="w-5 h-5" />
          Thank you! Your review is live.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <VoiceTextarea 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-slate-700 placeholder:text-slate-400 resize-none transition-all"
            rows={3}
            placeholder="How has Planet Prescription helped you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4" /> Submit Review
          </button>
        </form>
      )}
    </div>
  );
};
