
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Truck, CreditCard, ChevronRight, ChevronLeft, Upload, CheckCircle } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { getAgentProfile, saveAgentProfile } from '../../utils/storage';
import { VoiceInput } from '../../components/common/VoiceInput';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup, UserCredential, OAuthCredential } from 'firebase/auth';

export const AgentAuth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Wizard State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    name: '',
    phone: '',
    age: '',
    password: '',
    gender: 'Male',
    city: '',
    aadhar: '',
    photo: '', // Base64 string

    // Step 2: Vehicle
    vehicleType: 'Bike',
    licenseNumber: '',
    vehiclePhoto: '', // Base64 string

    // Step 3: Bank
    accountNumber: '',
    bankName: '',
    branch: '',
    ifsc: ''
  });

  // Login State
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const photoInputRef = useRef<HTMLInputElement>(null);
  const vehiclePhotoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [fieldName]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to LocalStorage
    const agentProfile = {
      ...formData,
      id: `AG-${Math.floor(Math.random() * 10000)}`,
      joinDate: new Date().toISOString(),
      status: 'Verified'
    };
    
    await saveAgentProfile(agentProfile);
    // Save Role
    localStorage.setItem('userType', 'agent');
    
    // Navigate to Dashboard
    navigate('/agent');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginId === 'AG-2024' && loginPass === 'password123') {
        localStorage.setItem('userType', 'agent');
        navigate('/agent');
        return;
    }

    const savedAgent = await getAgentProfile();
    if (savedAgent && savedAgent.phone === loginId && savedAgent.password === loginPass) {
        localStorage.setItem('userType', 'agent');
        navigate('/agent');
    } else {
        alert('Invalid credentials');
    }
  };

  const handleDemoLogin = () => {
    setLoginId('AG-2024');
    setLoginPass('password123');
  }

  const handleGoogleSignIn = async () => {
    try {
        const result: UserCredential = await signInWithPopup(auth, googleProvider);
        const credential = (result as any).credential as OAuthCredential;
        if (credential) {
            localStorage.setItem('google_access_token', credential.accessToken || '');
        }

        const user = result.user;
        let agentProfile = await getAgentProfile();

        if (!agentProfile || agentProfile.email !== user.email) {
            agentProfile = {
                name: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || '',
                joinDate: new Date().toISOString(),
                id: `AG-${Math.floor(Math.random() * 10000)}`,
                status: 'Verified',
                phone: '', age: '', gender: 'Male', city: '', aadhar: '', photo: '', vehicleType: 'Bike', licenseNumber: '', vehiclePhoto: '', accountNumber: '', bankName: '', branch: '', ifsc: ''
            };
            await saveAgentProfile(agentProfile);
        }

        localStorage.setItem('userType', 'agent');
        navigate('/agent');

    } catch (error) {
        console.error("Error during Google Sign-In: ", error);
    }
}
  
  const [step, setStep] = useState(1);
  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-slate-100">
      
      {/* Header / Brand */}
      <div className="mb-8 text-center">
         <div className="flex flex-col items-center gap-4 mb-4">
            <Logo className="h-16 w-auto" />
            <span className="text-2xl font-bold tracking-tight text-white">Planet Prescription <span className="text-orange-500">Agent</span></span>
         </div>
         <p className="text-slate-400 text-sm">Logistics Partner Portal</p>
      </div>

      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-lg overflow-hidden">
        
        {/* Toggle Header */}
        <div className="flex border-b border-slate-700">
            <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${isLogin ? 'bg-slate-800 text-orange-500 border-b-2 border-orange-500' : 'bg-slate-900/50 text-slate-500 hover:text-slate-300'}`}
            >
                Agent Login
            </button>
            <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${!isLogin ? 'bg-slate-800 text-orange-500 border-b-2 border-orange-500' : 'bg-slate-900/50 text-slate-500 hover:text-slate-300'}`}
            >
                New Registration
            </button>
        </div>

        <div className="p-8">
            {isLogin ? (
                /* LOGIN FORM */
                <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent ID / Phone</label>
                        <VoiceInput 
                            value={loginId} onChange={e => setLoginId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. AG-2024"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Password</label>
                        <input 
                            type="password"
                            value={loginPass} onChange={e => setLoginPass(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all">
                        Access Dashboard
                    </button>
                     <button type="button" onClick={handleDemoLogin} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all mt-2">
                        Demo Login
                    </button>
                     <div className="flex items-center justify-center">
                        <button 
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            <img src="/google.svg" alt="Google" className="w-5 h-5"/>
                            Sign in with Google
                        </button>
                     </div>
                </form>
            ) : (
                /* REGISTRATION WIZARD */
                <form onSubmit={handleRegister} className="animate-in fade-in slide-in-from-right-4 duration-300">
                    
                    {/* Progress Steps */}
                    <div className="flex justify-between mb-8 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 -z-10 -translate-y-1/2"></div>
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Personal Details */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                                <User className="w-5 h-5 text-orange-500" /> Personal Identity
                            </h3>
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div 
                                    onClick={() => photoInputRef.current?.click()}
                                    className="w-20 h-20 rounded-full bg-slate-700 border-2 border-dashed border-slate-500 flex items-center justify-center cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-colors overflow-hidden"
                                >
                                    {formData.photo ? (
                                        <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload className="w-6 h-6 text-slate-400" />
                                    )}
                                </div>
                                <div className="text-sm text-slate-400">
                                    <p className="font-bold text-slate-200">Profile Photo</p>
                                    <p className="text-xs">Tap to upload clear face photo</p>
                                    <input type="file" ref={photoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} />
                                </div>
                            </div>

                            <VoiceInput name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 text-sm" />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <VoiceInput name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 text-sm" />
                                <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 text-sm" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <VoiceInput name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="Age" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 text-sm" />
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-2 py-2.5 outline-none focus:border-orange-500 text-sm">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <VoiceInput name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 text-sm" />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Vehicle Details */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                                <Truck className="w-5 h-5 text-orange-500" /> Vehicle Information
                            </h3>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Vehicle Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Bike', 'Van'].map(type => (
                                        <div 
                                            key={type}
                                            onClick={() => setFormData({...formData, vehicleType: type})}
                                            className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${formData.vehicleType === type ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-slate-700 bg-slate-900 text-slate-400'}`}
                                        >
                                            <span className="font-bold">{type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">License Plate Number</label>
                                <VoiceInput name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} placeholder="DL 01 AB 1234" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 uppercase tracking-widest font-mono" />
                            </div>

                            <div 
                                onClick={() => vehiclePhotoInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-orange-500 hover:bg-slate-900/50 transition-all"
                            >
                                {formData.vehiclePhoto ? (
                                    <div className="relative h-32 w-full rounded-lg overflow-hidden">
                                        <img src={formData.vehiclePhoto} alt="Vehicle" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                        <p className="text-sm text-slate-400">Upload Vehicle Photo</p>
                                    </>
                                )}
                                <input type="file" ref={vehiclePhotoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'vehiclePhoto')} />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Bank Details */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-orange-500" /> Bank Details
                            </h3>
                            
                            <VoiceInput name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Account Number" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 font-mono" />
                            
                            <VoiceInput name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="Bank Name" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500" />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <VoiceInput name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Branch" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500" />
                                <VoiceInput name="ifsc" value={formData.ifsc} onChange={handleInputChange} placeholder="IFSC Code" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-orange-500 uppercase" />
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-slate-700">
                        {step > 1 && (
                            <button type="button" onClick={handlePrev} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                <ChevronLeft className="w-4 h-4" /> Prev
                            </button>
                        )}
                        
                        {step < 3 ? (
                            <button type="button" onClick={handleNext} className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button type="submit" className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                Submit Registration
                            </button>
                        )}
                    </div>
                    <div className="flex items-center justify-center">
                      <button 
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2"
                      >
                          <img src="/google.svg" alt="Google" className="w-5 h-5"/>
                          Register with Google
                      </button>
                    </div>
                </form>
            )}
        </div>
      </div>

      <button onClick={() => navigate('/')} className="mt-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
    </div>
  );
};
