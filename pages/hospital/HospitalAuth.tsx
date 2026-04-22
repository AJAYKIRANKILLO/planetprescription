
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Mail, Lock, MapPin, Phone, User, FileText, CheckCircle } from 'lucide-react';

export const HospitalAuth: React.FC = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login State
  const [loginData, setLoginData] = useState({ license: '', password: '' });

  // Register State - Keeping it simple for the UI demo, typically you'd have state for these or use FormData
  const [regData, setRegData] = useState({ 
    name: '', email: '', phone: '', address: '', license: '', contactPerson: '', password: '', confirmPassword: '' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('userType', 'hospital');
      navigate('/hospital');
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Registration
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration Successful! Please Login to access the portal.");
      setIsRegister(false); // Switch to login
    }, 1500);
  };

  const fillDemo = () => {
    setLoginData({ license: 'APOLLO-MUM-01', password: 'demo2024' });
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-100/50 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-100/50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-slate-500 hover:text-teal-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Return to Home</span>
        </button>
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-teal-100 to-cyan-100 rounded-2xl shadow-inner flex items-center justify-center transform hover:rotate-3 transition-transform">
            <Building2 className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Hospital <span className="text-teal-600">Partner Portal</span>
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {isRegister ? "Join the sustainable healthcare network." : "Secure access for waste managers."}
          </p>
        </div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-[520px]">
        <div className="bg-white py-8 px-6 shadow-2xl shadow-teal-100/50 rounded-3xl sm:px-10 border border-slate-100">
          
          {/* Tabs */}
          <div className="flex mb-8 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isRegister ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Partner Login
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isRegister ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              New Registration
            </button>
          </div>

          {/* LOGIN FORM */}
          {!isRegister ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-slate-700">License ID</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginData.license}
                    onChange={(e) => setLoginData({...loginData, license: e.target.value})}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-xl py-3 outline-none transition-colors"
                    placeholder="e.g. APOLLO-MUM-01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-xl py-3 outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button type="button" onClick={fillDemo} className="font-bold text-teal-600 hover:text-teal-700 hover:underline">
                    Use Demo Credentials
                  </button>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-slate-500 hover:text-slate-900">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-teal-600/20 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 transition-all hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </span>
                ) : 'Access Dashboard'}
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Hospital Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="name" onChange={handleRegChange} required type="text" className="pl-9 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 outline-none border" placeholder="Apollo Clinic" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="email" onChange={handleRegChange} required type="email" className="pl-9 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 outline-none border" placeholder="admin@apollo.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                        <input name="phone" onChange={handleRegChange} required type="tel" className="pl-8 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 outline-none border" placeholder="+91 987..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">License ID</label>
                    <input name="license" onChange={handleRegChange} required type="text" className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 px-3 outline-none border" placeholder="HOS-REG-001" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Address & Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="address" onChange={handleRegChange} required type="text" className="pl-9 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 outline-none border" placeholder="Sector 4, Mumbai" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Primary Contact (Name + Desig)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input name="contactPerson" onChange={handleRegChange} required type="text" className="pl-9 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 outline-none border" placeholder="Dr. Sharma (Head of Ops)" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
                    <input name="password" onChange={handleRegChange} required type="password" className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 px-3 outline-none border" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Confirm</label>
                    <input name="confirmPassword" onChange={handleRegChange} required type="password" className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2.5 px-3 outline-none border" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-70 transition-all mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Registering...
                  </span>
                ) : 'Register Facility'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
