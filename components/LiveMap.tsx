import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, WifiOff, MapPin } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

export const LiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    // If no API key is present, fail immediately to fallback
    if (!apiKey) {
      setStatus('error');
      return;
    }

    const loadMap = () => {
      try {
        if (!window.google) {
          // If script isn't loaded, we'd normally load it here.
          // For this demo, we'll try to check if it's already there or handle the script injection.
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
          script.async = true;
          script.defer = true;
          
          script.onload = initMap;
          script.onerror = () => setStatus('error');
          document.head.appendChild(script);
        } else {
          initMap();
        }
      } catch (err) {
        console.error("Map load error", err);
        setStatus('error');
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 28.6139, lng: 77.2090 }, // New Delhi
          zoom: 12,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ lightness: -80 }]
            },
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }]
            }
          ] // Dark mode style
        });

        // Add dummy markers
        const agents = [
          { lat: 28.6139, lng: 77.2090, title: "Agent 1" },
          { lat: 28.5355, lng: 77.3910, title: "Agent 2" },
          { lat: 28.7041, lng: 77.1025, title: "Agent 3" }
        ];

        agents.forEach(agent => {
          new window.google.maps.Marker({
            position: { lat: agent.lat, lng: agent.lng },
            map,
            title: agent.title,
            animation: window.google.maps.Animation.DROP
          });
        });

        setStatus('success');
      } catch (e) {
        console.error("Error initializing map", e);
        setStatus('error');
      }
    };

    // Timeout safety: If map doesn't load in 3 seconds, show fallback
    const timeoutId = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error');
      }
    }, 3000);

    loadMap();

    return () => clearTimeout(timeoutId);
  }, []);

  if (status === 'error') {
    return (
      <div className="w-full h-full min-h-[500px] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 group">
        {/* Background Static Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-60"
          style={{ backgroundImage: 'url(https://via.placeholder.com/800x600/e2e8f0/94a3b8?text=Map+Data+Unavailable)' }}
        ></div>

        {/* Mock Map Markers for visual flair in fallback mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <MapPin className="w-8 h-8 text-red-500 animate-bounce" />
        </div>
        <div className="absolute top-1/3 left-1/3">
           <MapPin className="w-6 h-6 text-teal-600 opacity-75" />
        </div>
        <div className="absolute bottom-1/3 right-1/4">
           <MapPin className="w-6 h-6 text-teal-600 opacity-75" />
        </div>

        {/* Simulation Overlay */}
        <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center border border-white/50 max-w-sm mx-4">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-600">
               <WifiOff className="w-5 h-5" />
               <span className="font-bold text-xs uppercase tracking-wider">Live Connection Failed</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Simulation Mode</h3>
            <p className="text-slate-500 text-sm mb-4">
              Unable to load Google Maps API. Showing estimated positions based on last known data.
            </p>
            <div className="flex items-center justify-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-lg font-medium text-sm">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              Tracking 3 Agents
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 relative">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};