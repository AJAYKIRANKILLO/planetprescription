
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Truck, ChevronRight, CheckCircle, Clock, XCircle, Sparkles
} from 'lucide-react';
import { AgentStatusToggle } from '../../components/common/AgentStatusToggle';
import { QuickActionBar } from '../../components/agent/QuickActionBar';
import { AgentLiveMap } from '../../components/agent/AgentLiveMap';
import { DeliveryStopCard } from '../../components/agent/DeliveryStopCard';
import { RouteProgressBar } from '../../components/agent/RouteProgressBar';
import { EarningsBreakdown } from '../../components/agent/EarningsBreakdown';
import { SmartAiSuggestion } from '../../components/agent/SmartAiSuggestion';
import { ConnectivityBadge } from '../../components/agent/ConnectivityBadge';
import { CameraScannerModal } from '../../components/agent/CameraScannerModal';
import { NoteEntryModal } from '../../components/agent/NoteEntryModal';
import { getAgentProfile } from '../../utils/storage';
import { reorderAgentRoute } from '../../utils/routeOptimizerSimulation';

interface AgentProfile {
  name: string;
  photo?: string;
  id?: string;
}

export const AgentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AgentProfile>({ name: 'Rahul Sharma', id: 'AG-8821' });
  const [isOnline, setIsOnline] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routePolyline, setRoutePolyline] = useState<string | null>(null);
  
  // Modal States
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  useEffect(() => {
    const stored = getAgentProfile();
    if (stored) {
      setProfile(stored);
    }
  }, []);

  const handleScanCapture = (image: string) => {
    console.log("Captured image for processing", selectedStopId ? `for Stop ${selectedStopId}` : 'Generic Scan');
    setIsScannerOpen(false);
    setSelectedStopId(null);
  };

  const handleSaveNote = (note: string) => {
    console.log(`Note saved for stop ${selectedStopId}:`, note);
    setIsNoteModalOpen(false);
    setSelectedStopId(null);
    alert("Note saved successfully!");
  };

  // State for Stops - Added Lat/Lng for simulation
  const [activeStops, setActiveStops] = useState([
    { id: '101', name: 'Varsha Patel', phoneNumber: '+919876543210', address: '12, Omni Towers, Sector 4', timeSlot: '09:00 - 09:30', riskLevel: 'Low' as const, distance: '2.1 km', lat: 19.1136, lng: 72.8697 },
    { id: '102', name: 'Jagdish Pillai', phoneNumber: '+919876543211', address: '45/B, Green Heights, Main Rd', timeSlot: '09:45 - 10:15', riskLevel: 'High' as const, distance: '3.4 km', lat: 19.0596, lng: 72.8295 },
    { id: '103', name: 'Ashish Verma', phoneNumber: '+919876543212', address: 'Shop 4, City Center Mall', timeSlot: '10:30 - 11:00', riskLevel: 'Low' as const, distance: '5.2 km', lat: 19.1150, lng: 72.8690 },
    { id: '104', name: 'Meera Deshmukh', phoneNumber: '+919876543213', address: 'B-202, Sunshine Apts', timeSlot: '11:15 - 11:45', riskLevel: 'Low' as const, distance: '6.8 km', lat: 19.0600, lng: 72.8300 },
    { id: '105', name: 'Kunal Shah', phoneNumber: '+919876543214', address: 'Plot 88, Ind. Estate', timeSlot: '12:00 - 12:30', riskLevel: 'High' as const, distance: '8.1 km', lat: 19.1140, lng: 72.8700 },
  ]);

  const [stats, setStats] = useState({ completed: 0, rescheduled: 0, skipped: 0 });

  // Optimization Handler
  const handleOptimizeRoute = async () => {
    if (activeStops.length < 2) return;
    setIsOptimizing(true);
    
    try {
      const { stops: optimizedStops, polyline } = await reorderAgentRoute(activeStops);
      setActiveStops(optimizedStops);
      setRoutePolyline(polyline);
      alert('✨ Route Optimized! AI has reordered stops to save approx 1.2km.');
    } catch (error) {
      console.error(error);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Stop Action Handlers
  const handleComplete = (id: string) => {
    setActiveStops(prev => prev.filter(s => s.id !== id));
    setStats(prev => ({ ...prev, completed: prev.completed + 1 }));
  };

  const handleReschedule = (id: string) => {
    if (window.confirm('Confirm Reschedule for later?')) {
        setActiveStops(prev => prev.filter(s => s.id !== id));
        setStats(prev => ({ ...prev, rescheduled: prev.rescheduled + 1 }));
    }
  };

  const handleSkip = (id: string) => {
    if (window.confirm('Mark this stop as Failed/Skipped?')) {
        setActiveStops(prev => prev.filter(s => s.id !== id));
        setStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    }
  };

  // Interaction Handlers
  const handleCall = (phoneNumber?: string) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("No phone number available for this contact.");
    }
  };

  const handlePhoto = (id: string) => {
    setSelectedStopId(id);
    setIsScannerOpen(true);
  };

  const handleNote = (id: string) => {
    setSelectedStopId(id);
    setIsNoteModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Modals */}
      <CameraScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => { setIsScannerOpen(false); setSelectedStopId(null); }}
        onCapture={handleScanCapture}
      />
      
      <NoteEntryModal
        isOpen={isNoteModalOpen}
        onClose={() => { setIsNoteModalOpen(false); setSelectedStopId(null); }}
        onSave={handleSaveNote}
        customerName={activeStops.find(s => s.id === selectedStopId)?.name}
      />

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* A. Fixed Top Header */}
      <header className="h-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 z-30 flex-shrink-0">
        <div>
            <h1 className="text-2xl font-bold text-white">
              Good Morning, <span className="text-orange-500">{profile.name.split(' ')[0]}</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-xs text-slate-400 font-medium">System Operational</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <ConnectivityBadge isOnline={isOnline} />
            <AgentStatusToggle onToggle={setIsOnline} initialStatus={isOnline} />
            
            <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>
            
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
        </div>
      </header>

      {/* B. Scrollable Canvas */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">

            {/* Row 1: Top Control Bar */}
            <div className="grid grid-cols-12 gap-6 h-auto lg:h-24">
              <div className="col-span-12 lg:col-span-8">
                  <QuickActionBar onScan={() => { setSelectedStopId(null); setIsScannerOpen(true); }} />
              </div>
              <div className="col-span-12 lg:col-span-4 flex items-center">
                  <div className="w-full">
                    <RouteProgressBar completed={stats.completed} total={activeStops.length + stats.completed + stats.skipped + stats.rescheduled} />
                  </div>
              </div>
            </div>

            {/* Row 2: Main Grid */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* LEFT COLUMN (Map & AI) */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  
                  {/* 1. Map Container - Enforce Height */}
                  <div className="relative group w-full h-[450px]">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
                    <div className="relative bg-slate-900 rounded-2xl p-1 h-full shadow-2xl overflow-hidden z-0">
                        <AgentLiveMap isExpanded={true} stops={activeStops} polyline={routePolyline} />
                        
                        {/* Optimize Path Button Overlay */}
                        <div className="absolute top-4 left-4 z-20">
                          <button 
                            onClick={handleOptimizeRoute}
                            disabled={isOptimizing || activeStops.length < 2}
                            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-indigo-700 font-bold rounded-lg shadow-lg backdrop-blur-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isOptimizing ? (
                              <>
                                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                Calculating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" /> Optimize Path
                              </>
                            )}
                          </button>
                        </div>
                    </div>
                  </div>

                  {/* 2. AI Suggestion - Below the map */}
                  <div className="relative z-10">
                    <SmartAiSuggestion />
                  </div>
              </div>

              {/* RIGHT COLUMN (Stats & Stops) */}
              <div className="col-span-12 lg:col-span-4 space-y-6 h-full flex flex-col">
                  
                  {/* Route Performance Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-3 opacity-60 flex items-center gap-2">
                        <Truck className="w-3 h-3" /> Route Performance
                    </h3>
                    <div className="flex justify-between items-center text-center">
                        <div className="flex-1 border-r border-slate-800">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                            <div className="text-xl font-bold text-white">{stats.completed}</div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold">Completed</div>
                        </div>
                        <div 
                          className="flex-1 border-r border-slate-800 cursor-pointer hover:bg-slate-800/50 rounded-lg py-1 transition-colors group"
                          onClick={() => alert(`Rescheduled ${stats.rescheduled} stops.`)}
                        >
                            <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                            <div className="text-xl font-bold text-white">{stats.rescheduled}</div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold">Rescheduled</div>
                        </div>
                        <div 
                          className="flex-1 cursor-pointer hover:bg-slate-800/50 rounded-lg py-1 transition-colors group"
                          onClick={() => alert(`Skipped ${stats.skipped} stops.`)}
                        >
                            <XCircle className="w-5 h-5 text-red-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                            <div className="text-xl font-bold text-white">{stats.skipped}</div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold">Missed</div>
                        </div>
                    </div>
                  </div>

                  <EarningsBreakdown />
                  
                  {/* Upcoming Stops List Panel */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col flex-1 overflow-hidden shadow-xl max-h-[600px]">
                    <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center sticky top-0 z-10">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          <Truck className="w-4 h-4 text-orange-500" />
                          Stops Queue
                        </h3>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
                          {activeStops.length} Remaining
                        </span>
                    </div>
                    
                    <div className="overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {activeStops.length === 0 ? (
                            <div className="text-center py-10 text-slate-500">
                                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500/20" />
                                <p className="font-bold">All Stops Completed!</p>
                                <p className="text-xs">Great job today.</p>
                            </div>
                        ) : (
                            activeStops.map((stop, idx) => (
                              <div key={stop.id} className="animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                                  <DeliveryStopCard 
                                    stop={stop} 
                                    onComplete={() => handleComplete(stop.id)}
                                    onReschedule={() => handleReschedule(stop.id)}
                                    onSkip={() => handleSkip(stop.id)}
                                    onCall={() => handleCall(stop.phoneNumber)}
                                    onPhoto={() => handlePhoto(stop.id)}
                                    onNote={() => handleNote(stop.id)}
                                  />
                              </div>
                            ))
                        )}
                        
                        {activeStops.length > 0 && (
                            <button className="w-full py-4 text-sm text-slate-500 hover:text-orange-500 font-bold flex items-center justify-center gap-2 border-t border-slate-800 border-dashed mt-2">
                              View Complete Route <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
