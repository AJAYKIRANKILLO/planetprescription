
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, ArrowRight, UserPlus, MapPin, User, Phone, ArrowLeft } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { getUserProfile, saveUserProfile } from '../../utils/storage';
import { VoiceInput } from '../../components/common/VoiceInput';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup, Auth, UserCredential, OAuthCredential } from 'firebase/auth';

export const UserAuth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Login Form State
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    city: '',
    pincode: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginPhone === '+919876543210' && loginPassword === 'password123') {
        localStorage.setItem('userType', 'user');
        navigate('/user-home');
        return;
    }

    const savedUser = await getUserProfile();
    if (savedUser && savedUser.phone === loginPhone && savedUser.password === loginPassword) {
        localStorage.setItem('userType', 'user');
        navigate('/user-home');
    } else {
        alert('Invalid credentials');
    }
  };

  const handleDemoLogin = () => {
    setLoginPhone('+919876543210');
    setLoginPassword('password123');
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save Profile using utility
    const userProfile = {
      ...formData,
      joinDate: new Date().toISOString()
    };

    await saveUserProfile(userProfile);
    // Save Role
    localStorage.setItem('userType', 'user');
    
    // Navigate to home
    navigate('/user-home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
        const result: UserCredential = await signInWithPopup(auth, googleProvider);
        const credential = (result as any).credential as OAuthCredential;
        if (credential) {
            localStorage.setItem('google_access_token', credential.accessToken || '');
        }

        const user = result.user;
        let userProfile = await getUserProfile();

        if (!userProfile || userProfile.email !== user.email) {
            userProfile = {
                name: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || '',
                joinDate: new Date().toISOString(),
                phone: user.phoneNumber || '',
                age: '', 
                gender: 'Male',
                city: '',
                pincode: ''
            };
            await saveUserProfile(userProfile);
        }

        localStorage.setItem('userType', 'user');
        navigate('/user-home');

    } catch (error) {
        console.error("Error during Google Sign-In: ", error);
    }
}


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
                <Logo className="h-16 w-auto" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isLogin ? 'Login to access your household portal.' : 'Join Planet Prescription to dispose responsibly.'}
            </p>
        </div>

        {/* Toggle Login/Signup */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                    <VoiceInput 
                        type="tel" 
                        name="loginPhone"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-slate-50 text-slate-900"
                        required
                    />
                  </div>
              </div>
              
              <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <input 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-slate-50 text-slate-900"
                      required
                  />
              </div>

              <button 
                  type="submit"
                  className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
              >
                  Login to User Portal
                  <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-all"
              >
                  Demo Login
              </button>
              <div className="flex items-center justify-center">
                <button 
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                    <img src="/google.svg" alt="Google" className="w-5 h-5"/>
                    Sign in with Google
                </button>
              </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                  <VoiceInput 
                    name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Rohit Sharma"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                  <VoiceInput 
                    name="phone" required type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50" 
                  />
                </div>
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label>
                  <VoiceInput 
                    name="age" required type="number" value={formData.age} onChange={handleChange} placeholder="25"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50" 
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gender</label>
                  <select 
                    name="gender" value={formData.gender} onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
               </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">City</label>
                  <div className="relative">
                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 z-10" />
                     <VoiceInput 
                        name="city" required value={formData.city} onChange={handleChange} placeholder="Mumbai"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 text-sm" 
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pincode</label>
                  <VoiceInput 
                    name="pincode" required value={formData.pincode} onChange={handleChange} placeholder="400001"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 text-sm" 
                  />
               </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
              <input 
                name="password" required type="password" value={formData.password} onChange={handleChange} placeholder="Create password"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50" 
              />
            </div>

            <button 
                type="submit"
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2 mt-2"
            >
                Create Account
                <UserPlus className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-center">
              <button 
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                  <img src="/google.svg" alt="Google" className="w-5 h-5"/>
                  Register with Google
              </button>
            </div>
          </form>
        )}

        {/* Footer Toggle */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            {isLogin ? (
               <p className="text-sm text-slate-500">
                  New to Planet Prescription? <button onClick={() => setIsLogin(false)} className="text-teal-600 font-bold hover:underline ml-1">Register Now</button>
               </p>
            ) : (
               <p className="text-sm text-slate-500">
                  Already have an account? <button onClick={() => setIsLogin(true)} className="text-teal-600 font-bold hover:underline ml-1">Login Here</button>
               </p>
            )}
        </div>
      </div>
      
      <button onClick={() => navigate('/')} className="mt-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
    </div>
  );
};
