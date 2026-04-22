
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Pill, LayoutDashboard, ScanLine, LogOut, Bell, Menu, X, Gift, Users, ArrowLeft, Trophy, User, Phone } from 'lucide-react';
import { Logo } from '../Logo';
import { RoleSelectionModal } from '../auth/RoleSelectionModal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { translateText } from '../../services/geminiTranslationService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const isLanding = location.pathname === '/';
  const isCommunity = location.pathname === '/community';
  
  const userType = localStorage.getItem('userType');
  const isLoggedIn = !!userType;

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('agentProfile');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardRoute = () => {
    switch (userType) {
        case 'admin': return '/admin';
        case 'agent': return '/agent';
        case 'hospital': return '/hospital';
        case 'user': return '/dashboard';
        default: return '/';
    }
  };

  const handleLogoClick = () => {
    const type = localStorage.getItem('userType');
    if (type === 'admin') {
      navigate('/admin');
    } else if (type === 'agent') {
      navigate('/agent');
    } else if (type === 'hospital') {
      navigate('/hospital');
    } else if (type === 'user') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const getActiveId = (path: string) => {
    if (path === '/user-home') return 'HOME';
    if (path.startsWith('/scan')) return 'SCAN';
    if (path.startsWith('/dashboard')) return 'DASHBOARD';
    if (path.startsWith('/user/rewards')) return 'REWARDS';
    if (path.startsWith('/community')) return 'COMMUNITY';
    if (path.startsWith('/leaderboard')) return 'LEADERBOARD';
    return '';
  };

  const currentView = getActiveId(location.pathname);

  const [landingLinks, setLandingLinks] = useState([
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Impact', id: 'impact' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQs', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ]);

  const [appLinks, setAppLinks] = useState([
    { id: 'HOME', icon: Pill, label: 'Home', path: '/user-home' },
    { id: 'SCAN', icon: ScanLine, label: 'Scan', path: '/scan' },
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'REWARDS', icon: Gift, label: 'Rewards', path: '/user/rewards' },
    { id: 'COMMUNITY', icon: Users, label: 'Community', path: '/community' },
    { id: 'LEADERBOARD', icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  ]);

  useEffect(() => {
    const translateLinks = async () => {
      const translatedLandingLinks = await Promise.all(
        landingLinks.map(async (link) => ({
          ...link,
          label: await translateText(link.label, currentLanguage),
        }))
      );
      setLandingLinks(translatedLandingLinks);

      const translatedAppLinks = await Promise.all(
        appLinks.map(async (link) => ({
          ...link,
          label: await translateText(link.label, currentLanguage),
        }))
      );
      setAppLinks(translatedAppLinks);
    };

    if (currentLanguage !== 'en') {
      translateLinks();
    }

  }, [currentLanguage]);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
              
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
              <Logo className="h-9 w-auto" />
              <div className="hidden md:block">
                <span className="font-bold text-xl text-slate-900 block leading-none tracking-tight">Planet Prescription</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {isCommunity ? (
                <div className="flex items-center gap-4">
                   {isLoggedIn && (
                       <button 
                         onClick={() => navigate(getDashboardRoute())}
                         className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-bold bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                       >
                         <ArrowLeft className="w-4 h-4" />
                         Back to Dashboard
                       </button>
                   )}
                </div>
              ) : isLanding ? (
                <>
                  <div className="flex items-center gap-6">
                    {landingLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => handleScroll(link.id)}
                        className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                  <div className="pl-6 border-l border-slate-200 flex items-center">
                     <LanguageSwitcher onLanguageChange={setCurrentLanguage} />
                    <a href="tel:1800-123-4567" className="flex items-center gap-2 mr-4 text-slate-600 hover:text-teal-600 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-medium">1800-123-4567</span>
                    </a>
                    <Link 
                      to="/admin-login"
                      className="text-emerald-700 hover:text-emerald-800 font-medium px-4 py-2 border border-emerald-600 rounded-lg mr-4 hover:bg-emerald-50 transition-colors"
                    >
                      Admin
                    </Link>
                    <button
                      onClick={() => setIsRoleModalOpen(true)}
                      className="bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium shadow-lg shadow-slate-300/50"
                    >
                      Login / Get Started
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    {appLinks.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                          currentView === item.id 
                            ? 'bg-teal-50 text-teal-700 font-bold' 
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${currentView === item.id ? 'stroke-[2.5px]' : ''}`} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pl-4 border-l border-slate-200 flex items-center gap-4">
                     <LanguageSwitcher onLanguageChange={setCurrentLanguage} />
                    <a href="tel:1800-123-4567" className="text-slate-400 hover:text-teal-600">
                        <Phone className="w-5 h-5" />
                    </a>
                     <button className="text-slate-400 hover:text-teal-600">
                        <Bell className="w-5 h-5" />
                     </button>
                     <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
                <a href="tel:1800-123-4567" className="p-2 text-slate-600">
                    <Phone className="w-6 h-6" />
                </a>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200">
            {isCommunity ? (
               <button 
                 onClick={() => { navigate(getDashboardRoute()); setMobileMenuOpen(false); }}
                 className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-lg font-bold text-slate-800"
               >
                 <ArrowLeft className="w-5 h-5" /> Return to Dashboard
               </button>
            ) : isLanding ? (
              <>
                {landingLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                 <div className="h-px bg-slate-100 my-2"></div>
                 <a href="tel:1800-123-4567" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium">
                    <Phone className="w-5 h-5" />
                    Helpline: 1800-123-4567
                </a>
                <div className="h-px bg-slate-100 my-2"></div>
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/admin-login'); }}
                  className="w-full py-3 text-emerald-700 font-bold border border-emerald-200 rounded-xl bg-emerald-50 mb-2"
                >
                  Admin Portal
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsRoleModalOpen(true); }}
                  className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold"
                >
                  Login / Get Started
                </button>
              </>
            ) : (
              <>
                {appLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                      currentView === item.id ? 'bg-teal-50 text-teal-700' : 'text-slate-600'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-2"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-medium">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Role Selection Modal */}
      <RoleSelectionModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
    </>
  );
};
