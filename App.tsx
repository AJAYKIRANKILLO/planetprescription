
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { FloatingHelpline } from './components/common/FloatingHelpline';
import VoiceAgent from './components/common/VoiceAgent';
import { LandingPage } from './pages/public/LandingPage';
import { UserAuth } from './pages/auth/UserAuth';
import { AgentAuth } from './pages/auth/AgentAuth';
import { AdminAuth } from './pages/auth/AdminAuth';
import { HospitalAuth } from './pages/hospital/HospitalAuth';
import { LeaderboardPage } from './pages/common/LeaderboardPage';
import { MedicineAnalysis } from './types';
import { Calendar } from 'lucide-react';
import { saveUserPickup } from './utils/storage';
import { AgentLayout } from './layouts/AgentLayout';
import { LanguageSwitcher } from './components/common/LanguageSwitcher';

// Lazy-loaded Admin Components
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminOverview = lazy(() => import('./pages/admin/sections/AdminOverview').then(module => ({ default: module.AdminOverview })));
const AdminUsers = lazy(() => import('./pages/admin/sections/AdminUsers').then(module => ({ default: module.AdminUsers })));
const AdminFleet = lazy(() => import('./pages/admin/sections/AdminFleet').then(module => ({ default: module.AdminFleet })));
const AdminAnalytics = lazy(() => import('./pages/admin/sections/AdminAnalytics').then(module => ({ default: module.AdminAnalytics })));
const AdminSettings = lazy(() => import('./pages/admin/sections/AdminSettings').then(module => ({ default: module.AdminSettings })));
const AdminHospitals = lazy(() => import('./pages/admin/sections/AdminHospitals').then(module => ({ default: module.AdminHospitals })));
const AdminProfile = lazy(() => import('./pages/admin/sections/AdminProfile').then(module => ({ default: module.AdminProfile })));
const RouteOptimization = lazy(() => import('./pages/admin/RouteOptimization').then(module => ({ default: module.RouteOptimization })));
const LiveLocation = lazy(() => import('./pages/admin/LiveLocation').then(module => ({ default: module.LiveLocation })));

// Lazy-loaded User Components
const HomePage = lazy(() => import('./pages/user/HomePage').then(module => ({ default: module.HomePage })));
const ScanPage = lazy(() => import('./pages/user/ScanPage').then(module => ({ default: module.ScanPage })));
const DashboardPage = lazy(() => import('./pages/user/DashboardPage').then(module => ({ default: module.DashboardPage })));
const RewardsPage = lazy(() => import('./pages/user/RewardsPage').then(module => ({ default: module.RewardsPage })));
const CommunityPage = lazy(() => import('./pages/community/CommunityPage').then(module => ({ default: module.CommunityPage })));

// Lazy-loaded Agent Components
const AgentDashboard = lazy(() => import('./pages/agent/AgentDashboard').then(module => ({ default: module.AgentDashboard })));
const AgentProfile = lazy(() => import('./pages/agent/AgentProfile').then(module => ({ default: module.AgentProfile })));
const EarningsPage = lazy(() => import('./pages/agent/EarningsPage').then(module => ({ default: module.EarningsPage })));
const SupportPage = lazy(() => import('./pages/agent/SupportPage').then(module => ({ default: module.SupportPage })));
const PickupHistoryPage = lazy(() => import('./pages/agent/PickupHistoryPage').then(module => ({ default: module.PickupHistoryPage })));

// Lazy-loaded Hospital Components
const HospitalDashboard = lazy(() => import('./pages/hospital/HospitalDashboard').then(module => ({ default: module.HospitalDashboard })));
const HospitalProfile = lazy(() => import('./pages/hospital/HospitalProfile').then(module => ({ default: module.HospitalProfile })));
const HospitalAnalytics = lazy(() => import('./pages/hospital/HospitalAnalytics').then(module => ({ default: module.HospitalAnalytics })));
const BulkPickupForm = lazy(() => import('./pages/hospital/BulkPickupForm').then(module => ({ default: module.BulkPickupForm })));
const ComplianceCerts = lazy(() => import('./pages/hospital/ComplianceCerts').then(module => ({ default: module.ComplianceCerts })));
const HospitalInventory = lazy(() => import('./pages/hospital/HospitalInventory').then(module => ({ default: module.HospitalInventory })));
const HospitalOxygen = lazy(() => import('./pages/hospital/HospitalOxygen').then(module => ({ default: module.HospitalOxygen })));
const HospitalRewards = lazy(() => import('./pages/hospital/HospitalRewards').then(module => ({ default: module.HospitalRewards })));
const HospitalCash = lazy(() => import('./pages/hospital/HospitalCash').then(module => ({ default: module.HospitalCash })));

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<MedicineAnalysis | null>(null);
  // Form state for date
  const [selectedDate, setSelectedDate] = useState('');

  // Routes where the User Navbar should be hidden
  const hideNavbarRoutes = [
    '/user-login', '/agent-login', '/admin', '/admin-login', 
    '/hospital-login', '/hospital', '/hospital/schedule', 
    '/hospital/compliance', '/hospital/inventory', '/hospital/analytics', '/hospital/profile', 
    '/hospital/oxygen', '/hospital/rewards', '/hospital/cash',
    '/community', '/agent', '/agent/dashboard', '/agent/profile', '/agent/support', '/agent/earnings', '/agent/history',
    '/leaderboard' // Leaderboard handles its own layout
  ];
  
  // Logic to determine context
  const isAgentPortal = location.pathname.startsWith('/agent') && location.pathname !== '/agent-login';
  const isAdminPortal = location.pathname.startsWith('/admin') || location.pathname === '/admin-login';
  const isHospitalPortal = location.pathname.startsWith('/hospital') || location.pathname === '/hospital-login';
  
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !isAgentPortal && !isAdminPortal && !isHospitalPortal;

  useEffect(() => {
    console.log('App running');
  }, []);

  const handleSchedulePickup = (analysis: MedicineAnalysis) => {
    setPendingAnalysis(analysis);
    setShowScheduleModal(true);
  };

  const confirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingAnalysis) return;

    // Create a record compatible with DashboardPage's StoredPickup interface
    const newRequest = {
      id: Date.now().toString(),
      medicineName: pendingAnalysis.name,
      pickupDate: selectedDate || new Date().toISOString().split('T')[0],
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'Scheduled',
      riskLevel: pendingAnalysis.riskLevel,
      timestamp: new Date().toISOString()
    };

    try {
      saveUserPickup(newRequest);
    } catch (err) {
      console.error("Failed to save pickup", err);
    }

    setShowScheduleModal(false);
    setPendingAnalysis(null);
    setSelectedDate('');
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen font-sans ${isAgentPortal || isAdminPortal ? 'bg-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Conditionally render Navbar at the TOP */}
      {shouldShowNavbar && <Navbar />}

      <main className={`min-h-screen ${shouldShowNavbar ? '' : ''}`}>
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><p className="text-xl font-semibold text-slate-700">Loading...</p></div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user-login" element={<UserAuth />} />
            <Route path="/agent-login" element={<AgentAuth />} />
            <Route path="/admin-login" element={<AdminAuth />} />
            <Route path="/hospital-login" element={<HospitalAuth />} />
            
            {/* User App Routes */}
            <Route path="/user-home" element={<HomePage onStart={() => navigate('/scan')} />} />
            <Route path="/scan" element={<ScanPage onSchedulePickup={handleSchedulePickup} />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/user/rewards" element={<RewardsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            
            {/* Agent App Routes */}
            <Route path="/agent" element={<AgentLayout />}>
              <Route index element={<AgentDashboard />} />
              <Route path="dashboard" element={<AgentDashboard />} />
              <Route path="profile" element={<AgentProfile />} />
              <Route path="earnings" element={<EarningsPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="history" element={<PickupHistoryPage />} />
            </Route>

            {/* Hospital App Routes */}
            <Route path="/hospital" element={<HospitalDashboard />} />
            <Route path="/hospital/profile" element={<HospitalProfile />} />
            <Route path="/hospital/schedule" element={<BulkPickupForm />} />
            <Route path="/hospital/compliance" element={<ComplianceCerts />} />
            <Route path="/hospital/inventory" element={<HospitalInventory />} />
            <Route path="/hospital/analytics" element={<HospitalAnalytics />} />
            <Route path="/hospital/rewards" element={<HospitalRewards />} />
            <Route path="/hospital/oxygen" element={<HospitalOxygen />} />
            <Route path="/hospital/cash" element={<HospitalCash />} />

            {/* Admin App Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="routes" element={<RouteOptimization />} />
              <Route path="live-location" element={<LiveLocation />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="hospitals" element={<AdminHospitals />} />
              <Route path="fleet" element={<AdminFleet />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      {/* Persistent Accessibility Button */}
      {!isAdminPortal && !isHospitalPortal && <FloatingHelpline />}

      {/* AI Voice Agent - Available Globally */}
      <VoiceAgent />
      
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Schedule Modal Overlay */}
      {showScheduleModal && pendingAnalysis && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-teal-600 px-6 py-4 text-white flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <h2 className="text-lg font-bold">Confirm Pickup</h2>
            </div>
            
            <form onSubmit={confirmSchedule} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Item</label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-900 font-medium">
                  {pendingAnalysis.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Address</label>
                <input 
                  type="text" 
                  defaultValue="123 Tech Park, Innovation Way"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg font-medium bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
