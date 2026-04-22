
import React from 'react';
import { RouteMap } from '../../components/admin/RouteMap';

export const RouteOptimization: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Route Optimization</h1>
      <p className="text-slate-600 mb-8">Visualize and manage optimized routes for your agents.</p>
      <RouteMap />
    </div>
  );
};
