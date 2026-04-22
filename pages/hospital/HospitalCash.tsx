
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HospitalSidebar } from '../../components/hospital/HospitalSidebar';
import { ArrowLeft, Landmark, CheckCircle, Lock, Wallet } from 'lucide-react';

export const HospitalCash: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txnRef, setTxnRef] = useState<string | null>(null);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
        setIsProcessing(false);
        setTxnRef('TXN-' + Math.floor(1000 + Math.random() * 9000));
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <HospitalSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
           <button onClick={() => navigate('/hospital/rewards')} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
              <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-xl font-bold text-slate-800">Bank Transfer</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
              
              {txnRef ? (
                  // SUCCESS STATE
                  <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-slate-200">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Transfer Initiated</h2>
                      <p className="text-slate-500 mb-6">Your funds are on the way to your account.</p>
                      
                      <div className="bg-slate-50 p-4 rounded-xl inline-block mb-8 border border-slate-100">
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Reference ID</p>
                          <p className="text-xl font-mono font-bold text-slate-800 mt-1">#{txnRef}</p>
                      </div>

                      <div>
                          <button 
                            onClick={() => navigate('/hospital/rewards')}
                            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                          >
                              Done
                          </button>
                      </div>
                  </div>
              ) : (
                  // FORM STATE
                  <>
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg flex justify-between items-center">
                        <div>
                            <p className="text-emerald-100 text-sm font-bold uppercase">Available for Withdrawal</p>
                            <h2 className="text-4xl font-extrabold mt-1">₹12,500</h2>
                        </div>
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Landmark className="w-5 h-5 text-slate-500" /> Destination Account
                        </h3>

                        {/* Read-Only Bank Card */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm font-bold text-slate-800 text-xs">
                                HDFC
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">HDFC Bank Ltd</p>
                                <p className="text-sm text-slate-500 font-mono">**** **** **** 8821</p>
                                <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                                    <CheckCircle className="w-3 h-3" /> Verified Business Account
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleWithdraw}>
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Withdrawal Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₹</span>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        max={12500}
                                        placeholder="0"
                                        className="w-full pl-10 pr-4 py-4 text-3xl font-bold text-slate-900 bg-white border-b-2 border-slate-200 focus:border-emerald-500 outline-none transition-colors placeholder:text-slate-200"
                                        autoFocus
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Min: ₹500 • Max: ₹12,500</p>
                            </div>

                            <button 
                                type="submit"
                                disabled={isProcessing || !amount}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Secure Transfer...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" /> Process Transfer
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                  </>
              )}

           </div>
        </div>
      </main>
    </div>
  );
};
