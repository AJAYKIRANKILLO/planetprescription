
import React, { useState } from 'react';
import { Shield, Gift, Activity, Pill, ChevronRight, Lock, Trophy, Heart, Umbrella, FileCheck, Info, CheckCircle2 } from 'lucide-react';
import { getUserProfile } from '../../utils/storage';

export const RewardsPage = () => {
  // Mock balance state set to 1250 to demonstrate "Locked" hero state as per progress bar requirement (1250/2000)
  const [balance, setBalance] = useState(1250); 
  const profile = getUserProfile();
  const userName = profile?.name?.split(' ')[0] || 'User';

  const rewards = [
    {
      id: 1,
      title: 'Dengue & Malaria Shield',
      partner: 'Star Health Insurance',
      offer: 'Flat ₹10,000 Coverage for Monsoon Diseases.',
      cost: 1500,
      icon: Umbrella,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      title: 'Medicine Bill Discount',
      partner: 'Tata 1mg',
      offer: 'Get ₹300 Off on Prescription Meds.',
      cost: 800,
      icon: Pill,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 3,
      title: 'Annual Health Policy',
      partner: 'HDFC ERGO',
      offer: 'Get 15% Discount on Yearly Premium Renewal.',
      cost: 3000,
      icon: FileCheck,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 4,
      title: 'Preventive Full Body Checkup',
      partner: 'Thyrocare',
      offer: 'Free 60-Test Package.',
      cost: 2500,
      icon: Activity,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Header Section - User Wealth */}
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white pt-8 pb-20 px-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 opacity-90">
               <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">User Wealth</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Hi, {userName}</h1>
            <div className="flex items-center gap-3 mt-4">
               <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                  <Shield className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm font-bold">Level: Health Guardian</span>
               </div>
            </div>
          </div>

          <div className="text-center md:text-right bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
             <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Current Balance</p>
             <div className="text-4xl font-extrabold flex items-center justify-center md:justify-end gap-2 drop-shadow-md">
                {balance.toLocaleString()} 
                <span className="text-xl font-bold opacity-80">Green Credits</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
        
        {/* 2. Hero Reward - The Anchor Product */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row relative group">
           <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
           
           <div className="md:w-2/5 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden border-r border-slate-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border border-indigo-100 relative z-10">
                 <Shield className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-1 relative z-10">Accident Cover</h2>
              <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 mt-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Powered by</span>
                 <span className="text-xs font-bold text-slate-900">Acko</span>
              </div>
           </div>
           
           <div className="md:w-3/5 p-8 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900">Free 1-Month Protection</h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                        Exclusive protection for Planet Prescription users who properly dispose of high-risk waste.
                        <br/>
                        <span className="text-green-600 font-medium text-xs flex items-center gap-1 mt-2">
                            <CheckCircle2 className="w-3 h-3" /> Coverage up to ₹1 Lakh
                        </span>
                    </p>
                 </div>
              </div>

              {/* Progress */}
              <div className="mt-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                    <span>Your Balance: {balance}</span>
                    <span className="text-indigo-600">Goal: 2,000 Credits</span>
                 </div>
                 <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${Math.min((balance / 2000) * 100, 100)}%` }}
                    ></div>
                 </div>
                 <p className="text-xs text-slate-400 mt-2 text-right">
                    {balance >= 2000 ? 'Goal Reached!' : `${2000 - balance} more credits to unlock`}
                 </p>
              </div>

              <button 
                disabled={balance < 2000}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    balance >= 2000 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                 {balance >= 2000 ? <><Shield className="w-4 h-4" /> Unlock Policy</> : <><Lock className="w-4 h-4" /> Unlock Policy</>}
              </button>
           </div>
        </div>

        {/* 3. Reward Grid - Health & Insurance Only */}
        <div>
           <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-rose-500 fill-current" />
              <h3 className="text-xl font-bold text-slate-900">Health & Insurance Benefits</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.map((item) => {
                 const progress = Math.min((balance / item.cost) * 100, 100);
                 const affordable = balance >= item.cost;

                 return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 flex">
                       
                       {/* Left Color Strip to simulate Document/Voucher */}
                       <div className={`w-2 ${item.bg.replace('50', '500')}`}></div>

                       <div className="p-6 flex-1">
                          <div className="flex justify-between items-start mb-2">
                             <div className={`p-2 rounded-lg ${item.bg}`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                             </div>
                             <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{item.partner}</span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-sm mb-4 leading-snug min-h-[2.5rem]">{item.offer}</p>
                          
                          <div className="mt-4 pt-4 border-t border-slate-100">
                             <div className="flex justify-between items-center mb-3">
                                <span className={`text-xs font-bold ${affordable ? 'text-green-600' : 'text-slate-400'}`}>
                                   {affordable ? 'Available' : 'Locked'}
                                </span>
                                <span className="font-bold text-slate-900 text-sm">{item.cost} Credits</span>
                             </div>
                             
                             <button 
                                disabled={!affordable}
                                className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                   affordable 
                                   ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-95' 
                                   : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                             >
                                {affordable ? 'Redeem Voucher' : 'Earn More Credits'}
                             </button>
                          </div>
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>

        {/* 4. Disclaimer */}
        <div className="text-center pb-8 border-t border-slate-200 pt-8">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Insurance benefits are subject to partner terms. Planet Prescription acts as a facilitator for sustainable health behavior rewards.
            </p>
        </div>

      </div>
    </div>
  );
};
