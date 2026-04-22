
import React from 'react';
import { Building2, TrendingUp, AlertCircle, CheckCircle, MoreVertical } from 'lucide-react';

interface HospitalRowProps {
  name: string;
  id: string;
  waste: string;
  status: 'Compliant' | 'Audit Needed';
  location: string;
}

const HospitalRow: React.FC<HospitalRowProps> = ({ name, id, waste, status, location }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700">
           <Building2 className="w-5 h-5" />
        </div>
        <div>
           <p className="font-bold text-slate-900">{name}</p>
           <p className="text-xs text-slate-500 font-mono">{id}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-slate-600">{location}</td>
    <td className="px-6 py-4 font-bold text-slate-900">{waste}</td>
    <td className="px-6 py-4">
       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
          status === 'Compliant' 
          ? 'bg-green-50 text-green-700 border-green-200' 
          : 'bg-red-50 text-red-700 border-red-200'
       }`}>
          {status === 'Compliant' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          {status}
       </span>
    </td>
    <td className="px-6 py-4 text-right">
       <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
    </td>
  </tr>
);

export const AdminHospitals: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-end">
          <div>
             <h2 className="text-2xl font-bold text-slate-900">Hospital Partners</h2>
             <p className="text-slate-500">Manage clinical waste sources and compliance.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
             <span className="text-xs font-bold text-slate-500 uppercase">Total Waste (Month)</span>
             <span className="font-bold text-cyan-700 text-lg">24.5 Tons</span>
             <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                <tr>
                   <th className="px-6 py-4">Facility Name</th>
                   <th className="px-6 py-4">Location</th>
                   <th className="px-6 py-4">Waste Generated</th>
                   <th className="px-6 py-4">Compliance Status</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                <HospitalRow 
                   name="Apollo Clinic" id="LIC-APOLLO-MUM-01" location="Andheri East, Mumbai" 
                   waste="845 kg" status="Compliant" 
                />
                <HospitalRow 
                   name="Fortis Hospital" id="LIC-FORTIS-DEL-99" location="Vasant Kunj, Delhi" 
                   waste="1,200 kg" status="Compliant" 
                />
                <HospitalRow 
                   name="City Care Centre" id="LIC-CITY-PUN-22" location="Kothrud, Pune" 
                   waste="320 kg" status="Audit Needed" 
                />
                <HospitalRow 
                   name="Max Healthcare" id="LIC-MAX-BLR-45" location="Whitefield, Bangalore" 
                   waste="950 kg" status="Compliant" 
                />
             </tbody>
          </table>
       </div>
    </div>
  );
};
