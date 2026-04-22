
import React from 'react';
import { ShieldCheck, Globe, Award, Wallet, TrendingUp, Leaf } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Certified Safe",
      desc: "All medicines are disposed of according to WHO and FDA guidelines."
    },
    {
      icon: Globe,
      title: "Environmental Impact",
      desc: "We prevent water contamination and reduce pharmaceutical waste."
    },
    {
      icon: Award,
      title: "Verified Partners",
      desc: "Licensed disposal facilities and verified collection agents."
    },
    {
      icon: Wallet,
      title: "Earn Rewards",
      desc: "Get cashback and loyalty points for every disposal."
    },
    {
      icon: TrendingUp,
      title: "Track Impact",
      desc: "See your personal and community environmental impact."
    },
    {
      icon: Leaf,
      title: "Carbon Neutral",
      desc: "Our operations are fully carbon-neutral and eco-friendly."
    }
  ];

  return (
    <section className="py-24 px-4 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-bold uppercase tracking-wider text-sm mb-2 block">Our Promise</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Why Choose Planet Prescription?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We combine technology, logistics, and compliance to make pharmaceutical disposal easy, safe, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
