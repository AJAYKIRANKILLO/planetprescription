
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 28.6720,
  lng: 77.2132
};

// Mock agent data with live locations
const initialAgents = [
  { id: 1, name: 'Agent 1', lat: 28.6720, lng: 77.2132 },
  { id: 2, name: 'Agent 2', lat: 28.6754, lng: 77.2121 },
  { id: 3, name: 'Agent 3', lat: 28.6698, lng: 77.2112 },
];

export const LiveLocation: React.FC = () => {
  const [agents, setAgents] = useState(initialAgents);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBGqD4biX6IZKlJajZ_EBVIg0p5FMHiL68"
  })

  const fetchLiveLocation = () => {
    setAgents(prevAgents =>
      prevAgents.map(agent => ({
        ...agent,
        lat: agent.lat + (Math.random() - 0.5) * 0.001,
        lng: agent.lng + (Math.random() - 0.5) * 0.001,
      }))
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveLocation();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return isLoaded ? (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Live Agent Location</h1>
          <p className="text-slate-600">Track your agents in real-time.</p>
        </div>
        <button 
          onClick={fetchLiveLocation}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          Fetch Live Location
        </button>
      </div>
      <div className="w-full h-[600px] rounded-lg overflow-hidden relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          { /* Admin Marker */ }
          <Marker 
            position={center} 
            icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#FF0000", // Red for admin
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF"
            }}
          />
          { /* Agent Markers */ }
          {agents.map(agent => (
            <Marker 
                key={agent.id} 
                position={{ lat: agent.lat, lng: agent.lng }} 
                icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#0000FF", // Blue for agents
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#FFFFFF"
                }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : <></>
};
