
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, CheckCircle, Scale, Trash2, AlertTriangle } from 'lucide-react';
import { VoiceInput } from '../../components/common/VoiceInput';
import { VoiceTextarea } from '../../components/common/VoiceTextarea';

export const BulkPickupForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    wasteType: 'General Medical',
    weight: '',
    bins: '',
    date: '',
    time: '',
    instructions: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bulk Pickup Scheduled! Dispatch notified.");
    navigate('/hospital');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-3xl flex items-center gap-4 mb-8">
         <button onClick={() => navigate('/hospital')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
         </button>
         <h1 className="text-2xl font-bold text-slate-900">Schedule Bulk Pickup</h1>
      </div>

      {/* Stepper Visual */}
      <div className="w-full max-w-3xl mb-10">
         <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div className={`absolute top-1/2 left-0 h-1 bg-cyan-600 -z-10 rounded-full transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
            
            {[1, 2, 3].map((s) => (
               <div key={s} className={`flex flex-col items-center gap-2`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all ${
                     step >= s ? 'bg-cyan-600 border-cyan-100 text-white' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                     {s}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${step >= s ? 'text-cyan-700' : 'text-slate-400'}`}>
                     {s === 1 ? 'Details' : s === 2 ? 'Logistics' : 'Confirm'}
                  </span>
               </div>
            ))}
         </div>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
         <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Waste Details */}
            {step === 1 && (
               <div className="p-8 space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 flex items-start gap-3">
                     <AlertTriangle className="w-5 h-5 text-cyan-600 mt-0.5" />
                     <div>
                        <h4 className="font-bold text-cyan-800 text-sm">Correct Classification Required</h4>
                        <p className="text-xs text-cyan-700 mt-1">Misclassified hazardous waste can lead to EPA fines. Please verify contents.</p>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Waste Category</label>
                     <div className="grid grid-cols-2 gap-4">
                        {['General Medical', 'Sharps (Red Bin)', 'Cytotoxic', 'Pharma Expired'].map(type => (
                           <div 
                              key={type}
                              onClick={() => setFormData({...formData, wasteType: type})}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                                 formData.wasteType === type ? 'border-cyan-600 bg-cyan-50 text-cyan-800' : 'border-slate-100 hover:border-cyan-200'
                              }`}
                           >
                              <span className="font-bold text-sm">{type}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Est. Weight (Kg)</label>
                        <div className="relative">
                           <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <VoiceInput 
                              type="number"
                              value={formData.weight}
                              onChange={e => setFormData({...formData, weight: e.target.value})}
                              placeholder="e.g. 45"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Number of Bins</label>
                        <div className="relative">
                           <Trash2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <VoiceInput 
                              type="number"
                              value={formData.bins}
                              onChange={e => setFormData({...formData, bins: e.target.value})}
                              placeholder="e.g. 3"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* STEP 2: Logistics */}
            {step === 2 && (
               <div className="p-8 space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pickup Date</label>
                        <input 
                           type="date"
                           value={formData.date}
                           onChange={e => setFormData({...formData, date: e.target.value})}
                           className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Preferred Time</label>
                        <input 
                           type="time"
                           value={formData.time}
                           onChange={e => setFormData({...formData, time: e.target.value})}
                           className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Special Handling Instructions</label>
                     <VoiceTextarea 
                        rows={4}
                        placeholder="E.g. Enter via Rear Gate 3, Requires Security Clearance..."
                        value={formData.instructions}
                        onChange={e => setFormData({...formData, instructions: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                     />
                  </div>
               </div>
            )}

            {/* STEP 3: Confirm */}
            {step === 3 && (
               <div className="p-8 space-y-6 animate-in slide-in-from-right-8 duration-300 text-center">
                  <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Package className="w-10 h-10 text-cyan-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Review Pickup Details</h3>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-4 border border-slate-100">
                     <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 text-sm">Waste Type</span>
                        <span className="font-bold text-slate-900">{formData.wasteType}</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 text-sm">Volume</span>
                        <span className="font-bold text-slate-900">{formData.weight} kg ({formData.bins} bins)</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500 text-sm">Schedule</span>
                        <span className="font-bold text-slate-900">{formData.date} at {formData.time}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">Instructions</span>
                        <span className="font-bold text-slate-900 max-w-[150px] truncate">{formData.instructions || 'None'}</span>
                     </div>
                  </div>
               </div>
            )}

            {/* Footer Buttons */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
               {step > 1 ? (
                  <button 
                     type="button" 
                     onClick={handleBack}
                     className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                     Back
                  </button>
               ) : (
                  <div></div> // Spacer
               )}

               {step < 3 ? (
                  <button 
                     type="button" 
                     onClick={handleNext}
                     className="px-8 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl font-bold shadow-lg transition-all"
                  >
                     Next Step
                  </button>
               ) : (
                  <button 
                     type="submit" 
                     className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
                  >
                     <CheckCircle className="w-5 h-5" /> Confirm Schedule
                  </button>
               )}
            </div>

         </form>
      </div>

    </div>
  );
};
