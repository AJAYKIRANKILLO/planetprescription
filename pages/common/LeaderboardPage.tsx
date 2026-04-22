
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Crown, Medal, ArrowUp, ArrowDown, Minus, 
  Filter, ArrowLeft, Leaf, Scale, Pill 
} from 'lucide-react';
import { LEADERBOARD_USERS, LEADERBOARD_AGENTS, LeaderboardEntry } from '../../data/leaderboardData';

export const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('all');
  const [viewType, setViewType] = useState<'User' | 'Agent'>('User');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userType');
    setUserRole(role);

    if (role === 'agent') {
      setViewType('Agent');
    } else if (role === 'user') {
      setViewType('User');
    }
    // Admin can stay on default or toggle
  }, []);

  // Select Data Source
  const currentData = viewType === 'User' ? LEADERBOARD_USERS : LEADERBOARD_AGENTS;
  
  // Sort data based on points (descending) just in case
  const sortedData = [...currentData].sort((a, b) => b.points - a.points);

  const topThree = sortedData.slice(0, 3);
  const restOfList = sortedData.slice(3);

  const handleBack = () => {
    const currentRole = localStorage.getItem('userType');
    if (currentRole === 'agent') {
      navigate('/agent');
    } else if (currentRole === 'admin') {
      navigate('/admin');
    } else if (currentRole === 'hospital') {
      navigate('/hospital');
    } else {
      navigate('/dashboard');
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-gradient-to-r from-slate-300 to-slate-100 text-slate-800 border-slate-300';
      case 'Gold': return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 border-amber-300';
      case 'Silver': return 'bg-gradient-to-r from-gray-100 to-slate-200 text-slate-700 border-slate-300';
      default: return 'bg-orange-50 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 pb-24 pt-8 px-4 md:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack} 
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-300 fill-current" />
              Global Leaderboard
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            {/* Timeframe Tabs */}
            <div className="bg-black/20 p-1 rounded-xl backdrop-blur-md inline-flex">
              {['This Week', 'This Month', 'All Time'].map((t) => {
                const key = t.toLowerCase().replace(' ', '') as any;
                const isActive = (key === 'thisweek' && timeframe === 'week') || 
                                 (key === 'thismonth' && timeframe === 'month') || 
                                 (key === 'alltime' && timeframe === 'all');
                
                return (
                  <button
                    key={t}
                    onClick={() => setTimeframe(key === 'thisweek' ? 'week' : key === 'thismonth' ? 'month' : 'all')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      isActive ? 'bg-white text-purple-700 shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Role Toggle Logic */}
            {userRole === 'admin' ? (
                <div className="bg-white rounded-xl p-1 shadow-lg flex">
                <button 
                    onClick={() => setViewType('User')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    viewType === 'User' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    Households
                </button>
                <button 
                    onClick={() => setViewType('Agent')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    viewType === 'Agent' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    Agents
                </button>
                </div>
            ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-sm">
                    Viewing: {viewType === 'User' ? 'Household' : 'Agent'} Rankings
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 pb-12">
        
        {/* 2. Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-end">
          
          {/* Rank 2 */}
          {topThree[1] && (
          <div className="order-2 md:order-1 bg-white rounded-2xl shadow-xl border-b-4 border-yellow-400 overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
             <div className="h-24 bg-gradient-to-br from-yellow-300 to-orange-400 relative flex justify-center items-end pb-4">
                <div className="absolute top-4 left-4 text-yellow-800 font-bold bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs">#2</div>
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden -mb-10 bg-white">
                   <img src={topThree[1].avatar} alt="Rank 2" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="pt-12 pb-6 px-6 text-center">
                <h3 className="font-bold text-slate-900 text-lg">{topThree[1].name}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{topThree[1].tier} Tier</p>
                <div className="bg-slate-50 rounded-xl p-3">
                   <p className="text-2xl font-extrabold text-yellow-600">{topThree[1].points}</p>
                   <p className="text-xs text-slate-400">Green Credits</p>
                </div>
             </div>
          </div>
          )}

          {/* Rank 1 (Center, Larger) */}
          {topThree[0] && (
          <div className="order-1 md:order-2 bg-white rounded-2xl shadow-2xl border-b-4 border-purple-500 overflow-hidden transform hover:-translate-y-3 transition-all duration-300 scale-105 z-10 relative">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
             <div className="h-32 bg-gradient-to-br from-indigo-600 to-purple-700 relative flex justify-center items-end pb-6">
                <Crown className="absolute top-4 w-8 h-8 text-yellow-300 fill-current animate-bounce" />
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden -mb-12 bg-white relative z-10">
                   <img src={topThree[0].avatar} alt="Rank 1" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="pt-14 pb-8 px-8 text-center">
                <h3 className="font-bold text-slate-900 text-xl">{topThree[0].name}</h3>
                <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-center gap-1">
                   <Crown className="w-3 h-3" /> {topThree[0].tier} Champion
                </p>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                   <p className="text-3xl font-black text-purple-700">{topThree[0].points}</p>
                   <p className="text-xs text-purple-400 font-bold uppercase">Total Points</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-left">
                   <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Saved</p>
                      <p className="text-sm font-bold text-slate-700">{topThree[0].co2Saved}kg CO2</p>
                   </div>
                   <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Items</p>
                      <p className="text-sm font-bold text-slate-700">{topThree[0].medicinesDisposed}</p>
                   </div>
                </div>
             </div>
          </div>
          )}

          {/* Rank 3 */}
          {topThree[2] && (
          <div className="order-3 bg-white rounded-2xl shadow-xl border-b-4 border-orange-400 overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
             <div className="h-24 bg-gradient-to-br from-orange-400 to-red-400 relative flex justify-center items-end pb-4">
                <div className="absolute top-4 left-4 text-white font-bold bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs">#3</div>
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden -mb-10 bg-white">
                   <img src={topThree[2].avatar} alt="Rank 3" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="pt-12 pb-6 px-6 text-center">
                <h3 className="font-bold text-slate-900 text-lg">{topThree[2].name}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{topThree[2].tier} Tier</p>
                <div className="bg-slate-50 rounded-xl p-3">
                   <p className="text-2xl font-extrabold text-orange-600">{topThree[2].points}</p>
                   <p className="text-xs text-slate-400">Green Credits</p>
                </div>
             </div>
          </div>
          )}

        </div>

        {/* 3. Detailed Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">Top Performers</h3>
              {userRole === 'admin' && (
                <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors">
                    <Filter className="w-4 h-4" /> Filter
                </button>
              )}
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                 <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-4">Rank</th>
                       <th className="px-6 py-4">Name</th>
                       <th className="px-6 py-4">Tier Status</th>
                       <th className="px-6 py-4">Points</th>
                       <th className="px-6 py-4">Medicines</th>
                       <th className="px-6 py-4">Weight</th>
                       <th className="px-6 py-4">CO2 Saved</th>
                       <th className="px-6 py-4 text-center">Trend</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {restOfList.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 font-bold text-slate-400 group-hover:text-purple-600">
                             #{item.rank}
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full border border-slate-200" />
                                <span className="font-bold text-slate-900">{item.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getTierColor(item.tier)}`}>
                                {item.tier}
                             </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">{item.points}</td>
                          <td className="px-6 py-4 flex items-center gap-2">
                             <Pill className="w-4 h-4 text-slate-400" /> {item.medicinesDisposed}
                          </td>
                          <td className="px-6 py-4">
                             <span className="flex items-center gap-2"><Scale className="w-4 h-4 text-slate-400" /> {item.wasteWeight} kg</span>
                          </td>
                          <td className="px-6 py-4 text-green-600 font-medium">
                             <span className="flex items-center gap-2"><Leaf className="w-4 h-4" /> {item.co2Saved} kg</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                             {item.change === 'up' && <ArrowUp className="w-4 h-4 text-green-500 mx-auto" />}
                             {item.change === 'down' && <ArrowDown className="w-4 h-4 text-red-500 mx-auto" />}
                             {item.change === 'same' && <Minus className="w-4 h-4 text-slate-300 mx-auto" />}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* 4. Tier Explainer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
           <div className="bg-slate-900 text-white p-4 rounded-xl text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Platinum</div>
              <div className="font-black text-xl mb-1">2000+ Pts</div>
              <div className="text-[10px] text-slate-400">Exclusive Insurance Perks</div>
           </div>
           <div className="bg-white border border-yellow-200 p-4 rounded-xl text-center shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-1">Gold</div>
              <div className="font-black text-xl mb-1 text-slate-900">1500+ Pts</div>
              <div className="text-[10px] text-slate-500">15% Discount Vouchers</div>
           </div>
           <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Silver</div>
              <div className="font-black text-xl mb-1 text-slate-900">1000+ Pts</div>
              <div className="text-[10px] text-slate-500">10% Discount Vouchers</div>
           </div>
           <div className="bg-white border border-orange-200 p-4 rounded-xl text-center shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">Bronze</div>
              <div className="font-black text-xl mb-1 text-slate-900">Start</div>
              <div className="text-[10px] text-slate-500">Basic Rewards</div>
           </div>
        </div>

      </div>
    </div>
  );
};
