
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, AlertCircle, X, Zap, ArrowLeft, CheckCircle, FileText, MapPin, Calendar, Clock, Navigation, Plus, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnalysisCard } from '../../components/AnalysisCard';
import { VoiceInput } from '../../components/common/VoiceInput';
import { VoiceTextarea } from '../../components/common/VoiceTextarea';
import { analyzeMultipleMedicines } from '../../services/geminiService';
import { MedicineAnalysis, RiskLevel } from '../../types';
import { saveUserPickup } from '../../utils/storage';

interface ScanPageProps {
  onSchedulePickup?: (analysis: MedicineAnalysis) => void;
}

type Step = 'identify' | 'results' | 'pickup' | 'success';

interface BatchItem {
  id: string;
  type: 'image' | 'text';
  content: string; // DataURL for image, Name for text
  manualDetails?: any;
}

export const ScanPage: React.FC<ScanPageProps> = () => {
  const navigate = useNavigate();
  
  // Flow State
  const [step, setStep] = useState<Step>('identify');
  
  // Batch State
  const [scannedItems, setScannedItems] = useState<BatchItem[]>([]);
  const [batchResults, setBatchResults] = useState<MedicineAnalysis[]>([]);

  // Identify Step States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: '',
    purpose: '',
    mfgDate: '',
    expiryDate: '',
    price: ''
  });

  // Pickup Step States
  const [pickupForm, setPickupForm] = useState({
    address: '',
    landmark: '',
    date: '',
    timeSlot: 'Morning 09:00 - 12:00'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Attach stream to video element
  useEffect(() => {
    if (isCameraOpen && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, [isCameraOpen, stream]);

  // --- Helpers: Item Management ---
  const addItem = (item: Omit<BatchItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() + Math.random() };
    setScannedItems(prev => [...prev, newItem]);
    // Reset Views
    setIsManualEntry(false);
    stopCamera();
    // Reset Forms
    setManualForm({ name: '', purpose: '', mfgDate: '', expiryDate: '', price: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeItem = (id: string) => {
    setScannedItems(prev => prev.filter(i => i.id !== id));
  };

  // Helper to convert DataURL to File
  const dataURLtoFile = async (dataurl: string, filename: string): Promise<File> => {
    const res = await fetch(dataurl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/jpeg' });
  };

  // --- Handlers: Camera & Image ---
  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Camera Error:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        addItem({ type: 'image', content: dataUrl });
      }
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      addItem({ type: 'image', content: base64String });
    };
    reader.readAsDataURL(file);
  };

  // --- Handlers: Manual Entry ---
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({ 
      type: 'text', 
      content: manualForm.name, 
      manualDetails: { ...manualForm } 
    });
  };

  // --- Handlers: Analysis ---
  const handleBatchAnalyze = async () => {
    if (scannedItems.length === 0) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const promises = scannedItems.map(async (item, index) => {
        if (item.type === 'image') {
          const file = await dataURLtoFile(item.content, `scan_${index}.jpg`);
          return await analyzeMultipleMedicines(file);
        } else {
          return [{
            name: item.manualDetails?.name || item.content,
            composition: item.manualDetails?.purpose || "Manual Entry",
            expiryDate: item.manualDetails?.expiryDate || "Unknown",
            riskLevel: RiskLevel.UNKNOWN, 
            riskReason: "Manually entered",
            disposalRecommendation: "Consult pharmacist or dispose at center"
          }] as MedicineAnalysis[];
        }
      });

      const nestedResults = await Promise.all(promises);
      const flatResults = nestedResults.flat();
      
      setBatchResults(flatResults);
      setStep('results');
    } catch (err) {
      console.error(err);
      setError("Batch analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setScannedItems([]);
    setBatchResults([]);
    setError(null);
    setIsManualEntry(false);
    setStep('identify');
    stopCamera();
  };

  // --- Handlers: Pickup ---
  const handleProceedToPickup = () => {
    setStep('pickup');
  };

  const confirmPickup = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasHighRisk = batchResults.some(r => r.riskLevel === RiskLevel.HIGH);
    const combinedRisk = hasHighRisk ? RiskLevel.HIGH : RiskLevel.LOW;
    
    const names = batchResults.map(r => r.name).join(', ');

    const newRequest = {
      id: Date.now().toString(),
      medicineName: `${names.substring(0, 50)}${names.length > 50 ? '...' : ''} (${batchResults.length} items)`,
      pickupDate: pickupForm.date,
      timeSlot: pickupForm.timeSlot,
      status: 'Scheduled',
      riskLevel: combinedRisk,
      timestamp: new Date().toISOString()
    };

    saveUserPickup(newRequest);
    setStep('success');
  };

  if (isCameraOpen) {
    return (
      <div className="fixed inset-0 bg-black z-[60] flex flex-col">
        <div className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <span className="text-white font-medium">Scan Medicine</span>
          <button onClick={stopCamera} className="text-white p-2 rounded-full hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="p-8 bg-black/20 backdrop-blur-sm absolute bottom-0 left-0 right-0 flex justify-center items-center pb-safe">
          <button 
            onClick={captureImage}
            className="w-20 h-20 rounded-full border-4 border-white bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all active:scale-95 shadow-lg"
            aria-label="Capture Photo"
          >
            <div className="w-16 h-16 rounded-full bg-white"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-24 md:pb-8">
      
      {step === 'identify' && (
        <>
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {isManualEntry ? 'Manual Entry' : 'Batch Scanning'}
            </h1>
            <p className="text-slate-500">
              {isManualEntry 
                ? 'Enter details to add to batch.' 
                : 'Take photos of your medicines. AI will identify multiple items per photo.'}
            </p>
          </header>

          {!isManualEntry && scannedItems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-teal-600" />
                        Pending Scans ({scannedItems.length})
                    </h3>
                    <button onClick={handleReset} className="text-xs text-red-500 hover:underline">Clear All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {scannedItems.map((item, idx) => (
                        <div key={item.id} className="relative flex-shrink-0 group">
                            <div className="w-24 h-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                                {item.type === 'image' ? (
                                    <img src={item.content} alt={`Item ${idx}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-2">
                                        <FileText className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                                        <p className="text-[10px] text-slate-600 font-bold truncate w-full">{item.content}</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <button 
                                onClick={() => removeItem(item.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <div 
                        onClick={() => setIsManualEntry(true)} 
                        className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50 cursor-pointer transition-colors flex-shrink-0"
                    >
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold">Add Manual</span>
                    </div>
                </div>
            </div>
          )}

          {isManualEntry && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-right-8 duration-300">
              <button onClick={() => setIsManualEntry(false)} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Cancel Entry
              </button>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
                  <VoiceInput 
                    required 
                    name="name"
                    value={manualForm.name} 
                    onChange={e => setManualForm({...manualForm, name: e.target.value})} 
                    placeholder="e.g. Dolo 650" 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
                  <VoiceInput 
                    required 
                    name="purpose"
                    value={manualForm.purpose} 
                    onChange={e => setManualForm({...manualForm, purpose: e.target.value})} 
                    placeholder="e.g. Fever, Pain" 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                    <input required type="date" value={manualForm.expiryDate} onChange={e => setManualForm({...manualForm, expiryDate: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none text-slate-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                    <input type="number" value={manualForm.price} onChange={e => setManualForm({...manualForm, price: e.target.value})} placeholder="0.00" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full mt-2 bg-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Add to Batch
                </button>
              </form>
            </div>
          )}

          {!isManualEntry && (
            <div className="space-y-6">
              {scannedItems.length > 0 && (
                  <button 
                    onClick={handleBatchAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-4 bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom-2"
                  >
                    {isAnalyzing ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing Batch...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 fill-current" /> Identify Medicines
                        </>
                    )}
                  </button>
              )}

              {!isAnalyzing && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button onClick={startCamera} className="bg-white border-2 border-slate-200 text-slate-700 p-6 rounded-2xl hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex flex-col items-center gap-3">
                        <Camera className="w-8 h-8" />
                        <span className="font-bold text-sm">Camera</span>
                    </button>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border-2 border-slate-200 text-slate-700 p-6 rounded-2xl hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex flex-col items-center gap-3 cursor-pointer"
                    >
                      <Upload className="w-8 h-8" />
                      <span className="font-bold text-sm">Upload</span>
                      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                    <button onClick={() => setIsManualEntry(true)} className="bg-white border-2 border-slate-200 text-slate-700 p-6 rounded-2xl hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all flex flex-col items-center gap-3 col-span-2 md:col-span-1">
                        <FileText className="w-8 h-8" />
                        <span className="font-bold text-sm">Manual</span>
                    </button>
                  </div>
              )}
            </div>
          )}

          {error && !isAnalyzing && (
            <div className="bg-red-50 p-4 rounded-xl flex items-start gap-3 text-red-700 border border-red-100 mt-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Analysis Error</p>
                <p className="text-sm opacity-90 mt-1">{error}</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Rest of the file unchanged (results, pickup, success steps) */}
      {step === 'results' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Items Identified</h2>
                <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">
                    {batchResults.length} Found
                </div>
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg mb-8 flex items-center justify-between">
                <div>
                    <p className="text-teal-100 text-sm font-bold uppercase tracking-wider">Total Potential Credits</p>
                    <p className="text-4xl font-extrabold mt-1">{batchResults.length * 10}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm opacity-90">Keep scanning to earn more!</p>
                    <button onClick={handleReset} className="mt-2 text-xs font-bold underline hover:text-teal-200">Discard & Start Over</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {batchResults.map((result, idx) => (
                    <AnalysisCard key={idx} data={result} hideAction={true} />
                ))}
            </div>

            <button 
                onClick={handleProceedToPickup}
                className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
            >
                Schedule Batch Pickup <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
        </div>
      )}

      {step === 'pickup' && (
        <div className="animate-in slide-in-from-right-8 duration-300">
          <div className="flex items-center gap-2 mb-6">
             <button onClick={() => setStep('results')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
               <ArrowLeft className="w-6 h-6" />
             </button>
             <h1 className="text-2xl font-bold text-slate-900">Pickup Details</h1>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 flex items-start gap-3">
             <div className="bg-teal-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-teal-700" />
             </div>
             <div>
               <p className="text-sm font-bold text-teal-900">Batch Pickup: {batchResults.length} Items</p>
               <p className="text-xs text-teal-700 mt-0.5">Scheduling collection for all analyzed items.</p>
             </div>
          </div>

          <form onSubmit={confirmPickup} className="space-y-6">
             <div className="space-y-4">
                <div>
                   <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                     <MapPin className="w-4 h-4 text-slate-400" /> Address Line
                   </label>
                   <VoiceTextarea 
                     required 
                     rows={3}
                     value={pickupForm.address}
                     onChange={e => setPickupForm({...pickupForm, address: e.target.value})}
                     className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none resize-none bg-slate-50"
                     placeholder="Flat No, Street Name, Area..."
                   />
                </div>

                <div>
                   <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                     <Navigation className="w-4 h-4 text-slate-400" /> Landmark
                   </label>
                   <VoiceInput 
                     type="text"
                     value={pickupForm.landmark}
                     onChange={e => setPickupForm({...pickupForm, landmark: e.target.value})}
                     className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
                     placeholder="Near City Mall..."
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> Pickup Date
                      </label>
                      <input 
                        required 
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={pickupForm.date}
                        onChange={e => setPickupForm({...pickupForm, date: e.target.value})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 text-slate-700"
                      />
                   </div>
                   <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <Clock className="w-4 h-4 text-slate-400" /> Time Slot
                      </label>
                      <div className="relative">
                        <select 
                          value={pickupForm.timeSlot}
                          onChange={e => setPickupForm({...pickupForm, timeSlot: e.target.value})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 appearance-none text-slate-700"
                        >
                          <option>Morning 09:00 - 12:00</option>
                          <option>Afternoon 12:00 - 16:00</option>
                          <option>Evening 16:00 - 20:00</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-4 border-t border-slate-100">
               <button 
                 type="submit" 
                 className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
               >
                 Confirm Pickup
               </button>
             </div>
          </form>
        </div>
      )}

      {step === 'success' && (
        <div className="flex flex-col items-center justify-center py-12 px-4 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle className="w-12 h-12 text-green-600" />
           </div>
           
           <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Batch Scheduled!</h2>
           <p className="text-slate-500 text-center max-w-xs mb-8">
             Your collection agent will arrive on <span className="font-semibold text-slate-800">{pickupForm.date}</span> to collect {batchResults.length} items.
           </p>

           <div className="w-full space-y-3">
             <button 
               onClick={() => navigate('/dashboard')}
               className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 transition-all"
             >
               View on Dashboard
             </button>
             <button 
               onClick={handleReset}
               className="w-full py-4 bg-white text-teal-700 font-bold rounded-xl border border-teal-100 hover:bg-teal-50 transition-all"
             >
               Scan Another Batch
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
