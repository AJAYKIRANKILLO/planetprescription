
import React from 'react';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';
import { Building2, FileCheck, UserCircle, Calendar, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const HospitalProfile: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
        <HospitalSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
                <h1 className="text-xl font-bold text-slate-800">Facility Profile</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Facility Header Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                        <div className="h-24 bg-gradient-to-r from-cyan-600 to-teal-600"></div>
                        <div className="px-8 pb-8">
                            <div className="flex flex-col md:flex-row items-end -mt-10 gap-6 mb-6">
                                <div className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white text-cyan-600">
                                    <Building2 className="w-12 h-12" />
                                </div>
                                <div className="flex-1 mb-2">
                                    <h2 className="text-3xl font-bold text-slate-900">Apollo Clinic - Andheri</h2>
                                    <p className="text-slate-500 font-medium">Clinical Waste Collection Partner</p>
                                </div>
                                <div className="mb-3">
                                    <span className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-bold flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" /> Verified Partner
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">License Number</label>
                                    <p className="font-mono text-slate-800 font-bold mt-1">MED-LIC-99812</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">Facility Manager</label>
                                    <p className="font-medium text-slate-800 mt-1">Dr. Anjali Mehta</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">Registered Address</label>
                                    <p className="font-medium text-slate-800 mt-1 flex items-start gap-1">
                                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" /> 
                                        Plot 4B, Andheri East, Mumbai
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Compliance Status */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileCheck className="w-5 h-5 text-cyan-600" /> Compliance & Audit
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">EPA Certification</p>
                                        <p className="text-xs text-slate-500">Valid until Dec 2025</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Valid</span>
                                </div>

                                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">Next Scheduled Audit</p>
                                        <p className="text-xs text-slate-500">Regular Quarterly Inspection</p>
                                    </div>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> 12 Days
                                    </span>
                                </div>

                                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">Waste Handling Protocol</p>
                                        <p className="text-xs text-slate-500">Standard Operating Procedure v2.4</p>
                                    </div>
                                    <span className="text-cyan-600 text-xs font-bold hover:underline cursor-pointer">View Doc</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Person */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <UserCircle className="w-5 h-5 text-slate-500" /> Primary Contact
                            </h3>
                            
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-3">
                                    <UserCircle className="w-8 h-8 text-slate-400" />
                                </div>
                                <h4 className="font-bold text-slate-900">Dr. Anjali Mehta</h4>
                                <p className="text-sm text-slate-500">Facility Operations Head</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-700">+91 22 2845 9999</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-700">Admin Block, 2nd Floor</span>
                                </div>
                            </div>
                            
                            <button className="w-full mt-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                Update Contact Details
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    </div>
  );
};
