
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, AlertCircle, X, Zap, ArrowLeft, CheckCircle, FileText, MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnalysisCard } from '../components/AnalysisCard';
import { analyzeMedicineImage } from '../services/geminiService';
import { MedicineAnalysis, RiskLevel } from '../types';

interface ScanPageProps {
  onSchedulePickup?: (analysis: MedicineAnalysis) => void;
}

type Step = 'identify' | 'pickup' | 'success';

export const ScanPage: React.FC<ScanPageProps> = () => {
  const navigate = useNavigate();
  
  // Flow State
  const [step, setStep] = useState<Step>('identify');
  const [confirmedMedicine, setConfirmedMedicine] = useState<MedicineAnalysis | null>(null);

  // Identify Step States
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MedicineAnalysis | null>(null);
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

  // --- Handlers: Camera & Image ---
  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      setImage(null);
      setAnalysis(null);
      setIsManualEntry(false);
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
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    setImage(null);
    setAnalysis(null);
    setConfirmedMedicine(null);
    startCamera();
  };

  const handleAnalyze = () => {
    if (image) {
      performAnalysis(image.split(',')[1]);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setAnalysis(null);
    setIsManualEntry(false);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const performAnalysis = async (base64Data: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeMedicineImage(base64Data);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setConfirmedMedicine(null);
    setError(null);
    setIsManualEntry(false);
    setStep('identify');
    if (fileInputRef.current) fileInputRef.current.value = '';
    stopCamera();
  };

  // --- Handlers: Transitions ---

  // Transition from Analysis -> Pickup
  const proceedFromAnalysis = () => {
    if (analysis) {
      setConfirmedMedicine(analysis);
      setStep('pickup');
    }
  };

  // Transition from Manual Entry -> Pickup
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const manualAnalysis: MedicineAnalysis = {
      name: manualForm.name,
      composition: manualForm.purpose,
      expiryDate: manualForm.expiryDate,
      riskLevel: RiskLevel.UNKNOWN,
      riskReason: 'Manually entered by user',
      disposalRecommendation: 'Please consult local pharmacist'
    };
    setConfirmedMedicine(manualAnalysis);
    setStep('pickup');
  };

  // Submit Pickup Form -> Success
  const confirmPickup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedMedicine) return;

    // 1. Construct Record
    const newRequest = {
      id: Date.now().toString(),
      medicineName: confirmedMedicine.name,
      pickupDate: pickupForm.date,
      timeSlot: pickupForm.timeSlot,
      status: 'Scheduled',
      riskLevel: confirmedMedicine.riskLevel,
      timestamp: new Date().toISOString()
    };

    console.log("Submitting Pickup:", {
        medicine: confirmedMedicine,
        details: pickupForm
    });

    // 2. Save to LocalStorage for Dashboard persistence
    try {
      const existingData = localStorage.getItem('userPickups');
      const pickups = existingData ? JSON.parse(existingData) : [];
      const updatedPickups = [newRequest, ...pickups];
      localStorage.setItem('userPickups', JSON.stringify(updatedPickups));

      const currentUsage = parseInt(localStorage.getItem('lifetimeUsage') || '0', 10);
      localStorage.setItem('lifetimeUsage', (currentUsage + 1).toString());
    } catch (err) {
      console.error("Failed to save pickup", err);
    }

    // 3. Move to Success
    setStep('success');
  };

  // --- Render: Camera View (Overlay) ---
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

  // --- Render: Main Container ---
  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 pb-24 md:pb-8">
      
      {/* --- Step 1: Identify --- */}
      {step === 'identify' && (
        <>
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {isManualEntry ? 'Manual Entry' : 'Scan Medicine'}
            </h1>
            <p className="text-slate-500">
              {isManualEntry 
                ? 'Enter details to identify medicine type.' 
                : 'Take a photo or upload to analyze composition.'}
            </p>
          </header>

          {/* Manual Entry Form */}
          {isManualEntry && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-right-8 duration-300">
              <button onClick={() => setIsManualEntry(false)} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Scan
              </button>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
                  <input required value={manualForm.name} onChange={e => setManualForm({...manualForm, name: e.target.value})} placeholder="e.g. Dolo 650" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
                  <input required value={manualForm.purpose} onChange={e => setManualForm({...manualForm, purpose: e.target.value})} placeholder="e.g. Fever, Pain" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none" />
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
                <button type="submit" className="w-full mt-2 bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg">
                  Next: Pickup Details
                </button>
              </form>
            </div>
          )}

          {/* Initial Scan Buttons */}
          {!image && !isManualEntry && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <button onClick={startCamera} className="bg-teal-600 text-white p-8 rounded-2xl shadow-lg hover:bg-teal-700 transition-all flex flex-col items-center gap-3 group">
                  <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold">Open Camera</span>
                </button>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all text-slate-500 hover:text-teal-600"
                >
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="font-medium">Upload from Gallery</span>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => setIsManualEntry(true)} className="text-teal-600 font-medium text-sm hover:text-teal-700 hover:underline flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors">
                  <FileText className="w-4 h-4" />
                  Enter details manually
                </button>
              </div>
            </div>
          )}

          {/* Image Preview & Analyze Actions */}
          {image && !analysis && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] md:aspect-video bg-black">
                <img src={image} alt="Captured medicine" className="w-full h-full object-contain" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={handleRetake} className="py-3 px-4 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5" /> Retake
                </button>
                <button onClick={handleAnalyze} className="py-3 px-4 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 shadow-lg flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" /> Analyze with AI
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-bold text-slate-900">Analyzing...</h3>
              <p className="text-slate-500 mt-2">Identifying active ingredients & risks</p>
            </div>
          )}

          {/* Error State */}
          {error && !isAnalyzing && (
            <div className="bg-red-50 p-4 rounded-xl flex items-start gap-3 text-red-700 border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Analysis Failed</p>
                <p className="text-sm opacity-90 mt-1">{error}</p>
                <button onClick={handleRetake} className="mt-3 text-sm font-semibold underline hover:text-red-800">Try Again</button>
              </div>
            </div>
          )}

          {/* Analysis Result */}
          {analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <AnalysisCard data={analysis} onSchedule={proceedFromAnalysis} />
              <div className="mt-6 text-center">
                <button onClick={handleReset} className="py-2 px-6 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors">
                  Scan Another Item
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* --- Step 2: Pickup Details --- */}
      {step === 'pickup' && confirmedMedicine && (
        <div className="animate-in slide-in-from-right-8 duration-300">
          <div className="flex items-center gap-2 mb-6">
             <button onClick={() => setStep('identify')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
               <ArrowLeft className="w-6 h-6" />
             </button>
             <h1 className="text-2xl font-bold text-slate-900">Pickup Details</h1>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 flex items-start gap-3">
             <div className="bg-teal-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-teal-700" />
             </div>
             <div>
               <p className="text-sm font-bold text-teal-900">Disposing: {confirmedMedicine.name}</p>
               <p className="text-xs text-teal-700 mt-0.5">{confirmedMedicine.riskLevel} - {confirmedMedicine.disposalRecommendation}</p>
             </div>
          </div>

          <form onSubmit={confirmPickup} className="space-y-6">
             <div className="space-y-4">
                <div>
                   <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                     <MapPin className="w-4 h-4 text-slate-400" /> Address Line
                   </label>
                   <textarea 
                     required 
                     rows={3}
                     value={pickupForm.address}
                     onChange={e => setPickupForm({...pickupForm, address: e.target.value})}
                     className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none resize-none bg-slate-50"
                     placeholder="Flat No, Street Name, Area..."
                   ></textarea>
                </div>

                <div>
                   <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                     <Navigation className="w-4 h-4 text-slate-400" /> Landmark
                   </label>
                   <input 
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

      {/* --- Step 3: Success --- */}
      {step === 'success' && (
        <div className="flex flex-col items-center justify-center py-12 px-4 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle className="w-12 h-12 text-green-600" />
           </div>
           
           <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Pickup Scheduled!</h2>
           <p className="text-slate-500 text-center max-w-xs mb-8">
             Your collection agent will arrive on <span className="font-semibold text-slate-800">{pickupForm.date}</span> during the <span className="font-semibold text-slate-800">{pickupForm.timeSlot}</span> slot.
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
               Scan Another Item
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
