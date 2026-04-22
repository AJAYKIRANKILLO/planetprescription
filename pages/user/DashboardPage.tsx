
import React, { useEffect, useState } from 'react';
import { BackButton } from '../../components/common/BackButton';
import { ShareImpactButton } from '../../components/common/ShareImpactButton';
import { UserFeedbackForm } from '../../components/user/UserFeedbackForm';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, Leaf, Clock, Activity, ArrowUpRight, 
  Wallet, Trophy, Shield, Zap, Recycle, Award, Package, 
  User, MapPin, Phone, Calendar, PenLine, Save, X, LayoutGrid, Users
} from 'lucide-react';
import { StoredPickup, UserProfile, getUserPickups, getLifetimeUsage, getUserProfile, saveUserProfile } from '../../utils/storage';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile'>('overview');
  const [pickups, setPickups] = useState<StoredPickup[]>([]);
  const [lifetimeUsage, setLifetimeUsage] = useState(0);
  
  // Profile State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editForm, setEditForm] = useState({ city: '', pincode: '' });

  useEffect(() => {
    try {
      setPickups(getUserPickups());
      setLifetimeUsage(getLifetimeUsage());
      setProfile(getUserProfile());
    } catch (error) {
      console.error("Data load failed", error);
      setPickups([]);
      setLifetimeUsage(0);
    }
  }, []);

  // Profile Edit Handlers
  const startEditAddress = () => {
    if (profile) {
      setEditForm({ city: profile.city, pincode: profile.pincode });
      setIsEditingAddress(true);
    }
  };

  const cancelEditAddress = () => {
    setIsEditingAddress(false);
  };

  const saveAddress = () => {
    if (profile) {
      const updatedProfile = { ...profile, city: editForm.city, pincode: editForm.pincode };
      setProfile(updatedProfile);
      saveUserProfile(updatedProfile);
      setIsEditingAddress(false);
    }
  };

  // Calculation Logic
  const totalCredits = pickups.length * 10;
  const wasteCollected = (pickups.length * 0.1).toFixed(1); 
  const co2Saved = (pickups.length * 0.5).toFixed(1);

  const handleRedeem = () => {
    if (totalCredits === 0) {
      alert("You need to earn credits before redeeming!");
      return;
    }
    alert(`Redemption code sent to email! You redeemed ₹${totalCredits}.`);
  };

  const stats = [
    { 
      label: 'Waste Collected', 
      value: `${wasteCollected} kg`, 
      icon: Scale, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      trend: 'Lifetime total'
    },
    { 
      label: 'CO2 Emission Saved', 
      value: `${co2Saved} kg`, 
      icon: Leaf, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      trend: 'Equivalent to 2 trees'
    },
    { 
      label: 'Successful Disposals', 
      value: lifetimeUsage, 
      icon: Recycle, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      trend: 'Total contributions',
      highlight: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
      <BackButton />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Dashboard</h1>
            <p className="text-slate-500 mt-1">Track your contribution to a safer environment.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'overview' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
                <LayoutGrid className="w-4 h-4" />
                Overview
            </button>
            <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'profile' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
                <User className="w-4 h-4" />
                My Profile
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR - PROFILE & REWARDS */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* User Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-10 z-0"></div>
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-slate-200 mb-4 z-10 relative overflow-hidden flex items-center justify-center text-4xl font-bold text-slate-400 bg-slate-100">
               {profile ? (
                   <span className="text-teal-700">{profile.name.charAt(0)}</span>
               ) : (
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" alt="User" className="w-full h-full object-cover" />
               )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 z-10">
                {profile ? profile.name : "Guest User"}
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mt-2 z-10">
              <Shield className="w-3 h-3" /> Eco-Warrior (Level 2)
            </div>
            <p className="text-slate-500 text-sm mt-4 z-10">
                Member since {profile ? new Date(profile.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Feb 2024'}
            </p>
          </div>

          {/* Community Promo */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-slate-900">Join the Community</h3>
             <p className="text-xs text-slate-500 mt-1 mb-4">Connect with agents and neighbors. Share your impact story.</p>
             <button onClick={() => navigate('/community')} className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                Open Feed
             </button>
          </div>

          {/* Wallet Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Wallet className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h3 className="text-teal-100 font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" /> Green Credits
              </h3>
              <div className="text-4xl font-bold mt-2">₹{totalCredits}</div>
              <p className="text-teal-100 text-xs mt-1 mb-6">Earn ₹10 for every scheduled pickup</p>
              
              <button 
                onClick={handleRedeem}
                className="w-full py-2 bg-white text-teal-700 font-bold rounded-lg shadow-sm hover:bg-teal-50 transition-colors text-sm"
              >
                Redeem Credits
              </button>
            </div>
          </div>
          
          {/* Feedback Section (New) */}
          <UserFeedbackForm />

        </div>

        {/* RIGHT MAIN AREA */}
        <div className="lg:col-span-3 space-y-8">
            
          {activeTab === 'overview' ? (
            /* OVERVIEW TAB CONTENT */
            <>
                {/* Stats & Header Container for Screenshot */}
                <div id="dashboard-stats-grid" className="space-y-4 rounded-xl p-2 md:p-0">
                    {/* Header for Stats */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {profile ? `Good morning, ${profile.name.split(' ')[0]}` : 'Your Impact'}
                        </h3>
                        <p className="text-sm text-slate-500">Here is your eco-impact summary.</p>
                      </div>
                      <div data-html2canvas-ignore="true">
                         <ShareImpactButton targetId="dashboard-stats-grid" />
                      </div>
                    </div>

                    {/* Impact Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 p-2 -m-2 bg-slate-50/50 rounded-xl">
                        {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-200 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
                                <ArrowUpRight className="w-3 h-3" />
                                Impact
                            </span>
                            </div>
                            <div>
                            <h3 className={`font-bold text-slate-900 mb-0.5 ${stat.highlight ? 'text-4xl text-green-600' : 'text-2xl'}`}>{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-xs text-slate-400 mt-2">{stat.trend}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 mt-8">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                        <Activity className="w-5 h-5 text-teal-600" />
                        Pickup History
                    </h3>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                    {pickups.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Package className="w-8 h-8 text-slate-400" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">No activity yet</h4>
                        <p className="text-slate-500 max-w-sm mt-1">Your scheduled pickups and contribution history will appear here once you scan your first medicine.</p>
                        </div>
                    ) : (
                        pickups.map((item) => (
                        <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors group">
                            <div className="flex items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                item.riskLevel === 'High Risk' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                }`}>
                                <Award className="w-5 h-5" />
                                </div>
                                <div>
                                <p className="font-bold text-slate-900 text-base">{item.medicineName}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    {item.pickupDate} ({item.timeSlot})
                                    </span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                                    item.riskLevel === 'High Risk' ? 'bg-red-50 text-red-600 border-red-100' : 
                                    item.riskLevel === 'Low Risk' ? 'bg-green-50 text-green-600 border-green-100' :
                                    'bg-orange-50 text-orange-600 border-orange-100'
                                    }`}>
                                    {item.riskLevel}
                                    </span>
                                </div>
                                </div>
                            </div>
                            
                            <div className="text-right hidden md:block">
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
                                    item.status === 'Collected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {item.status}
                                </span>
                                <p className="text-xs text-teal-600 font-bold mt-1">+10 Credits</p>
                            </div>
                            </div>
                        </div>
                        ))
                    )}
                    </div>
                </div>
            </>
          ) : (
            /* PROFILE TAB CONTENT */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                        <User className="w-5 h-5 text-teal-600" />
                        My Profile
                    </h3>
                </div>
                
                {profile ? (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Personal Details */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Personal Details</h4>
                            
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><User className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">Full Name</p>
                                    <p className="text-slate-900 font-medium">{profile.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Phone className="w-5 h-5" /></div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">Phone Number</p>
                                    <p className="text-slate-900 font-medium">{profile.phone}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Calendar className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase">Age</p>
                                        <p className="text-slate-900 font-medium">{profile.age} Years</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Gender</p>
                                    <p className="text-slate-900 font-medium">{profile.gender}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address Details (Editable) */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-4">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Address Details</h4>
                                {!isEditingAddress ? (
                                    <button 
                                        onClick={startEditAddress}
                                        className="text-teal-600 hover:text-teal-700 text-xs font-bold flex items-center gap-1 hover:bg-teal-50 px-2 py-1 rounded transition-colors"
                                    >
                                        <PenLine className="w-3 h-3" /> Edit
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={cancelEditAddress} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                                        <button onClick={saveAddress} className="text-teal-600 hover:text-teal-700"><Save className="w-4 h-4" /></button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <div className="flex gap-3 mb-6">
                                    <div className="p-2 bg-white rounded-lg text-teal-600 shadow-sm"><MapPin className="w-5 h-5" /></div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400 font-semibold uppercase mb-1">City</p>
                                        {isEditingAddress ? (
                                            <input 
                                                value={editForm.city}
                                                onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                                                className="w-full p-2 border border-teal-300 rounded focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                                                autoFocus
                                            />
                                        ) : (
                                            <p className="text-slate-900 font-medium text-lg">{profile.city}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-9"></div> {/* Spacer for icon alignment */}
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Pincode</p>
                                        {isEditingAddress ? (
                                            <input 
                                                value={editForm.pincode}
                                                onChange={(e) => setEditForm({...editForm, pincode: e.target.value})}
                                                className="w-full p-2 border border-teal-300 rounded focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                                            />
                                        ) : (
                                            <p className="text-slate-900 font-medium text-lg tracking-wider">{profile.pincode}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-400">
                        <User className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                        <h3 className="text-lg font-bold text-slate-600">Guest Account</h3>
                        <p className="text-sm mt-2">Log out and register to save your profile details.</p>
                    </div>
                )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
