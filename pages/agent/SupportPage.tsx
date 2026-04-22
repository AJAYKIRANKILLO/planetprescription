
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, HelpCircle, MessageSquare, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { AgentFeedbackForm } from '../../components/agent/AgentFeedbackForm';

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What if the user is not home?", a: "Attempt to call the user twice. If no response, mark as 'Not Home' in the app and reschedule. Do not leave the package unattended." },
    { q: "How to handle damaged packages?", a: "Take a photo of the damage using the 'Issue' button on the stop card. Do not collect leaking or hazardous items." },
    { q: "My vehicle broke down. What now?", a: "Tap the Emergency Helpline button immediately to inform Dispatch HQ. We will reassign your remaining route." },
    { q: "When do I get my payout?", a: "Payouts are processed daily at midnight. You should see the funds in your linked bank account by 10 AM the next day." }
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/agent')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
           <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Agent Support</h1>

        {/* Emergency Section */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500 rounded-full text-white shadow-lg shadow-red-900/50 animate-pulse">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-red-100">Emergency Helpline</h3>
                    <p className="text-red-200/70 text-sm">For accidents, breakdowns, or safety issues.</p>
                </div>
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all">
                Call Dispatch HQ
            </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
            {/* FAQs */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-orange-500" /> Frequently Asked
                </h3>
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                            <button 
                                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                            >
                                {faq.q}
                                {activeFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {activeFaq === idx && (
                                <div className="p-4 pt-0 text-slate-400 text-sm leading-relaxed bg-slate-900 border-t border-slate-800/50">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ticket Form */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-teal-500" /> Report an Issue
                    </h3>
                    <form className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 h-full">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Issue Type</label>
                            <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-teal-500">
                                <option>Payment Issue</option>
                                <option>Route / App Bug</option>
                                <option>Vehicle Problem</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description</label>
                            <textarea 
                                rows={4}
                                placeholder="Describe your issue in detail..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-teal-500 resize-none"
                            ></textarea>
                        </div>
                        <button type="button" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" /> Submit Ticket
                        </button>
                    </form>
                </div>

                {/* Feedback Form */}
                <div>
                    <AgentFeedbackForm />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
