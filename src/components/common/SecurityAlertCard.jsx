import React from 'react';
import { ShieldAlert, ChevronRight, Lock } from 'lucide-react';

export const SecurityAlertCard = ({ onLearnMore }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6222BD] to-[#752DE0] text-white p-4 sm:p-5 shadow-lg shadow-purple-500/20 border border-purple-400/30">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white shadow-lg shadow-[#7C3AED]/30 flex-shrink-0">
            <ShieldAlert className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                AI Scam Shield
              </h4>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-emerald-300 border border-emerald-400/30">
                <Lock className="w-2.5 h-2.5" /> Active 24/7
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 max-w-sm sm:max-w-md">
              We protect you from fraud. Stay alert, stay safe.
            </p>
          </div>
        </div>

        <button
          onClick={onLearnMore}
          className="flex-shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors border border-white/15"
        >
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
