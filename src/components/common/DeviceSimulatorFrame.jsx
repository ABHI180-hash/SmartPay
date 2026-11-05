import React from 'react';
import { useApp } from '../../context/AppContext';
import { Monitor, Tablet, Smartphone, X } from 'lucide-react';

export const DeviceSimulatorFrame = ({ children }) => {
  const { deviceView, setDeviceView } = useApp();

  if (deviceView === 'responsive') {
    return <>{children}</>;
  }

  if (deviceView === 'mobile') {
    return (
      <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1E1035] via-[#2D124D] to-[#120824]">
        {/* Ambient Purple Glow orbs in background */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#8B5CF6]/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#6222BD]/25 blur-[120px]" />

        {/* Top Control Bar */}
        <div className="mb-4 flex items-center justify-between w-full max-w-[420px] text-white text-xs relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="font-extrabold tracking-wide text-purple-100">SmartPay Mobile Pro View</span>
          </div>
          <button
            onClick={() => setDeviceView('responsive')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/15"
          >
            <span>Exit Phone Frame</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Phone Physical Bezel Mockup */}
        <div className="relative w-full max-w-[400px] h-[844px] bg-[#120B22] rounded-[52px] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.85)] border-[6px] border-[#3B1966] flex flex-col overflow-hidden ring-1 ring-[#8B5CF6]/30">
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1C0E33]" />
            <div className="w-3 h-3 rounded-full bg-[#10071F] border border-purple-950" />
          </div>

          {/* Screen Content Wrapper with Purple Header gradient */}
          <div className="relative w-full h-full bg-[#F5F2FD] rounded-[44px] overflow-y-auto overflow-x-hidden no-scrollbar">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full z-50 pointer-events-none" />
        </div>
      </div>
    );
  }

  if (deviceView === 'tablet') {
    return (
      <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1E1035] via-[#2D124D] to-[#120824]">
        {/* Ambient Purple Glow */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/20 blur-[120px]" />

        {/* Top Control Bar */}
        <div className="mb-4 flex items-center justify-between w-full max-w-[1024px] text-white text-xs relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="font-extrabold text-purple-100">iPad Pro Dual-Pane Landscape (1024 × 768)</span>
          </div>
          <button
            onClick={() => setDeviceView('responsive')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/15"
          >
            <span>Exit Tablet Frame</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* iPad Physical Bezel Mockup */}
        <div className="relative w-full max-w-[1020px] h-[720px] bg-[#120B22] rounded-[36px] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.85)] border-[6px] border-[#3B1966] flex flex-col overflow-hidden ring-1 ring-[#8B5CF6]/30">
          {/* Front Camera pinhole */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1C0E33] z-50" />

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full bg-[#F5F2FD] rounded-[24px] overflow-y-auto overflow-x-hidden p-4">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
