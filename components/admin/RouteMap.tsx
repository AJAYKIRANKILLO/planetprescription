
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { generateAdminRoutes, RouteBatch } from '../../utils/routeOptimizerSimulation';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 28.6720,
  lng: 77.2132
};

export const RouteMap: React.FC = () => {
  const [routes, setRoutes] = useState<RouteBatch[]>([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBGqD4biX6IZKlJajZ_EBVIg0p5FMHiL68"
  })

  useEffect(() => {
    const fetchRoutes = async () => {
      const adminRoutes = await generateAdminRoutes();
      setRoutes(adminRoutes);
    };
    fetchRoutes();
  }, []);

  const routeColors = ['#FF0000', '#00FF00', '#0000FF']; // Red, Green, Blue

  return isLoaded ? (
    <div className="w-full h-[600px] rounded-lg overflow-hidden relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {routes.map((route, routeIndex) => (
          <React.Fragment key={route.batchId}>
            <Polyline
              path={route.stops.map(stop => ({ lat: stop.lat, lng: stop.lng }))}
              options={{ strokeColor: routeColors[routeIndex % routeColors.length] }}
            />
            {route.stops.map((stop, stopIndex) => (
              <Marker key={`${route.batchId}-${stopIndex}`} position={{ lat: stop.lat, lng: stop.lng }} />
            ))}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  ) : <></>
};
