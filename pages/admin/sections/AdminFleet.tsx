
import React, { useState } from 'react';
import { Truck, Battery, Signal, FileSpreadsheet, Sparkles, Map, Leaf, ChevronRight, CheckCircle, Zap } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';
import { generateAdminRoutes, RouteBatch } from '../../../utils/routeOptimizerSimulation';

interface AgentCardProps {
  id: string;
  name: string;
  status: 'Online' | 'Busy' | 'Offline';
  battery: number;
  load: number; // in kg
  maxLoad: number; // in kg
}

const AgentCard: React.FC<AgentCardProps> = ({ id, name, status, battery, load, maxLoad }) => {
  const isOnline = status === 'Online';
  const isBusy = status === 'Busy';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Status Stripe */}
      <div className={`absolute top-0 left-0 w-1 h-full ${
        isOnline ? 'bg-green-500' : isBusy ? 'bg-orange-500' : 'bg-slate-400'
      }`}></div>

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
             <Truck className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{name}</h3>
            <p className="text-xs text-slate-400 font-mono">{id}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
           isOnline ? 'bg-green-50 text-green-600' : isBusy ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-500'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-3">
        {/* Battery / Fuel */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500 flex items-center gap-1"><Battery className="w-3 h-3" /> Battery Level</span>
            <span className="font-bold text-slate-700">{battery}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${battery > 20 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${battery}%` }}></div>
          </div>
        </div>

        {/* Load Capacity */}
        <div>
           <div className="flex justify-between text-xs mb-1">
             <span className="text-slate-500">Current Load</span>
             <span className="font-bold text-slate-700">{load}kg <span className="text-slate-400 font-normal">/ {maxLoad}kg</span></span>
           </div>
           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(load/maxLoad)*100}%` }}></div>
           </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex gap-2">
        <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
           <Signal className="w-3 h-3" /> Ping
        </button>
        <button className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors">
           Route
        </button>
      </div>
    </div>
  );
};

export const AdminFleet: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedBatches, setOptimizedBatches] = useState<RouteBatch[]>([]);

  const agents = [
    { id: 'AG-101', name: 'Rahul Sharma', status: 'Online', battery: 85, load: 4.2, maxLoad: 15 },
    { id: 'AG-204', name: 'Vikram Singh', status: 'Busy', battery: 62, load: 12.5, maxLoad: 15 },
    { id: 'AG-305', name: 'Amit Verma', status: 'Offline', battery: 0, load: 0, maxLoad: 15 },
    { id: 'AG-112', name: 'Sneha Reddy', status: 'Online', battery: 92, load: 2.1, maxLoad: 15 },
    { id: 'AG-404', name: 'Rajesh Kumar', status: 'Busy', battery: 45, load: 8.0, maxLoad: 15 },
    { id: 'AG-501', name: 'Priya Malik', status: 'Online', battery: 78, load: 1.5, maxLoad: 15 },
  ] as const;

  const handleExport = () => {
    const exportData = agents.map(agent => ({
        "Agent ID": agent.id,
        "Name": agent.name,
        "Status": agent.status,
        "Battery Level": `${agent.battery}%`,
        "Current Load": `${agent.load} kg`,
        "Max Load": `${agent.maxLoad} kg`
    }));
    exportToExcel(exportData, 'Planet_Prescription_Fleet');
  };

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    // Simulate API delay
    setTimeout(async () => {
      const results = await generateAdminRoutes();
      setOptimizedBatches(results);
      setIsOptimizing(false);
    }, 2000);
  };

  const handleDispatch = (batchId: string) => {
    alert(`Batch ${batchId} dispatched successfully! Agent notified.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Agent Fleet Monitoring</h2>
            <p className="text-slate-500">Live status of logistics workforce.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-bold shadow-sm transition-colors"
             >
                <FileSpreadsheet className="w-4 h-4" /> Export
             </button>
          </div>
       </div>

       {/* Trigger AI Section */}
       <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Sparkles className="w-6 h-6" />
             </div>
             <div>
                <h3 className="font-bold text-lg text-slate-900">AI Route Optimization</h3>
                <p className="text-sm text-slate-500">Analyze pickup clusters and assign agents efficiently.</p>
             </div>
          </div>
          <button 
            onClick={handleRunOptimization}
            disabled={isOptimizing}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-purple-900/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isOptimizing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-current" />
                Run AI Route Optimizer
              </>
            )}
          </button>
       </div>

       {/* Results Section */}
       {optimizedBatches.length > 0 && (
         <div className="animate-in slide-in-from-bottom-8 duration-500">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
               <Map className="w-5 h-5 text-teal-600" /> Optimized Dispatch Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {optimizedBatches.map((batch) => (
                 <div key={batch.batchId} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                    {/* Card Header */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                       <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Batch ID</span>
                          <span className="font-bold text-slate-900 text-lg block">{batch.batchId}</span>
                       </div>
                       <div className="text-right">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Agent</span>
                          <span className="font-medium text-slate-700 text-sm block">{batch.agentName}</span>
                       </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Pickup Sequence ({batch.stops.length})
                       </p>
                       <ul className="space-y-2 mb-4">
                          {batch.stops.map((stop, idx) => (
                             <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                   {idx + 1}
                                </span>
                                {stop}
                             </li>
                          ))}
                       </ul>
                       <div className="flex gap-2">
                          <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border ${
                             batch.riskCategory === 'High Risk' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                             {batch.riskCategory}
                          </span>
                          <span className="text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                             {batch.totalDistance}
                          </span>
                       </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-slate-500">Efficiency</span>
                          <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                             <Leaf className="w-3 h-3" /> {batch.efficiencyScore}
                          </span>
                       </div>
                       <button 
                          onClick={() => handleDispatch(batch.batchId)}
                          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                       >
                          Dispatch Now <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
       )}

       {/* Existing Agent Grid */}
       <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Live Fleet Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map(agent => (
                <AgentCard key={agent.id} {...agent} />
              ))}
          </div>
       </div>
    </div>
  );
};
