
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, TrendingUp, AlertCircle, Calendar, Download } from 'lucide-react';

export const EarningsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'today' | 'week' | 'month'>('today');

  const transactions = [
    { id: 'TX-8921', desc: 'Pickup - Varsha Patel', amount: 40, type: 'credit', time: '10:30 AM' },
    { id: 'TX-8922', desc: 'Pickup - Jagdish Pillai', amount: 45, type: 'credit', time: '11:15 AM' },
    { id: 'TX-8923', desc: 'Performance Bonus', amount: 150, type: 'bonus', time: '09:00 AM' },
    { id: 'TX-8920', desc: 'Late Penalty (Prev Day)', amount: -20, type: 'debit', time: 'Yesterday' },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <button onClick={() => navigate('/agent')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
           <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>
        <div className="flex justify-between items-end">
            <h1 className="text-3xl font-bold text-white">Earnings & Payouts</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-sm hover:bg-slate-700 text-slate-300">
                <Download className="w-4 h-4" /> Statement
            </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
         {/* Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-2xl border border-green-700/50 shadow-lg">
                <div className="flex items-center gap-3 mb-2 opacity-80">
                    <Wallet className="w-5 h-5 text-green-300" />
                    <span className="text-sm font-bold uppercase tracking-wider text-green-100">Total Earned</span>
                </div>
                <p className="text-4xl font-bold text-white">₹2,850</p>
                <p className="text-xs text-green-200 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12% from yesterday
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-2 opacity-60">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Bonuses</span>
                </div>
                <p className="text-3xl font-bold text-white">₹450</p>
                <p className="text-xs text-slate-500 mt-1">Performance incentives</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-2 opacity-60">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Penalties</span>
                </div>
                <p className="text-3xl font-bold text-white">-₹20</p>
                <p className="text-xs text-slate-500 mt-1">Late arrivals / Issues</p>
            </div>
         </div>

         {/* Filters & List */}
         <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
             {/* Filter Tabs */}
             <div className="flex border-b border-slate-800">
                 {['today', 'week', 'month'].map((tab) => (
                     <button
                        key={tab}
                        onClick={() => setFilter(tab as any)}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                            filter === tab 
                            ? 'bg-slate-800 text-orange-500 border-b-2 border-orange-500' 
                            : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                        }`}
                     >
                        {tab === 'today' ? 'Today' : tab === 'week' ? 'This Week' : 'This Month'}
                     </button>
                 ))}
             </div>

             {/* Transactions List */}
             <div className="divide-y divide-slate-800">
                {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                tx.type === 'credit' ? 'bg-green-500/10 text-green-500' :
                                tx.type === 'bonus' ? 'bg-purple-500/10 text-purple-500' :
                                'bg-red-500/10 text-red-500'
                            }`}>
                                {tx.type === 'credit' ? <Wallet className="w-5 h-5" /> : 
                                 tx.type === 'bonus' ? <TrendingUp className="w-5 h-5" /> :
                                 <AlertCircle className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-bold text-slate-200">{tx.desc}</p>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {tx.time} • ID: {tx.id}
                                </p>
                            </div>
                        </div>
                        <span className={`font-mono font-bold text-lg ${
                            tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                            {tx.amount > 0 ? '+' : ''}₹{tx.amount}
                        </span>
                    </div>
                ))}
             </div>
             
             <div className="p-4 border-t border-slate-800 text-center">
                <button className="text-sm text-slate-500 hover:text-orange-500 font-bold transition-colors">
                    View Older Transactions
                </button>
             </div>
         </div>
      </div>
    </div>
  );
};
