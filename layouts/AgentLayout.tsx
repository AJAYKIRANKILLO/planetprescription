
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AgentSidebar } from '../components/agent/AgentSidebar';

export const AgentLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Persistent Sidebar */}
      <AgentSidebar />
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto h-full relative">
        <div className="min-h-full">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};
