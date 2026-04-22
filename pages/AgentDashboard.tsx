import React from 'react';
import { LiveMap } from '../components/LiveMap';
import { Truck, ShieldCheck, Map } from 'lucide-react';

export const AgentDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agent Tracking</h1>
          <p className="text-slate-500">Real-time view of active collection agents</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
           <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
           Live Updates
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-[600px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <LiveMap />
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-teal-600" />
              Active Fleets
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Van #{100 + i}</span>
                  <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded">Active</span>
                </div>
              ))}
            </div>
          </div>

           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Collection Status
            </h3>
            <div className="flex justify-between items-center text-sm text-slate-600 mb-2">
              <span>Pending Pickups</span>
              <span className="font-bold text-slate-900">12</span>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Completed</span>
              <span className="font-bold text-slate-900">45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};