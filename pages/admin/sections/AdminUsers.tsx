
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ShieldAlert, CheckCircle, MapPin, FileSpreadsheet } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';

interface UserData {
  id: string;
  name: string;
  wasteType: string;
  location: string;
  agent: string;
  riskLevel: 'High' | 'Medium' | 'Low';
}

const DUMMY_USERS: UserData[] = [
  { id: '1', name: 'Varsha Patel', wasteType: 'Expired Insulin', location: 'Mumbai, Sector 4', agent: 'Rahul Sharma', riskLevel: 'Low' },
  { id: '2', name: 'Jagdish Pillai', wasteType: 'Antibiotics Strip', location: 'Mumbai, Sector 4', agent: 'Rahul Sharma', riskLevel: 'High' },
  { id: '3', name: 'Meera Deshmukh', wasteType: 'Painkillers (Opioid)', location: 'Mumbai, Sector 5', agent: 'Unassigned', riskLevel: 'High' },
  { id: '4', name: 'Kunal Shah', wasteType: 'Vitamin Supplements', location: 'Mumbai, Sector 4', agent: 'Vikram Singh', riskLevel: 'Low' },
  { id: '5', name: 'Aarav Gupta', wasteType: 'Cough Syrup', location: 'Delhi, Karol Bagh', agent: 'Amit Verma', riskLevel: 'Medium' },
  { id: '6', name: 'Sana Khan', wasteType: 'Cytotoxic Waste', location: 'Mumbai, Sector 6', agent: 'Unassigned', riskLevel: 'High' },
];

export const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredUsers = DUMMY_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' 
      ? true 
      : filter === 'High Risk' ? user.riskLevel === 'High' 
      : user.location.includes(filter);
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    // Prepare clean data for export (remove UI specific fields if any)
    const exportData = filteredUsers.map(user => ({
      "User Name": user.name,
      "Waste Type": user.wasteType,
      "Location": user.location,
      "Assigned Agent": user.agent,
      "Risk Level": user.riskLevel,
      "System ID": user.id
    }));
    exportToExcel(exportData, 'Planet_Prescription_Users');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500">Database of registered households and waste requests.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <div className="relative">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <select 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
             >
               <option value="All">Filter by: All</option>
               <option value="High Risk">High Risk Only</option>
               <option value="Mumbai">Mumbai</option>
               <option value="Delhi">Delhi</option>
             </select>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Medicine Waste</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Assigned Agent</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{user.wasteType}</td>
                <td className="px-6 py-4 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user.location}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${user.agent === 'Unassigned' ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
                    {user.agent}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    user.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                    user.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {user.riskLevel === 'High' ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {user.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-slate-500">No users found matching your filters.</div>
        )}
      </div>
    </div>
  );
};
