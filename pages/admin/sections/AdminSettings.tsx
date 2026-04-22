
import React, { useState } from 'react';
import { Save, UserCog, Power, Shield } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [toggles, setToggles] = useState({
    aiDetection: true,
    emergencyPause: false,
    registrations: true
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div>
          <h2 className="text-2xl font-bold text-slate-900">System Settings</h2>
          <p className="text-slate-500">Configure global parameters and admin profile.</p>
       </div>

       {/* System Toggles */}
       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Power className="w-5 h-5 text-slate-500" /> Global Controls
             </h3>
          </div>
          <div className="p-6 space-y-6">
             
             {/* Toggle Item */}
             <div className="flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-slate-900">Enable AI High-Risk Detection</h4>
                   <p className="text-sm text-slate-500">Automatically flag antibiotics and hazardous waste using Vision AI.</p>
                </div>
                <button 
                  onClick={() => toggle('aiDetection')}
                  className={`w-14 h-8 rounded-full transition-colors relative ${toggles.aiDetection ? 'bg-green-500' : 'bg-slate-300'}`}
                >
                   <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${toggles.aiDetection ? 'translate-x-6' : ''}`}></div>
                </button>
             </div>

             <div className="h-[1px] bg-slate-100 w-full"></div>

             {/* Toggle Item */}
             <div className="flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-slate-900">Pause All Pickups (Emergency)</h4>
                   <p className="text-sm text-slate-500">Temporarily suspend all fleet operations. Use only in severe weather/crisis.</p>
                </div>
                <button 
                  onClick={() => toggle('emergencyPause')}
                  className={`w-14 h-8 rounded-full transition-colors relative ${toggles.emergencyPause ? 'bg-red-500' : 'bg-slate-300'}`}
                >
                   <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${toggles.emergencyPause ? 'translate-x-6' : ''}`}></div>
                </button>
             </div>

             <div className="h-[1px] bg-slate-100 w-full"></div>

             {/* Toggle Item */}
             <div className="flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-slate-900">Allow New Registrations</h4>
                   <p className="text-sm text-slate-500">Open platform for new household and agent signups.</p>
                </div>
                <button 
                  onClick={() => toggle('registrations')}
                  className={`w-14 h-8 rounded-full transition-colors relative ${toggles.registrations ? 'bg-blue-500' : 'bg-slate-300'}`}
                >
                   <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${toggles.registrations ? 'translate-x-6' : ''}`}></div>
                </button>
             </div>

          </div>
       </div>

       {/* Admin Profile */}
       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <UserCog className="w-5 h-5 text-slate-500" /> Admin Profile
             </h3>
          </div>
          <div className="p-6 space-y-4">
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Admin Email</label>
                   <input type="email" defaultValue="admin@planetprescription.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Security Role</label>
                   <input disabled defaultValue="Super Admin (Level 1)" className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
                </div>
             </div>
             
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Change Password</label>
                <input type="password" placeholder="New Password" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
             </div>

             <div className="pt-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all">
                   <Save className="w-4 h-4" /> Save Changes
                </button>
             </div>
          </div>
       </div>

    </div>
  );
};
