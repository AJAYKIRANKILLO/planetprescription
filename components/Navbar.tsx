
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pill, LayoutDashboard, Map, ScanLine, LogOut } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to Landing Page
    navigate('/');
  };

  const getActiveId = (path: string) => {
    // If we are at root, technically it's home, but Navbar is usually hidden there.
    // Inside the app, 'HOME' is /user-home
    if (path === '/user-home') return 'HOME';
    if (path.startsWith('/scan')) return 'SCAN';
    if (path.startsWith('/dashboard')) return 'DASHBOARD';
    if (path.startsWith('/agent')) return 'AGENT'; 
    return '';
  };

  const currentView = getActiveId(location.pathname);

  const navItems = [
    { id: 'HOME', icon: Pill, label: 'Home', path: '/user-home' },
    { id: 'SCAN', icon: ScanLine, label: 'Scan', path: '/scan' },
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'AGENT', icon: Map, label: 'Locate', path: '/agent' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b md:h-20">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex justify-around md:justify-between items-center h-16 md:h-20">
            
          <div className="hidden md:flex items-center gap-3 cursor-pointer" onClick={() => navigate('/user-home')}>
            <Logo className="h-10 w-auto" />
            <div>
              <span className="font-bold text-xl text-slate-900 block leading-none">Planet Prescription</span>
            </div>
          </div>

          <div className="flex w-full md:w-auto justify-around md:justify-end md:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2.5 rounded-xl transition-all duration-200 ${
                  currentView === item.id 
                    ? 'text-teal-700 md:bg-teal-50' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`w-6 h-6 md:w-5 md:h-5 ${currentView === item.id ? 'stroke-[2.5px]' : ''}`} />
                <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
              </button>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2.5 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-6 h-6 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
