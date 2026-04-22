
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, History, Wallet, Award, LifeBuoy, Users, LogOut, Truck } from 'lucide-react';
import { Logo } from '../Logo';
import { getAgentProfile } from '../../utils/storage';

interface AgentProfile {
  name: string;
  photo?: string;
  id?: string;
}

export const AgentSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<AgentProfile>({ name: 'Agent', id: 'AG-000' });

  useEffect(() => {
    const fetchProfile = async () => {
      const stored = await getAgentProfile();
      if (stored) {
        setProfile(stored);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20 h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/agent')}>
           <div className="bg-white/10 p-2 rounded-lg">
              <Logo className="h-8 w-auto" />
           </div>
           <div className="leading-tight">
              <span className="text-white font-bold text-lg block">Planet</span>
              <span className="text-orange-500 font-bold text-sm block tracking-wider">AGENT PORTAL</span>
           </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavItem 
            icon={LayoutDashboard} 
            label="Command Center" 
            active={isActive('/agent') || isActive('/agent/dashboard')} 
            onClick={() => navigate('/agent')} 
        />
        <NavItem 
            icon={User} 
            label="Profile" 
            active={isActive('/agent/profile')} 
            onClick={() => navigate('/agent/profile')} 
        />
        <NavItem 
            icon={History} 
            label="Job History" 
            active={isActive('/agent/history')} 
            onClick={() => navigate('/agent/history')} 
        />
        <NavItem 
            icon={Wallet} 
            label="Earnings" 
            active={isActive('/agent/earnings')} 
            onClick={() => navigate('/agent/earnings')} 
        />
        <NavItem 
            icon={Award} 
            label="Top Performers" 
            onClick={() => navigate('/leaderboard')} 
        />
        <NavItem 
            icon={LifeBuoy} 
            label="Support" 
            active={isActive('/agent/support')} 
            onClick={() => navigate('/agent/support')} 
        />
        <NavItem 
            icon={Users} 
            label="Community" 
            onClick={() => navigate('/community')} 
        />
      </nav>

      {/* Sidebar Footer Profile */}
      <div className="p-4 m-4 bg-slate-800 rounded-xl border border-slate-700">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-600 overflow-hidden">
              {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                      <Truck className="w-5 h-5" />
                  </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-white">{profile.name}</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider">ID: {profile.id || 'AG-8821'}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
         </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium mb-1 ${active ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm">{label}</span>
  </button>
);
