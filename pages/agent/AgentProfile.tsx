
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Truck, Star, ShieldCheck, MapPin, Edit, Award, Phone } from 'lucide-react';

export const AgentProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/agent')} 
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
        >
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
           
           {/* Background decorative blob */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>

           <div className="p-8 md:p-10 relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                 
                 {/* Avatar */}
                 <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-xl overflow-hidden bg-slate-800">
                       <img 
                         src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram" 
                         alt="Agent" 
                         className="w-full h-full object-cover"
                       />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900" title="Online"></div>
                 </div>

                 {/* Header Info */}
                 <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">Vikram Singh</h1>
                            <div className="flex items-center gap-3 text-slate-400 text-sm mb-4">
                                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500" /> Verified Partner</span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                <span className="font-mono text-slate-500">ID: AGT-2024-88</span>
                            </div>
                        </div>
                        <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2">
                            <Edit className="w-4 h-4" /> Edit
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase font-bold">Total Pickups</p>
                            <p className="text-xl font-bold text-white mt-1">1,240</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase font-bold">Rating</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-xl font-bold text-white">4.9</span>
                                <Star className="w-4 h-4 text-amber-500 fill-current" />
                            </div>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase font-bold">Service Years</p>
                            <p className="text-xl font-bold text-white mt-1">3.5</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase font-bold">Level</p>
                            <p className="text-xl font-bold text-orange-500 mt-1 flex items-center gap-1">
                                <Award className="w-4 h-4" /> Gold
                            </p>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                 
                 {/* Operational Details */}
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" /> Operational Zone
                    </h3>
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Primary Zone</span>
                            <span className="text-white font-medium">Mumbai - Sector 4</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Base Hub</span>
                            <span className="text-white font-medium">Andheri East Depot</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Shift Timing</span>
                            <span className="text-white font-medium">09:00 AM - 06:00 PM</span>
                        </div>
                    </div>
                 </div>

                 {/* Vehicle Details */}
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-500" /> Vehicle Information
                    </h3>
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Vehicle Model</span>
                            <span className="text-white font-medium">Tata Ace Gold</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Registration No.</span>
                            <span className="text-white font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-600">MH-47-AF-1022</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Insurance Status</span>
                            <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Valid till Dec 2024
                            </span>
                        </div>
                    </div>
                 </div>

                 {/* Contact Info */}
                 <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-slate-400" /> Contact Details
                    </h3>
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Mobile Number</p>
                                <p className="text-white font-medium">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Emergency Contact</p>
                                <p className="text-white font-medium">Suresh Singh (Brother)</p>
                            </div>
                        </div>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
