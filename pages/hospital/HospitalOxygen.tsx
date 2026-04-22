
import React from 'react';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';
import { 
  Wind, TrendingUp, Heart, Wallet, Scale, ArrowRight, 
  CheckCircle, Activity, Droplets, RefreshCw, Truck, ArrowUpRight 
} from 'lucide-react';

export const HospitalOxygen: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <HospitalSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
           <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Wind className="w-6 h-6 text-blue-500" /> W2O Credit Exchange
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Waste-to-Oxygen Financial Portal</p>
           </div>
           <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200 flex items-center gap-1">
                 <Activity className="w-3 h-3" /> Live Rate Active
              </span>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* 1. HERO TICKER */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                       <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
                          Current Exchange Rate
                       </span>
                       <h2 className="text-3xl md:text-4xl font-extrabold mb-2">100kg Waste = 10 O₂ Credits</h2>
                       <p className="text-blue-100 opacity-90 max-w-lg">
                          Your pharmaceutical waste is incinerated to power industrial plants, offsetting carbon. We return this value as Medical Oxygen Credits.
                       </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 min-w-[200px] text-center">
                       <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1">Your Wallet</p>
                       <p className="text-4xl font-black text-white">125 <span className="text-lg font-medium opacity-80">Cr</span></p>
                       <p className="text-xs text-white mt-1">≈ ₹12,500 Value</p>
                    </div>
                 </div>
              </div>

              {/* 2. FINANCIAL CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {/* Waste Traded */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Traded</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1,250 <span className="text-sm font-medium text-slate-400">kg</span></h3>
                       </div>
                       <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600">
                          <Scale className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-xs font-bold text-green-600 flex items-center gap-1">
                       <ArrowUpRight className="w-3 h-3" /> Lifetime Volume
                    </div>
                 </div>

                 {/* Credits */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Credits</p>
                          <h3 className="text-2xl font-extrabold text-blue-600 mt-1">125</h3>
                       </div>
                       <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                          <Wind className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-xs font-bold text-slate-400">
                       Ready to redeem
                    </div>
                 </div>

                 {/* Savings */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bill Savings</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹12,500</h3>
                       </div>
                       <div className="p-2.5 bg-green-50 rounded-xl text-green-600">
                          <Wallet className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-xs font-bold text-green-600">
                       Auto-applied next invoice
                    </div>
                 </div>

                 {/* Breath Bank */}
                 <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-5 rounded-2xl shadow-lg text-white">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-rose-100 uppercase tracking-wider">Community</p>
                          <h3 className="text-2xl font-extrabold text-white mt-1">450 <span className="text-sm font-medium opacity-80">Liters</span></h3>
                       </div>
                       <div className="p-2.5 bg-white/20 rounded-xl text-white">
                          <Heart className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-xs font-bold text-rose-100 opacity-90">
                       Donated to Breath Bank
                    </div>
                 </div>
              </div>

              {/* 3. MAIN CONTENT SPLIT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 
                 {/* Left: Transaction Ledger */}
                 <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <RefreshCw className="w-5 h-5 text-blue-600" /> Recent Conversions
                       </h3>
                       <button className="text-xs font-bold text-blue-700 hover:underline">View All History</button>
                    </div>
                    <table className="w-full text-left text-sm">
                       <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                          <tr>
                             <th className="px-6 py-4">Batch ID</th>
                             <th className="px-6 py-4">Waste Processed</th>
                             <th className="px-6 py-4">Credits Earned</th>
                             <th className="px-6 py-4">Date</th>
                             <th className="px-6 py-4">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50">
                             <td className="px-6 py-4 font-mono text-slate-600">TX-W2O-992</td>
                             <td className="px-6 py-4 font-bold">450 kg</td>
                             <td className="px-6 py-4 text-blue-600 font-bold">+45 Cr</td>
                             <td className="px-6 py-4 text-slate-500">Today, 10 AM</td>
                             <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-6 py-4 font-mono text-slate-600">TX-W2O-881</td>
                             <td className="px-6 py-4 font-bold">320 kg</td>
                             <td className="px-6 py-4 text-blue-600 font-bold">+32 Cr</td>
                             <td className="px-6 py-4 text-slate-500">Yesterday</td>
                             <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="px-6 py-4 font-mono text-slate-600">TX-W2O-774</td>
                             <td className="px-6 py-4 font-bold">480 kg</td>
                             <td className="px-6 py-4 text-blue-600 font-bold">+48 Cr</td>
                             <td className="px-6 py-4 text-slate-500">Feb 20, 2024</td>
                             <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                          </tr>
                       </tbody>
                    </table>
                 </div>

                 {/* Right: Partner & Breath Bank */}
                 <div className="space-y-6">
                    
                    {/* Partner Integration */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                       <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-cyan-600" /> Connected Supplier
                       </h3>
                       <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-bold text-slate-800 border border-slate-100">
                                LI
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-900">Linde India Ltd.</h4>
                                <p className="text-xs text-slate-500">Medical Gas Partner</p>
                             </div>
                          </div>
                          <div className="text-xs text-slate-600">
                             <p>Account: <span className="font-mono">LIN-MUM-4421</span></p>
                             <p>Next Refill: <span className="font-bold">Tomorrow</span></p>
                          </div>
                       </div>
                       <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
                          Request Refill & Apply Credits <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>

                    {/* Breath Bank Widget */}
                    <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                       <h3 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                          <Heart className="w-5 h-5 fill-current" /> The Breath Bank
                       </h3>
                       <p className="text-sm text-rose-700 mb-4 leading-relaxed">
                          Your waste recycling has sponsored free oxygen for <strong>3 rural clinics</strong> this month.
                       </p>
                       <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 bg-rose-200 rounded-full overflow-hidden">
                             <div className="h-full bg-rose-500 w-[75%] rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold text-rose-600">75% to Goal</span>
                       </div>
                    </div>

                 </div>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
};
