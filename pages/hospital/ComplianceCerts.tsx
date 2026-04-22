
import React, { useState } from 'react';
import { FileCheck, Download, CheckCircle, Clock, Search } from 'lucide-react';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';

export const ComplianceCerts: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const reports = [
    { id: 'EPA-JAN-24', month: 'January 2024', status: 'Compliant', weight: '780 kg', date: 'Feb 2, 2024' },
    { id: 'EPA-DEC-23', month: 'December 2023', status: 'Compliant', weight: '850 kg', date: 'Jan 5, 2024' },
    { id: 'EPA-NOV-23', month: 'November 2023', status: 'Review Needed', weight: '920 kg', date: 'Dec 4, 2023' },
    { id: 'EPA-OCT-23', month: 'October 2023', status: 'Compliant', weight: '760 kg', date: 'Nov 3, 2023' },
  ];

  const handleDownload = (id: string) => {
    setDownloading(id);
    
    setTimeout(() => {
      const content = `
PLANET PRESCRIPTION - EPA COMPLIANCE CERTIFICATE
------------------------------------------------
Report ID: ${id}
Facility: Apollo Clinic Mumbai (LIC-APOLLO-MUM-01)
Status: FULLY COMPLIANT

Waste Summary:
- Cytotoxic: 120kg
- Sharps: 45kg
- General Pharma: 615kg

Total Processed: 780kg
Disposal Method: High-Temperature Incineration (Authorized)

Certified by: Planet Prescription Regulatory Board
Date Generated: ${new Date().toLocaleDateString()}
      `;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const element = document.createElement("a");
      element.href = url;
      element.download = "EPA_Report_Jan.txt"; // Hardcoded specific name as requested
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(url);
      
      setDownloading(null);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <HospitalSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
           <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-cyan-600" /> Compliance Certificates
           </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Search Bar */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                       type="text" 
                       placeholder="Search Report ID or Month..." 
                       className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                 </div>
                 <button className="text-sm font-bold text-cyan-700 hover:underline">
                    View Audit Logs
                 </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                       <tr>
                          <th className="px-6 py-4">Report ID</th>
                          <th className="px-6 py-4">Month</th>
                          <th className="px-6 py-4">Disposal Weight</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Generated On</th>
                          <th className="px-6 py-4 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {reports.map((report) => (
                          <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                             <td className="px-6 py-4 font-mono font-bold text-slate-700">{report.id}</td>
                             <td className="px-6 py-4 font-bold">{report.month}</td>
                             <td className="px-6 py-4">{report.weight}</td>
                             <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                   report.status === 'Compliant' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                                }`}>
                                   {report.status === 'Compliant' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                   {report.status}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-slate-500">{report.date}</td>
                             <td className="px-6 py-4 text-right">
                                <button 
                                   onClick={() => handleDownload(report.id)}
                                   disabled={downloading === report.id}
                                   className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                   {downloading === report.id ? (
                                      <>
                                         <div className="w-3 h-3 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                                         Generating...
                                      </>
                                   ) : (
                                      <>
                                         <Download className="w-3 h-3" /> Download
                                      </>
                                   )}
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
};
