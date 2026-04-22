
import React from 'react';
import { Wallet, TrendingUp, Gift } from 'lucide-react';

export const EarningsBreakdown: React.FC = () => {
  const stats = [
    { label: "Today", amount: "₹850", icon: Wallet, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "This Week", amount: "₹4,200", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Bonuses", amount: "₹150", icon: Gift, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-slate-900 rounded-xl p-3 border border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className={`p-2 rounded-full mb-2 ${stat.bg}`}>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </div>
          <p className="text-sm font-bold text-white">{stat.amount}</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
