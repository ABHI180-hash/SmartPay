import React, { useState } from 'react';
import { ArrowLeft, Volume2, Play, VolumeX, Sparkles, CheckCircle2, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SoundboxModal = ({ onClose }) => {
  const { playSoundboxAnnouncement, merchant } = useApp();
  const [selectedLang, setSelectedLang] = useState('hi');
  const [testAmount, setTestAmount] = useState('250');

  const handleTestPlay = (amt) => {
    playSoundboxAnnouncement(amt || testAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B]">
        {/* Purple Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6222BD] to-[#752DE0] text-white flex items-center justify-between shadow-md">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-base font-bold text-white tracking-tight">SmartPay Audio Soundbox</h2>
            <p className="text-[11px] text-emerald-300">Live Voice Payment Terminal</p>
          </div>
          <div className="w-8" />
        </div>

        <div className="p-6 space-y-6 text-center">
          {/* Hardware Soundbox Replica graphic */}
          <div className="relative mx-auto w-56 bg-gradient-to-b from-[#1E1B4B] to-[#0B1F3A] rounded-3xl p-5 text-white shadow-2xl border-4 border-slate-700/50">
            {/* Top antenna & LED indicator */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono font-bold text-emerald-400">4G CONNECTED</span>
              </div>
              <Volume2 className="w-4 h-4 text-slate-300" />
            </div>

            {/* LCD Screen Display */}
            <div className="bg-[#002b1f] border border-emerald-500/40 rounded-xl p-3 text-emerald-400 font-mono text-center shadow-inner">
              <span className="text-[10px] uppercase tracking-wider block text-emerald-400/80">
                Payment Received
              </span>
              <span className="text-2xl font-extrabold tracking-tight block mt-0.5">
                ₹{parseFloat(testAmount || 0).toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] text-emerald-300">UPI Success • ACME Store</span>
            </div>

            {/* Speaker Grille dots */}
            <div className="mt-4 py-2 flex flex-col items-center gap-1.5">
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600/80" />
                ))}
              </div>
              <div className="flex gap-2">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600/80" />
                ))}
              </div>
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600/80" />
                ))}
              </div>
            </div>

            {/* Hardware Branding */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-[11px] font-bold text-white">
              <span>SmartPay</span>
              <span className="text-[#8B5CF6]">VoiceBox 4G</span>
            </div>
          </div>

          {/* Trigger Live Speech announcement */}
          <div>
            <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
              Test Instant Audio Alert
            </p>
            <div className="flex items-center justify-center gap-2">
              {['100', '250', '500', '1200'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setTestAmount(amt);
                    handleTestPlay(amt);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    testAmount === amt
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm'
                      : 'bg-slate-50 text-[#1E1B4B] border-[#EDE9FE] hover:bg-slate-100'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleTestPlay(testAmount)}
            className="w-full py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-sm shadow-lg shadow-[#7C3AED]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Audible Voice Confirmation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
