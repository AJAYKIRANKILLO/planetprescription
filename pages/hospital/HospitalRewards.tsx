
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';
import { Wind, Landmark, Wallet, ChevronRight, TrendingUp } from 'lucide-react';

export const HospitalRewards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <HospitalSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
           <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Wallet className="w-6 h-6 text-teal-600" /> Redemption Hub
           </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* HERO SECTION */}
              <div className="bg-teal-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-teal-300 text-sm font-bold uppercase tracking-widest mb-1">Total Redeemable Value</p>
                        <h2 className="text-5xl font-extrabold text-white mb-2">₹12,500</h2>
                        <div className="inline-flex items-center bg-teal-800/50 rounded-full px-3 py-1 border border-teal-700">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            <span className="text-xs font-medium text-teal-100">1,250 Points Available</span>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center min-w-[180px]">
                        <TrendingUp className="w-6 h-6 text-teal-300 mx-auto mb-1" />
                        <p className="text-xs text-teal-200">Earn Rate</p>
                        <p className="font-bold text-white">₹100 / kg</p>
                    </div>
                 </div>
              </div>

              {/* SELECTION GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* OPTION 1: W2O */}
                 <div 
                    onClick={() => navigate('/hospital/oxygen')}
                    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group relative overflow-hidden"
                 >
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                        <Wind className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">W2O Credit Exchange</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                        Convert waste points directly into Oxygen Cylinder credits. Offset your monthly bill with our partners Linde & Inox.
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                        Exchange Now <ChevronRight className="w-5 h-5" />
                    </div>
                 </div>

                 {/* OPTION 2: CASH */}
                 <div 
                    onClick={() => navigate('/hospital/cash')}
                    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer group relative overflow-hidden"
                 >
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                        <Landmark className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Direct Bank Transfer</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                        Withdraw accumulated funds directly to your registered hospital bank account. Processed within 24 hours.
                    </p>
                    
                    <div className="flex items-center text-emerald-600 font-bold group-hover:gap-2 transition-all">
                        Withdraw Cash <ChevronRight className="w-5 h-5" />
                    </div>
                 </div>

              </div>

           </div>
        </div>
      </main>
    </div>
  );
};
