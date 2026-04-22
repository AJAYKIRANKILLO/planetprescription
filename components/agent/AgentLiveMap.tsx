
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

// Polyline decoding function
function decode(value: string, precision: number = 5) {
    var len = value.length;
    var index = 0;
    var lat = 0;
    var lng = 0;
    var array = [];
    var factor = Math.pow(10, precision);

    while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = value.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = value.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        array.push({ lat: lat / factor, lng: lng / factor });
    }
    return array;
}

interface Stop {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface AgentLiveMapProps {
  isExpanded?: boolean;
  stops: Stop[];
  polyline?: string | null;
  agentLocation: { lat: number; lng: number; };
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 28.6720,
  lng: 77.2132
};

export const AgentLiveMap: React.FC<AgentLiveMapProps> = ({ isExpanded = false, stops, polyline, agentLocation }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBGqD4biX6IZKlJajZ_EBVIg0p5FMHiL68"
  })

  const decodedPolyline = polyline ? decode(polyline) : [];

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        { /* Agent Marker */ }
        <Marker 
            position={agentLocation}
            icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#0000FF", // Blue for agent
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF"
            }}
        />
        { /* Stop Markers */ }
        {stops.map(stop => (
          <Marker key={stop.id} position={{ lat: stop.lat, lng: stop.lng }} />
        ))}
        {decodedPolyline.length > 0 && <Polyline path={decodedPolyline} options={{ strokeColor: '#FF0000' }} />}
      </GoogleMap>
  ) : <></>
};
