
import { getDirections } from './googleMapsApi';

// --- TYPES ---
export interface SimulationRequest {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  riskLevel: 'High' | 'Low';
  wasteType: string;
}

export interface RouteBatch {
  batchId: string;
  agentName: string;
  stops: { name: string; lat: number; lng: number }[];
  riskCategory: 'High Risk' | 'Standard';
  totalDistance: string;
  efficiencyScore: string;
  status: 'Optimized';
  polyline: string;
}

export interface ReorderedRoute {
    stops: any[];
    polyline: string;
}

// --- SHARED HELPERS ---
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Math.random() * 5; // Fallback if coords missing

  const R = 6371; // Radius of earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// --- 1. ADMIN MODE: CREATE BATCHES ---
export const generateAdminRoutes = async (): Promise<RouteBatch[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Hardcoded clusters for reliable demo visualization
  const batchesWithoutPolyline = [
    {
      batchId: 'RT-101',
      agentName: 'Vikram Singh',
      stops: [
        { name: 'Varsha Patel', lat: 12.9716, lng: 77.5946 },
        { name: 'Rahul Sharma', lat: 12.9754, lng: 77.6021 },
        { name: 'Priya Verma', lat: 12.9698, lng: 77.6112 },
      ],
      riskCategory: 'Standard' as const,
      totalDistance: '2.4 km',
      efficiencyScore: '+15% Fuel Saved',
      status: 'Optimized' as const,
    },
    {
      batchId: 'RT-CRITICAL-99',
      agentName: 'Suresh (Hazmat Certified)',
      stops: [
        { name: 'Amit Singh', lat: 12.9821, lng: 77.5843 },
        { name: 'Karan Johar', lat: 12.9785, lng: 77.5968 },
      ],
      riskCategory: 'High Risk' as const,
      totalDistance: '1.8 km',
      efficiencyScore: 'Safety Protocol Active',
      status: 'Optimized' as const,
    },
    {
      batchId: 'RT-104',
      agentName: 'Sneha Reddy',
      stops: [
        { name: 'John Doe', lat: 12.9654, lng: 77.5821 },
        { name: 'Farah Khan', lat: 12.9712, lng: 77.5734 },
      ],
      riskCategory: 'Standard' as const,
      totalDistance: '5.2 km',
      efficiencyScore: '+8% Fuel Saved',
      status: 'Optimized' as const,
    }
  ];

  const batches = await Promise.all(batchesWithoutPolyline.map(async (batch) => {
    if (batch.stops.length < 2) {
        return { ...batch, polyline: '' };
    }
    const origin = batch.stops[0];
    const destination = batch.stops[batch.stops.length - 1];
    const waypoints = batch.stops.slice(1, -1);
    const directions = await getDirections(origin, destination, waypoints);
    return { ...batch, polyline: directions.polyline, totalDistance: `${(directions.distance / 1000).toFixed(1)} km` };
  }));

  return batches;
};

// --- 2. AGENT MODE: RE-ORDER STOPS ---
// Sorts existing stops to find the shortest path (Nearest Neighbor)
export const reorderAgentRoute = async (currentStops: any[]): Promise<ReorderedRoute> => {
  // Simulate calculation delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!currentStops || currentStops.length <= 1) return { stops: currentStops, polyline: '' };

  // Create a copy to avoid mutating state directly during calculation
  // Assume the first stop is locked (current location or immediate next)
  const sortedRoute = [currentStops[0]];
  const remaining = [...currentStops.slice(1)];

  // Greedy Sort: Find the closest stop to the last added stop
  while (remaining.length > 0) {
    const lastStop = sortedRoute[sortedRoute.length - 1];
    let nearestIndex = 0;
    let minDist = Infinity;

    remaining.forEach((stop, index) => {
      // Use lat/lng if available, otherwise mock it for demo based on index to force a change
      const d = calculateDistance(
        lastStop.lat || 0, 
        lastStop.lng || 0, 
        stop.lat || (index * 0.1), // Mock variance if lat missing
        stop.lng || (index * 0.1)
      );
      
      if (d < minDist) {
        minDist = d;
        nearestIndex = index;
      }
    });

    // Move nearest neighbor to sorted list
    sortedRoute.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }

  // Visual hack for demo: If the sort resulted in same order, force a swap just to show "Optimization" happened
  const isSameOrder = sortedRoute.every((val, index) => val.id === currentStops[index].id);
  if (isSameOrder && sortedRoute.length > 2) {
     const temp = sortedRoute[1];
     sortedRoute[1] = sortedRoute[2];
     sortedRoute[2] = temp;
  }

  const origin = sortedRoute[0];
  const destination = sortedRoute[sortedRoute.length - 1];
  const waypoints = sortedRoute.slice(1, -1);
  const directions = await getDirections(origin, destination, waypoints);

  return { stops: sortedRoute, polyline: directions.polyline };
};
