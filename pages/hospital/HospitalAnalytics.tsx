
import React from 'react';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';
import { BarChart3, Scale, AlertTriangle, Leaf, CheckCircle, ArrowUpRight, ArrowDownRight, FileText, Download, Calendar } from 'lucide-react';

export const HospitalAnalytics: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <HospitalSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
           <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <BarChart3 className="w-6 h-6 text-cyan-600" /> Analytics & Reporting
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Facility ID: APOLLO-MUM-01</p>
           </div>
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                 <Calendar className="w-4 h-4" /> This Month
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded-lg text-sm font-bold hover:bg-cyan-800 transition-colors shadow-sm">
                 <Download className="w-4 h-4" /> Export Report
              </button>
           </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* 1. Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* Total Waste */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Waste</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1,240 <span className="text-sm font-medium text-slate-400">kg</span></h3>
                       </div>
                       <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600">
                          <Scale className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-red-500">
                       <ArrowUpRight className="w-3 h-3" /> +12% vs last month
                    </div>
                 </div>

                 {/* Hazardous % */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hazardous %</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">32%</h3>
                       </div>
                       <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                          <AlertTriangle className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                       <ArrowDownRight className="w-3 h-3" /> -5% reduction
                    </div>
                 </div>

                 {/* Compliance Score */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance</p>
                          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">98/100</h3>
                       </div>
                       <div className="p-2.5 bg-cyan-50 rounded-xl text-cyan-600">
                          <CheckCircle className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-xs font-bold text-slate-400">
                       Excellent Standing
                    </div>
                 </div>

                 {/* Carbon Offset */}
                 <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl shadow-lg text-white">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Carbon Offset</p>
                          <h3 className="text-2xl font-extrabold text-white mt-1">2.4 Tons</h3>
                       </div>
                       <div className="p-2.5 bg-white/20 rounded-xl text-white">
                          <Leaf className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="text-xs font-bold text-emerald-100 opacity-90">
                       Eq. to planting 120 trees
                    </div>
                 </div>
              </div>

              {/* 2. Middle Row: Composition & Audit */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 
                 {/* Waste Composition Chart */}
                 <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-6">Waste Stream Composition</h3>
                    
                    {/* CSS Bar Chart */}
                    <div className="h-16 w-full flex rounded-xl overflow-hidden mb-6">
                       <div className="h-full bg-cyan-500 flex items-center justify-center text-white font-bold text-xs" style={{ width: '60%' }}>
                          General (60%)
                       </div>
                       <div className="h-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs" style={{ width: '30%' }}>
                          Cytotoxic (30%)
                       </div>
                       <div className="h-full bg-red-500 flex items-center justify-center text-white font-bold text-xs" style={{ width: '10%' }}>
                          Sharps (10%)
                       </div>
                    </div>

                    {/* Legend / Details */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                       <div className="p-3 bg-slate-50 rounded-xl">
                          <div className="w-3 h-3 rounded-full bg-cyan-500 mx-auto mb-2"></div>
                          <p className="text-xs font-bold text-slate-500 uppercase">General Medical</p>
                          <p className="font-bold text-slate-900">744 kg</p>
                       </div>
                       <div className="p-3 bg-slate-50 rounded-xl">
                          <div className="w-3 h-3 rounded-full bg-purple-600 mx-auto mb-2"></div>
                          <p className="text-xs font-bold text-slate-500 uppercase">Cytotoxic / Chemo</p>
                          <p className="font-bold text-slate-900">372 kg</p>
                       </div>
                       <div className="p-3 bg-slate-50 rounded-xl">
                          <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-2"></div>
                          <p className="text-xs font-bold text-slate-500 uppercase">Sharps / Needles</p>
                          <p className="font-bold text-slate-900">124 kg</p>
                       </div>
                    </div>
                 </div>

                 {/* Upcoming Audit Widget */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="font-bold text-slate-900 mb-4">Compliance Status</h3>
                    
                    <div className="flex-1 bg-amber-50 rounded-xl p-6 border border-amber-100 flex flex-col items-center justify-center text-center">
                       <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                          <FileText className="w-8 h-8" />
                       </div>
                       <h4 className="text-lg font-extrabold text-slate-900">Next EPA Audit</h4>
                       <p className="text-amber-700 font-bold mt-1">In 12 Days</p>
                       <p className="text-xs text-amber-600/80 mt-2 max-w-[200px]">
                          Ensure all manifests from Jan-Feb are digitally signed.
                       </p>
                    </div>

                    <button className="w-full mt-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg">
                       Prepare Audit Report
                    </button>
                 </div>
              </div>

              {/* 3. Cost Analysis Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Cost & Savings Analysis</h3>
                 </div>
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                       <tr>
                          <th className="px-6 py-4">Month</th>
                          <th className="px-6 py-4">Waste Volume</th>
                          <th className="px-6 py-4">Disposal Cost</th>
                          <th className="px-6 py-4">Planet Prescription Savings</th>
                          <th className="px-6 py-4">Net Cost</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       <tr className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-700">January 2024</td>
                          <td className="px-6 py-4">1,150 kg</td>
                          <td className="px-6 py-4">₹45,000</td>
                          <td className="px-6 py-4 text-green-600 font-bold">-₹5,200</td>
                          <td className="px-6 py-4 font-bold">₹39,800</td>
                       </tr>
                       <tr className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-700">February 2024</td>
                          <td className="px-6 py-4">1,240 kg</td>
                          <td className="px-6 py-4">₹48,500</td>
                          <td className="px-6 py-4 text-green-600 font-bold">-₹6,100</td>
                          <td className="px-6 py-4 font-bold">₹42,400</td>
                       </tr>
                       <tr className="hover:bg-slate-50 bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-700">March 2024 (Projected)</td>
                          <td className="px-6 py-4">1,300 kg</td>
                          <td className="px-6 py-4">₹50,000</td>
                          <td className="px-6 py-4 text-green-600 font-bold">-₹6,500</td>
                          <td className="px-6 py-4 font-bold">₹43,500</td>
                       </tr>
                    </tbody>
                 </table>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
};
