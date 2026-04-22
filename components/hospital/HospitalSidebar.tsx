
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarClock, History, BarChart3, LogOut, PackageSearch, Building, Gift } from 'lucide-react';
import { Logo } from '../Logo';

export const HospitalSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to keep parent active if child route is visited
  const isActive = (path: string) => {
    if (path === '/hospital/rewards') {
        return ['/hospital/rewards', '/hospital/oxygen', '/hospital/cash'].includes(location.pathname);
    }
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/hospital')}>
           <div className="bg-cyan-500/10 p-2 rounded-lg">
              <Logo className="h-8 w-auto" />
           </div>
           <div>
              <span className="text-white font-bold text-lg block tracking-tight leading-none mb-1">Planet Prescription</span>
              <span className="text-cyan-500 font-bold text-[10px] block uppercase tracking-widest">Partner: Apollo Clinic</span>
           </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
         <SidebarItem 
            icon={LayoutDashboard} 
            label="Overview" 
            active={isActive('/hospital')} 
            onClick={() => navigate('/hospital')} 
         />
         <SidebarItem 
            icon={Building} 
            label="Facility Profile" 
            active={isActive('/hospital/profile')} 
            onClick={() => navigate('/hospital/profile')} 
         />
         <SidebarItem 
            icon={Gift} 
            label="Rewards" 
            active={isActive('/hospital/rewards')} 
            onClick={() => navigate('/hospital/rewards')} 
         />
         <SidebarItem 
            icon={CalendarClock} 
            label="Bulk Schedule" 
            active={isActive('/hospital/schedule')} 
            onClick={() => navigate('/hospital/schedule')} 
         />
         <SidebarItem 
            icon={PackageSearch} 
            label="Inventory Scan" 
            active={isActive('/hospital/inventory')} 
            onClick={() => navigate('/hospital/inventory')} 
         />
         <SidebarItem 
            icon={History} 
            label="History" 
            active={isActive('/hospital/compliance')} 
            onClick={() => navigate('/hospital/compliance')} 
         />
         <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            active={isActive('/hospital/analytics')} 
            onClick={() => navigate('/hospital/analytics')} 
         />
      </nav>

      <div className="p-4 border-t border-slate-800">
         <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl mb-3">
            <div className="w-8 h-8 rounded-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold">
               A
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-bold text-white truncate">Admin Desk</p>
               <p className="text-xs text-slate-500 truncate">ID: ADM-05</p>
            </div>
         </div>
         <button onClick={() => navigate('/')} className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full px-4 py-2 text-sm font-bold">
            <LogOut className="w-4 h-4" /> Sign Out
         </button>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium mb-1 ${
       active ? 'bg-cyan-900 text-white shadow-lg shadow-cyan-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
     <Icon className="w-5 h-5" />
     <span className="text-sm">{label}</span>
  </button>
);
