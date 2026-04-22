
import React from 'react';
import { User, Shield, Mail, Clock, Lock, CheckCircle, Fingerprint } from 'lucide-react';

export const AdminProfile: React.FC = () => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
                <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-500 shadow-lg">
                        PD
                    </div>
                </div>
            </div>

            <div className="pt-16 pb-8 px-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Priya Desai</h1>
                        <p className="text-slate-500 font-medium">System Administrator</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-2">
                        <Shield className="w-3 h-3" /> Super Admin Access
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Account Details</h3>
                        
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><User className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Full Name</p>
                                <p className="text-slate-900 font-medium">Priya Desai</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><Mail className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Email Address</p>
                                <p className="text-slate-900 font-medium">admin@planetprescription.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-500"><Shield className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Role Level</p>
                                <p className="text-slate-900 font-medium">Root / Level 5</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Info */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Security Status</h3>
                        
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Last Login
                                </span>
                                <span className="text-sm font-bold text-slate-900">Today, 9:41 AM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Lock className="w-4 h-4" /> Password Changed
                                </span>
                                <span className="text-sm font-bold text-slate-900">14 days ago</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4" /> 2FA Enabled
                                </span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Active
                                </span>
                            </div>
                        </div>

                        <button className="text-blue-600 text-sm font-bold hover:underline">
                            Manage Security Settings
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};
