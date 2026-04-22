
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarClock, Truck, Download, AlertTriangle, CheckCircle, Bell, ChevronRight 
} from 'lucide-react';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';

export const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock Data
  const activePickups = [
    { id: 'BLK-9012', type: 'Cytotoxic Waste', weight: '45 kg', driver: 'Vikram Singh', plate: 'MH-02-CX-2021', status: 'En Route', eta: '15 mins' },
    { id: 'BLK-9015', type: 'Sharps (Red Bin)', weight: '12 kg', driver: 'Rahul Sharma', plate: 'MH-04-AB-1111', status: 'Scheduled', eta: '4:00 PM' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Sidebar Navigation */}
      <HospitalSidebar />

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
           <h1 className="text-xl font-bold text-slate-800">Facility Overview</h1>
           <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 System Operational
              </span>
              <button className="relative text-slate-400 hover:text-cyan-700 transition-colors">
                 <Bell className="w-6 h-6" />
                 <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
           </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-6xl mx-auto space-y-8">
              
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Stat 1 */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between">
                    <div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Waste Processed</p>
                       <h3 className="text-3xl font-extrabold text-slate-900">845 <span className="text-lg text-slate-400 font-medium">kg</span></h3>
                       <p className="text-green-600 text-xs font-bold mt-2 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Monthly Target Met
                       </p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
                       <Truck className="w-6 h-6" />
                    </div>
                 </div>

                 {/* Stat 2 */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between">
                    <div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Next Pickup</p>
                       <h3 className="text-2xl font-extrabold text-slate-900">Today, 4 PM</h3>
                       <p className="text-orange-600 text-xs font-bold mt-2 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Hazmat Protocol
                       </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                       <CalendarClock className="w-6 h-6" />
                    </div>
                 </div>

                 {/* Stat 3: Compliance Score */}
                 <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-700 text-white flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10">
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">EPA Compliance</p>
                       <h3 className="text-4xl font-extrabold text-white">98%</h3>
                       <p className="text-emerald-400 text-xs font-bold mt-2">Excellent Standing</p>
                    </div>
                    {/* Visual Circle */}
                    <div className="relative w-16 h-16">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-emerald-500" strokeDasharray="175.9" strokeDashoffset="3.5" />
                       </svg>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 
                 {/* Left Col: Active Pickups Table (Security Focus) */}
                 <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-cyan-600" /> Active Pickups & Security
                       </h3>
                       <button className="text-xs font-bold text-cyan-700 hover:underline">View All History</button>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase">
                             <tr>
                                <th className="px-6 py-4">Batch ID</th>
                                <th className="px-6 py-4">Waste Type</th>
                                <th className="px-6 py-4">Driver / Plate</th>
                                <th className="px-6 py-4">Status</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {activePickups.map((pickup) => (
                                <tr key={pickup.id} className="hover:bg-slate-50 transition-colors">
                                   <td className="px-6 py-4 font-mono font-bold text-slate-700">{pickup.id}</td>
                                   <td className="px-6 py-4">{pickup.type} <br/> <span className="text-xs text-slate-400">{pickup.weight}</span></td>
                                   <td className="px-6 py-4">
                                      <div className="font-bold text-slate-900">{pickup.driver}</div>
                                      <div className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded inline-block mt-1">{pickup.plate}</div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                         pickup.status === 'En Route' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'
                                      }`}>
                                         {pickup.status === 'En Route' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>}
                                         {pickup.eta}
                                      </span>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

                 {/* Right Col: Quick Actions */}
                 <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                       <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                       <div className="space-y-3">
                          <button 
                            onClick={() => navigate('/hospital/schedule')}
                            className="w-full p-4 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl shadow-lg shadow-cyan-900/20 transition-all text-left flex items-center justify-between group"
                          >
                             <div>
                                <p className="font-bold">Schedule Bulk Pickup</p>
                                <p className="text-xs text-cyan-200 mt-1">Hazmat / Cytotoxic / General</p>
                             </div>
                             <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <button 
                            onClick={() => navigate('/hospital/compliance')}
                            className="w-full p-4 bg-white border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 text-slate-700 rounded-xl transition-all text-left flex items-center justify-between group"
                          >
                             <div>
                                <p className="font-bold">Download Certificates</p>
                                <p className="text-xs text-slate-400 mt-1">Monthly EPA Reports</p>
                             </div>
                             <Download className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                          </button>
                       </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                       <h4 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4" /> Safety Reminder
                       </h4>
                       <p className="text-sm text-orange-700 leading-relaxed">
                          Please ensure all sharps are sealed in puncture-proof red bins before the driver arrives at 4 PM.
                       </p>
                    </div>
                 </div>

              </div>

           </div>
        </div>
      </main>
    </div>
  );
};
