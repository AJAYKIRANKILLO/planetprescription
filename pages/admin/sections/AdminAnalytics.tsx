
import React from 'react';
import { PieChart, Map, Leaf, TrendingUp, Scale } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div>
          <h2 className="text-2xl font-bold text-slate-900">Waste Analytics</h2>
          <p className="text-slate-500">Environmental impact and waste composition data.</p>
       </div>

       {/* Top Row Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
             <div className="flex items-center gap-3 mb-4 opacity-80">
                <Leaf className="w-6 h-6" />
                <span className="font-bold uppercase tracking-wider text-sm">Carbon Offset</span>
             </div>
             <div className="text-5xl font-extrabold mb-2">18.5 <span className="text-2xl font-normal opacity-80">Tons</span></div>
             <p className="text-emerald-100 text-sm">Equivalent to planting 840 trees.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4 text-slate-500">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <span className="font-bold uppercase tracking-wider text-sm">Disposal Rate</span>
             </div>
             <div className="text-4xl font-bold text-slate-900 mb-2">+24%</div>
             <p className="text-slate-500 text-sm">Increase in safe disposals vs last month.</p>
          </div>

           <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4 text-slate-500">
                <Scale className="w-6 h-6 text-purple-600" />
                <span className="font-bold uppercase tracking-wider text-sm">Total Volume</span>
             </div>
             <div className="text-4xl font-bold text-slate-900 mb-2">142.8 <span className="text-2xl text-slate-400">kg</span></div>
             <p className="text-slate-500 text-sm">Processed this week.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Waste Composition */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-500" /> Waste Composition
             </h3>
             
             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>Antibiotics</span>
                      <span>40%</span>
                   </div>
                   <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full w-[40%]"></div>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>Painkillers (NSAIDs/Opioids)</span>
                      <span>30%</span>
                   </div>
                   <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full w-[30%]"></div>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>Vitamins & Supplements</span>
                      <span>20%</span>
                   </div>
                   <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full w-[20%]"></div>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>Cytotoxic / Hazardous</span>
                      <span>10%</span>
                   </div>
                   <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-900 rounded-full w-[10%]"></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Hotspot Map List */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-500" /> Top Waste Generation Zones
             </h3>
             
             <div className="space-y-4">
                {[
                  { city: 'Mumbai', area: 'Andheri West', weight: '4.2 Tons', pct: 85 },
                  { city: 'Delhi', area: 'Karol Bagh', weight: '3.8 Tons', pct: 70 },
                  { city: 'Bangalore', area: 'Indiranagar', weight: '2.5 Tons', pct: 55 },
                  { city: 'Pune', area: 'Kothrud', weight: '1.9 Tons', pct: 40 },
                ].map((zone, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {idx + 1}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                           <h4 className="font-bold text-slate-900">{zone.city} <span className="text-slate-400 font-normal">- {zone.area}</span></h4>
                           <span className="font-bold text-slate-700">{zone.weight}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 rounded-full" style={{ width: `${zone.pct}%` }}></div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

       </div>
    </div>
  );
};
