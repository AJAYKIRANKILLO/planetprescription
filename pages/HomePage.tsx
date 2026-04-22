
import React from 'react';
import { ShieldCheck, Recycle, Truck, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface HomePageProps {
  onStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-800 text-white px-6 py-16 md:py-24 md:rounded-b-[3rem]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            ♻️ Safe Pharma Disposal
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Dispose of Expired Medicine <span className="text-teal-200">Responsibly.</span>
          </h1>
          <p className="text-teal-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Protect your household and the environment. Use AI to identify high-risk pharmaceutical waste and schedule safe collection instantly.
          </p>
          <button 
            onClick={onStart}
            className="group bg-white text-teal-800 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-teal-50 transition-all flex items-center gap-2 mx-auto"
          >
            Start Scanning
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: ShieldCheck,
            title: "AI Analysis",
            desc: "Instantly identify high-risk medicines like antibiotics and opioids."
          },
          {
            icon: Truck,
            title: "Easy Pickup",
            desc: "Schedule a collection agent to pick up waste from your doorstep."
          },
          {
            icon: Recycle,
            title: "Eco-Friendly",
            desc: "Ensure chemical compounds don't contaminate water systems."
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
