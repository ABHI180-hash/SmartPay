import React from 'react';
import { Home, PieChart, CreditCard, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNavigation = () => {
  const { personalTab, setPersonalTab, setActiveModal } = useApp();

  return (
    <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-40 select-none">
      {/* Floating White Pill Dock matching Cashly Reference */}
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-full border border-purple-100/90 shadow-[0_12px_40px_rgba(108,43,226,0.18),0_2px_10px_rgba(0,0,0,0.04)] px-3 py-2 flex items-center justify-between">
        {/* Soft Lavender Halo Glow behind Elevated Center Scan Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-20 h-20 rounded-full bg-gradient-to-t from-[#8B5CF6]/40 via-[#A855F7]/30 to-[#C084FC]/20 blur-xl pointer-events-none" />

        {/* 1. Home Tab */}
        <button
          onClick={() => setPersonalTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 touch-manipulation transition-all group ${
            personalTab === 'home' ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-[#1E1B4B]'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform group-hover:scale-110 ${personalTab === 'home' ? 'stroke-[2.6] fill-[#7C3AED]/15' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${personalTab === 'home' ? 'font-bold' : 'font-medium'}`}>
            Home
          </span>
          {personalTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 shadow-xs" />
          )}
        </button>

        {/* 2. Insights Tab */}
        <button
          onClick={() => setPersonalTab('analytics')}
          className={`flex-1 flex flex-col items-center justify-center py-1 touch-manipulation transition-all group ${
            personalTab === 'analytics' ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-[#1E1B4B]'
          }`}
        >
          <PieChart className={`w-5 h-5 transition-transform group-hover:scale-110 ${personalTab === 'analytics' ? 'stroke-[2.6] fill-[#7C3AED]/15' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${personalTab === 'analytics' ? 'font-bold' : 'font-medium'}`}>
            Insights
          </span>
          {personalTab === 'analytics' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 shadow-xs" />
          )}
        </button>

        {/* 3. Center Elevated Floating Scan Button (Exact Cashly Style) */}
        <div className="relative flex-shrink-0 w-16 flex items-center justify-center">
          <div className="absolute -top-7">
            <button
              onClick={() => setActiveModal('scanPay')}
              className="relative w-15 h-15 rounded-full bg-gradient-to-tr from-[#601EB9] via-[#7622E6] to-[#A855F7] text-white flex items-center justify-center border-[3.5px] border-white shadow-[0_10px_25px_rgba(118,34,230,0.5),0_0_20px_rgba(168,85,247,0.35)] active:scale-90 hover:scale-105 transition-all group"
              title="Scan any UPI QR"
            >
              {/* Custom Cashly 4-corner bracket QR viewfinder glyph */}
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {/* Top-Left Corner */}
                <path d="M4 8V5.5C4 4.67 4.67 4 5.5 4H8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Top-Right Corner */}
                <path d="M16 4h2.5C19.33 4 20 4.67 20 5.5V8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Bottom-Left Corner */}
                <path d="M4 16v2.5C4 19.33 4.67 20 5.5 20H8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Bottom-Right Corner */}
                <path d="M16 20h2.5c.83 0 1.5-.67 1.5-1.5V16" strokeLinecap="round" strokeLinejoin="round" />
                {/* Center QR Matrix Points */}
                <rect x="8" y="8" width="3" height="3" rx="0.75" fill="currentColor" stroke="none" />
                <rect x="13" y="8" width="3" height="3" rx="0.75" fill="currentColor" stroke="none" />
                <rect x="8" y="13" width="3" height="3" rx="0.75" fill="currentColor" stroke="none" />
                <rect x="13" y="13" width="3" height="3" rx="0.75" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4. Cards Tab */}
        <button
          onClick={() => setPersonalTab('payments')}
          className={`flex-1 flex flex-col items-center justify-center py-1 touch-manipulation transition-all group ${
            personalTab === 'payments' ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-[#1E1B4B]'
          }`}
        >
          <CreditCard className={`w-5 h-5 transition-transform group-hover:scale-110 ${personalTab === 'payments' ? 'stroke-[2.6] fill-[#7C3AED]/15' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${personalTab === 'payments' ? 'font-bold' : 'font-medium'}`}>
            Cards
          </span>
          {personalTab === 'payments' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 shadow-xs" />
          )}
        </button>

        {/* 5. Profile Tab */}
        <button
          onClick={() => setPersonalTab('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-1 touch-manipulation transition-all group ${
            personalTab === 'profile' ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-[#1E1B4B]'
          }`}
        >
          <User className={`w-5 h-5 transition-transform group-hover:scale-110 ${personalTab === 'profile' ? 'stroke-[2.6] fill-[#7C3AED]/15' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${personalTab === 'profile' ? 'font-bold' : 'font-medium'}`}>
            Profile
          </span>
          {personalTab === 'profile' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 shadow-xs" />
          )}
        </button>
      </div>

      {/* Subtle Phone Bottom Home Indicator */}
      <div className="w-32 h-1 bg-black/20 rounded-full mx-auto mt-2 pointer-events-none" />
    </div>
  );
};
