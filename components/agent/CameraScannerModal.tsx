
import React, { useRef, useState, useEffect } from 'react';
import { X, Camera, RefreshCw, Upload, CheckCircle } from 'lucide-react';

interface CameraScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture?: (imageData: string) => void;
}

export const CameraScannerModal: React.FC<CameraScannerModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setCapturedImage(null);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setError("Unable to access camera. Please check permissions or use upload.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        // Optional: Call onCapture immediately or wait for confirmation
        // if (onCapture) onCapture(dataUrl);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
    }
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <span className="text-white font-bold text-lg">Scan Medicine</span>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
        ) : error ? (
          <div className="text-center p-6 max-w-sm">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Camera className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-white font-medium mb-4">{error}</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto"
            >
              <Upload className="w-5 h-5" /> Upload Image
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover" 
            />
            {/* Overlay Guide */}
            <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none flex items-center justify-center">
               <div className="w-64 h-64 border-2 border-white/50 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-orange-500 -mt-1 -ml-1"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-orange-500 -mt-1 -mr-1"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-orange-500 -mb-1 -ml-1"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-orange-500 -mb-1 -mr-1"></div>
               </div>
            </div>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Footer Controls */}
      <div className="p-8 bg-black/80 backdrop-blur-md pb-safe">
        <div className="flex justify-center items-center gap-8">
           {capturedImage ? (
             <>
               <button onClick={handleRetake} className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors">
                 <RefreshCw className="w-8 h-8" />
                 <span className="text-xs font-medium">Retake</span>
               </button>
               <button onClick={handleConfirm} className="flex flex-col items-center gap-2 text-green-400 hover:text-green-300 transition-colors scale-110">
                 <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                    <CheckCircle className="w-8 h-8 fill-current" />
                 </div>
                 <span className="text-xs font-medium">Use Photo</span>
               </button>
             </>
           ) : (
             !error && (
                <>
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Upload className="w-6 h-6" />
                        <span className="text-xs font-medium">Upload</span>
                    </button>
                    <button 
                        onClick={handleCapture}
                        className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:bg-white/40 transition-all hover:scale-105"
                    >
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm"></div>
                    </button>
                    <div className="w-10"></div> {/* Spacer for symmetry */}
                </>
             )
           )}
           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};
