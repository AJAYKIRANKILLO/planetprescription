
import React, { useState } from 'react';
import { Camera, PackagePlus, Barcode, Save, Trash2, Box } from 'lucide-react';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';
import { VoiceInput } from '../../components/common/VoiceInput';

export const HospitalInventory: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    batchNo: '',
    qty: '',
    expiry: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    setInventory(prev => [{ ...formData, id: Date.now() }, ...prev]);
    setFormData({ name: '', batchNo: '', qty: '', expiry: '' });
  };

  const removeItem = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <HospitalSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
           <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <PackagePlus className="w-6 h-6 text-cyan-600" /> Log Expired Stock
           </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Scanner / Form */}
              <div className="lg:col-span-1 space-y-6">
                 <div className="bg-slate-900 rounded-2xl p-6 text-center text-white shadow-lg">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
                       <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Scan Barcode</h3>
                    <p className="text-slate-400 text-sm mb-6">Point camera at bulk packaging</p>
                    <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors">
                       Activate Camera
                    </button>
                 </div>

                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Manual Batch Entry</h3>
                    <form onSubmit={handleAdd} className="space-y-4">
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase">Medicine Name</label>
                          <VoiceInput 
                             value={formData.name}
                             onChange={e => setFormData({...formData, name: e.target.value})}
                             placeholder="e.g. Metformin 500mg"
                             className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-cyan-500 text-sm mt-1"
                          />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase">Batch Number</label>
                          <div className="relative">
                             <Barcode className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input 
                                value={formData.batchNo}
                                onChange={e => setFormData({...formData, batchNo: e.target.value})}
                                placeholder="BATCH-2024-X"
                                className="w-full pl-8 p-2 border border-slate-200 rounded-lg outline-none focus:border-cyan-500 text-sm mt-1 font-mono"
                             />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="text-xs font-bold text-slate-500 uppercase">Quantity (kg)</label>
                             <div className="relative">
                                <Box className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                <input 
                                    type="number"
                                    value={formData.qty}
                                    onChange={e => setFormData({...formData, qty: e.target.value})}
                                    placeholder="5.0"
                                    className="w-full pl-7 p-2 border border-slate-200 rounded-lg outline-none focus:border-cyan-500 text-sm mt-1"
                                />
                             </div>
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-500 uppercase">Expiry</label>
                             <input 
                                type="date"
                                value={formData.expiry}
                                onChange={e => setFormData({...formData, expiry: e.target.value})}
                                className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-cyan-500 text-sm mt-1"
                             />
                          </div>
                       </div>
                       <button type="submit" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                          <Save className="w-4 h-4" /> Log to Inventory
                       </button>
                    </form>
                 </div>
              </div>

              {/* Scanned List */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                 <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Scanned Batches ({inventory.length})</h3>
                    <button className="text-xs text-red-500 font-bold hover:underline">Clear List</button>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4">
                    {inventory.length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center text-slate-400">
                          <PackagePlus className="w-16 h-16 mb-4 opacity-50" />
                          <p>No batches scanned yet.</p>
                       </div>
                    ) : (
                       <table className="w-full text-left text-sm">
                          <thead className="text-xs font-bold text-slate-500 uppercase bg-white sticky top-0">
                             <tr className="border-b border-slate-100">
                                <th className="pb-3">Batch ID</th>
                                <th className="pb-3">Name</th>
                                <th className="pb-3">Weight</th>
                                <th className="pb-3">Expiry</th>
                                <th className="pb-3 text-right">Action</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {inventory.map((item) => (
                                <tr key={item.id}>
                                   <td className="py-3 font-mono text-slate-600">{item.batchNo || 'N/A'}</td>
                                   <td className="py-3 font-bold text-slate-900">{item.name}</td>
                                   <td className="py-3">{item.qty} kg</td>
                                   <td className="py-3 text-red-500 font-medium">{item.expiry}</td>
                                   <td className="py-3 text-right">
                                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500">
                                         <Trash2 className="w-4 h-4" />
                                      </button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    )}
                 </div>

                 {inventory.length > 0 && (
                    <div className="p-4 border-t border-slate-100 bg-slate-50">
                       <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-colors">
                          Finalize Batch & Schedule Pickup
                       </button>
                    </div>
                 )}
              </div>

           </div>
        </div>
      </main>
    </div>
  );
};
