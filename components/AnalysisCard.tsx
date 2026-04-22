
import React from 'react';
import { MedicineAnalysis, RiskLevel } from '../types';
import { AlertTriangle, CheckCircle, Trash2, ShieldAlert, Leaf, Factory } from 'lucide-react';

interface AnalysisCardProps {
  data: MedicineAnalysis;
  onSchedule?: () => void;
  hideAction?: boolean;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ data, onSchedule, hideAction = false }) => {
  
  const getRiskStyles = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH:
        return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800', subText: 'text-red-600', icon: <ShieldAlert className="w-6 h-6 text-red-600" /> };
      case RiskLevel.MEDIUM:
        return { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-800', subText: 'text-orange-600', icon: <AlertTriangle className="w-6 h-6 text-orange-600" /> };
      default:
        return { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-800', subText: 'text-green-600', icon: <CheckCircle className="w-6 h-6 text-green-600" /> };
    }
  };

  const styles = getRiskStyles(data.riskLevel);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className={`p-4 ${styles.bg} border-b ${styles.border} flex items-center gap-3`}>
        {styles.icon}
        <div>
          <h3 className={`font-bold text-lg ${styles.text}`}>
            {data.riskLevel}
          </h3>
          <p className={`text-xs ${styles.subText}`}>
            {data.riskLevel === RiskLevel.HIGH ? 'Professional disposal required' : 'Safe for standard protocols'}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicine Name</label>
          <p className="text-lg font-medium text-slate-900 line-clamp-1" title={data.name}>{data.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Composition</label>
            <p className="text-sm text-slate-700 line-clamp-2" title={data.composition}>{data.composition}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiry</label>
            <p className="text-sm text-slate-700">{data.expiryDate}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Why is this {data.riskLevel}?</label>
          <p className="text-sm text-slate-700 mt-1 line-clamp-3">{data.riskReason}</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <label className="text-xs font-semibold text-blue-600 uppercase tracking-wider">User Disposal Guide</label>
          <p className="text-sm text-blue-800 mt-1 line-clamp-2">{data.disposalRecommendation}</p>
        </div>

        {/* New Eco Tip Section */}
        {data.userEcoTip && (
           <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 flex gap-3">
              <div className="mt-0.5"><Leaf className="w-4 h-4 text-emerald-600" /></div>
              <div>
                <label className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Eco-Friendly Tip</label>
                <p className="text-sm text-emerald-800 mt-1 leading-snug">{data.userEcoTip}</p>
              </div>
           </div>
        )}

        {/* New Industrial Method Section */}
        {data.adminIndustrialMethod && (
           <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 flex gap-3 opacity-80 hover:opacity-100 transition-opacity">
              <div className="mt-0.5"><Factory className="w-4 h-4 text-slate-500" /></div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Industrial Process</label>
                <p className="text-xs text-slate-700 mt-1 font-mono">{data.adminIndustrialMethod}</p>
              </div>
           </div>
        )}

        {!hideAction && onSchedule && (
          <button
            onClick={onSchedule}
            className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Schedule Pickup
          </button>
        )}
      </div>
    </div>
  );
};
