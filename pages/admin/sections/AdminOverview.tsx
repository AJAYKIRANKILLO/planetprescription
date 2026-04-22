
import React from 'react';
import { 
  Users, Truck, Package, Scale, Map, 
  AlertTriangle, Bell, Search, Activity,
  ShieldAlert, MoreVertical, Star
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Users" 
            value="12,450" 
            trend="+125 this week" 
            icon={Users} 
            color="text-blue-600" 
            bg="bg-blue-50" 
          />
          <StatCard 
            label="Active Agents" 
            value="45 Online" 
            subValue="/ 62 Total"
            icon={Truck} 
            color="text-indigo-600" 
            bg="bg-indigo-50" 
          />
          <StatCard 
            label="Pending Pickups" 
            value="128" 
            trend="High demand in Sector 4"
            icon={Package} 
            color="text-orange-600" 
            bg="bg-orange-50" 
            alert
          />
          <StatCard 
            label="Waste Processed" 
            value="14.2 Tons" 
            trend="Lifetime Total" 
            icon={Scale} 
            color="text-emerald-600" 
            bg="bg-emerald-50" 
          />
      </div>

      {/* 2. LIVE OPERATIONS MAP */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Map className="w-5 h-5 text-blue-600" /> Live Fleet Tracking
                </h3>
                <p className="text-sm text-slate-500">Real-time monitoring of Mumbai Sector 4</p>
            </div>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                Expand View
            </button>
          </div>
          <div className="h-[400px] bg-slate-100 relative group overflow-hidden">
            {/* Placeholder Map Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
                backgroundSize: '20px 20px' 
            }}></div>
            
            {/* Mock Map Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300">
                <Map className="w-32 h-32 opacity-20 mx-auto mb-4" />
                <p className="text-center font-bold tracking-widest uppercase">Live Map Feed Placeholder</p>
            </div>

            {/* Simulated Agent Dots */}
            <div className="absolute top-1/4 left-1/4">
                <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg animate-pulse"></div>
                <div className="absolute top-6 left-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">Ag-101 (Moving)</div>
            </div>
            <div className="absolute bottom-1/3 right-1/3">
                <div className="w-4 h-4 bg-orange-500 border-2 border-white rounded-full shadow-lg"></div>
                <div className="absolute top-6 left-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">Ag-204 (Pickup)</div>
            </div>
          </div>
      </div>

      {/* 3. SPLIT DATA VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: User Growth */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" /> Monthly Growth
                </h3>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg px-2 py-1 outline-none">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
            </div>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
                <Bar height="30%" label="Jan" />
                <Bar height="45%" label="Feb" />
                <Bar height="40%" label="Mar" />
                <Bar height="60%" label="Apr" />
                <Bar height="75%" label="May" />
                <Bar height="100%" label="Jun" active />
            </div>
          </div>

          {/* Right: Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" /> System Alerts
                </h3>
                <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-md">3 New</span>
            </div>
            <div className="space-y-4">
                <AlertItem 
                  type="critical" 
                  message="High Risk Waste Detected in Sector 9" 
                  time="10 mins ago" 
                />
                <AlertItem 
                  type="warning" 
                  message="Agent AG-2024 disconnected abruptly" 
                  time="25 mins ago" 
                />
                <AlertItem 
                  type="info" 
                  message="Server load peak at 85%" 
                  time="1 hour ago" 
                />
            </div>
          </div>
      </div>

      {/* 4. FLEET PERFORMANCE TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-500" /> Fleet Performance
            </h3>
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search agents..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                  <tr>
                      <th className="px-6 py-4">Agent Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Today's Collections</th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <FleetRow 
                      name="Rahul Sharma" 
                      id="AG-101" 
                      status="On Duty" 
                      statusColor="green" 
                      collection="12 kg" 
                      rating="4.9" 
                  />
                  <FleetRow 
                      name="Vikram Singh" 
                      id="AG-204" 
                      status="Busy" 
                      statusColor="orange" 
                      collection="8.5 kg" 
                      rating="4.8" 
                  />
                  <FleetRow 
                      name="Amit Verma" 
                      id="AG-305" 
                      status="Offline" 
                      statusColor="slate" 
                      collection="0 kg" 
                      rating="4.7" 
                  />
                  <FleetRow 
                      name="Sneha Reddy" 
                      id="AG-112" 
                      status="On Duty" 
                      statusColor="green" 
                      collection="15.2 kg" 
                      rating="5.0" 
                  />
                </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All Agents</button>
          </div>
      </div>
    </div>
  );
};

// --- Helper Components (Copied from AdminDashboard to keep Overview independent) ---

const StatCard = ({ label, value, subValue, trend, icon: Icon, color, bg, alert }: any) => (
  <div className={`bg-white p-5 rounded-xl shadow-sm border ${alert ? 'border-orange-200' : 'border-slate-200'} hover:shadow-md transition-shadow`}>
     <div className="flex justify-between items-start mb-4">
        <div>
           <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
           <div className="flex items-baseline gap-2 mt-1">
              <h3 className={`text-2xl font-bold text-slate-900`}>{value}</h3>
              {subValue && <span className="text-sm text-slate-400 font-medium">{subValue}</span>}
           </div>
        </div>
        <div className={`p-3 rounded-xl ${bg}`}>
           <Icon className={`w-5 h-5 ${color}`} />
        </div>
     </div>
     {trend && (
        <p className={`text-xs font-bold flex items-center gap-1 ${alert ? 'text-orange-600' : 'text-slate-400'}`}>
           {alert && <AlertTriangle className="w-3 h-3" />}
           {trend}
        </p>
     )}
  </div>
);

const Bar = ({ height, label, active }: { height: string, label: string, active?: boolean }) => (
  <div className="flex flex-col items-center gap-2 w-full">
     <div className="w-full bg-slate-100 rounded-t-lg relative h-32 flex items-end overflow-hidden group">
        <div 
           className={`w-full rounded-t-lg transition-all duration-500 ${active ? 'bg-blue-600' : 'bg-blue-200 group-hover:bg-blue-300'}`} 
           style={{ height }}
        ></div>
     </div>
     <span className={`text-xs font-bold ${active ? 'text-blue-600' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const AlertItem = ({ type, message, time }: { type: 'critical' | 'warning' | 'info', message: string, time: string }) => {
   const styles = {
      critical: 'bg-red-50 text-red-700 border-red-100',
      warning: 'bg-orange-50 text-orange-700 border-orange-100',
      info: 'bg-blue-50 text-blue-700 border-blue-100'
   };
   const icons = {
      critical: ShieldAlert,
      warning: AlertTriangle,
      info: Bell
   };
   const Icon = icons[type];

   return (
      <div className={`p-4 rounded-lg border flex items-start gap-3 ${styles[type]}`}>
         <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
         <div>
            <p className="text-sm font-bold">{message}</p>
            <p className="text-xs opacity-80 mt-1">{time}</p>
         </div>
      </div>
   );
};

const FleetRow = ({ name, id, status, statusColor, collection, rating }: any) => {
   const colors: any = {
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      slate: 'bg-slate-400'
   };

   return (
      <tr className="hover:bg-slate-50 transition-colors">
         <td className="px-6 py-4">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                  {name.charAt(0)}
               </div>
               <div>
                  <p className="font-bold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400 font-mono">{id}</p>
               </div>
            </div>
         </td>
         <td className="px-6 py-4">
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${colors[statusColor]}`}></div>
               <span className="font-medium">{status}</span>
            </div>
         </td>
         <td className="px-6 py-4 font-bold text-slate-700">{collection}</td>
         <td className="px-6 py-4">
            <div className="flex items-center gap-1">
               <Star className="w-4 h-4 text-amber-400 fill-current" />
               <span className="font-bold text-slate-900">{rating}</span>
            </div>
         </td>
         <td className="px-6 py-4 text-right">
            <button className="text-slate-400 hover:text-slate-600">
               <MoreVertical className="w-4 h-4" />
            </button>
         </td>
      </tr>
   );
};
