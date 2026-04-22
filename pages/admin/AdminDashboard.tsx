
import React, { useEffect, useState } from 'react';
import { 
  Users, Truck, Scale, Settings, 
  BarChart3, LogOut, ChevronDown, Bell, Building2, User, BarChart2, Map, MapPin
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { LogoutConfirmationModal } from '../../components/admin/LogoutConfirmationModal';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    // Check for admin login status
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeLogoutModal();
  };

  const isActive = (path: string) => {
    // Exact match for root, or starts with for sub-routes
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 text-slate-300 flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin')}>
             <Logo className="h-8 w-auto" />
             <div>
                <span className="text-white font-bold text-lg block tracking-tight">Planet</span>
                <span className="text-blue-400 font-bold text-[10px] block uppercase tracking-widest">Control Tower</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
           <AdminNavItem 
              icon={BarChart3} 
              label="Overview" 
              active={isActive('/admin') && location.pathname === '/admin'} 
              onClick={() => navigate('/admin')} 
           />
           <AdminNavItem 
              icon={Map} 
              label="Route Optimization" 
              active={isActive('/admin/routes')} 
              onClick={() => navigate('/admin/routes')} 
           />
           <AdminNavItem 
              icon={MapPin} 
              label="Live Location" 
              active={isActive('/admin/live-location')} 
              onClick={() => navigate('/admin/live-location')} 
           />
           <AdminNavItem 
              icon={Users} 
              label="User Management" 
              active={isActive('/admin/users')} 
              onClick={() => navigate('/admin/users')} 
           />
           <AdminNavItem 
              icon={Building2} 
              label="Hospitals" 
              active={isActive('/admin/hospitals')} 
              onClick={() => navigate('/admin/hospitals')} 
           />
           <AdminNavItem 
              icon={Truck} 
              label="Agent Fleet" 
              active={isActive('/admin/fleet')} 
              onClick={() => navigate('/admin/fleet')} 
           />
           <AdminNavItem 
              icon={Scale} 
              label="Waste Analytics" 
              active={isActive('/admin/analytics')} 
              onClick={() => navigate('/admin/analytics')} 
           />
           <AdminNavItem 
              icon={BarChart2} 
              label="Global Rankings" 
              active={isActive('/leaderboard')} 
              onClick={() => navigate('/leaderboard')} 
           />
           <AdminNavItem 
              icon={User} 
              label="My Profile" 
              active={isActive('/admin/profile')} 
              onClick={() => navigate('/admin/profile')} 
           />
           <AdminNavItem 
              icon={Settings} 
              label="System Settings" 
              active={isActive('/admin/settings')} 
              onClick={() => navigate('/admin/settings')} 
           />
        </nav>

        <div className="p-4 border-t border-slate-700">
           <button onClick={openLogoutModal} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-20">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 System Operational
              </span>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <p className="text-slate-500 text-sm">Last sync: Just now</p>
           </div>

           <div className="flex items-center gap-6">
              <div className="relative">
                 <Bell className="w-5 h-5 text-slate-500 hover:text-slate-700 cursor-pointer" />
                 <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                    SA
                 </div>
                 <div className="hidden md:block">
                    <p className="text-sm font-bold text-slate-800 leading-none">Super Admin</p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Access Level 1</p>
                 </div>
                 <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
           </div>
        </header>

        {/* DASHBOARD CONTENT SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-7xl mx-auto">
              <Outlet />
           </div>
        </div>
      </main>

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

// --- Sub-components ---

const AdminNavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
  >
     <Icon className="w-5 h-5" />
     <span className="text-sm">{label}</span>
  </button>
);
