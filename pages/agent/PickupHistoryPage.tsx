
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, MapPin, Package, CheckCircle, Image as ImageIcon } from 'lucide-react';

export const PickupHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const history = [
    { 
        id: 'JOB-105', 
        name: 'Amit Verma', 
        address: 'B-201, Sunshine Heights', 
        items: ['Expired Insulin', 'Antibiotics Strip'],
        status: 'Deposited',
        date: 'Today, 10:15 AM'
    },
    { 
        id: 'JOB-104', 
        name: 'Sneha Reddy', 
        address: '12/4, MG Road, Indiranagar', 
        items: ['Cough Syrup (Glass)', 'Vitamin Tablets'],
        status: 'Completed',
        date: 'Today, 09:30 AM'
    },
    { 
        id: 'JOB-098', 
        name: 'Rajesh Kumar', 
        address: 'Plot 45, Industrial Area', 
        items: ['Industrial Solvent', 'Mixed Pharma Waste'],
        status: 'Deposited',
        date: 'Yesterday'
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/agent')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
           <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>

        <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <History className="w-8 h-8 text-orange-500" /> Job History
             </h1>
             <div className="text-sm text-slate-400">
                Total Jobs: <span className="font-bold text-white">45</span>
             </div>
        </div>

        <div className="space-y-4">
            {history.map((job) => (
                <div key={job.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        
                        {/* Left: Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-white">{job.name}</h3>
                                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">#{job.id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4 text-slate-500" /> {job.address}
                            </div>
                            <div className="flex items-start gap-2 text-slate-400 text-sm">
                                <Package className="w-4 h-4 text-slate-500 mt-0.5" /> 
                                <span>{job.items.join(', ')}</span>
                            </div>
                        </div>

                        {/* Right: Status & Proof */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                job.status === 'Deposited' 
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                                {job.status === 'Deposited' ? (
                                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Deposited at HQ</span>
                                ) : (
                                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Collected</span>
                                )}
                            </span>
                            
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{job.date}</span>
                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700" title="View Proof">
                                    <ImageIcon className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
