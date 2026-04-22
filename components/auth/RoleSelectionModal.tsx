
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, X, Building2 } from 'lucide-react';
import { translateText } from '../../services/geminiTranslationService';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [translations, setTranslations] = useState({
    title: 'Choose Your Role',
    subtitle: 'Select your access portal',
    householdTitle: 'Household',
    householdDescription: 'Scan medicines, schedule pickups, and earn green credits.',
    householdAction: 'User Login',
    hospitalTitle: 'Hospital / Clinic',
    hospitalDescription: 'Bulk waste management, compliance tracking, and certificates.',
    hospitalAction: 'Partner Login',
    agentTitle: 'Logistics Agent',
    agentDescription: 'Manage fleets, view routes, and track collection efficiency.',
    agentAction: 'Agent Login',
  });

  useEffect(() => {
    const translateContent = async () => {
      const translatedData = {
        title: await translateText(translations.title, currentLanguage),
        subtitle: await translateText(translations.subtitle, currentLanguage),
        householdTitle: await translateText(translations.householdTitle, currentLanguage),
        householdDescription: await translateText(translations.householdDescription, currentLanguage),
        householdAction: await translateText(translations.householdAction, currentLanguage),
        hospitalTitle: await translateText(translations.hospitalTitle, currentLanguage),
        hospitalDescription: await translateText(translations.hospitalDescription, currentLanguage),
        hospitalAction: await translateText(translations.hospitalAction, currentLanguage),
        agentTitle: await translateText(translations.agentTitle, currentLanguage),
        agentDescription: await translateText(translations.agentDescription, currentLanguage),
        agentAction: await translateText(translations.agentAction, currentLanguage),
      };
      setTranslations(translatedData);
    };

    if (currentLanguage !== 'en') {
      translateContent();
    }
  }, [currentLanguage]);

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        
        <div className="p-6 text-center border-b border-slate-100 relative">
          <h2 className="text-2xl font-bold text-slate-900">{translations.title}</h2>
          <p className="text-slate-500 text-sm mt-1">{translations.subtitle}</p>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <button 
            onClick={() => handleNavigation('/user-login')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all group text-center h-full"
          >
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <ShieldCheck className="w-10 h-10 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{translations.householdTitle}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {translations.householdDescription}
            </p>
            <span className="mt-6 text-teal-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              {translations.householdAction} &rarr;
            </span>
          </button>

          <button 
            onClick={() => handleNavigation('/hospital-login')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-100 hover:border-cyan-600 hover:bg-cyan-50 transition-all group text-center h-full"
          >
            <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <Building2 className="w-10 h-10 text-cyan-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{translations.hospitalTitle}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {translations.hospitalDescription}
            </p>
            <span className="mt-6 text-cyan-700 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              {translations.hospitalAction} &rarr;
            </span>
          </button>

          <button 
            onClick={() => handleNavigation('/agent-login')}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-800 bg-slate-900 hover:border-orange-500 hover:shadow-xl transition-all group text-center h-full"
          >
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
              <Truck className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{translations.agentTitle}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {translations.agentDescription}
            </p>
            <span className="mt-6 text-orange-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              {translations.agentAction} &rarr;
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
