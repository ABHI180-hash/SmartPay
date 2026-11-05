import React from 'react';
import { SmartPayLogo } from '../../components/common/SmartPayLogo';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen = () => {
  const { setAuthScreen, setPlatformMode } = useApp();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#4A159D] via-[#6222BD] to-[#752DE0] flex flex-col justify-between items-center p-6 text-white overflow-hidden select-none">
      {/* Background Organic Wave Gradients matching Cashly purple theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8B5CF6]/30 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#A855F7]/25 blur-[120px]" />
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-[55%] object-cover opacity-30"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 450C200 400 350 750 720 600C1090 450 1200 700 1540 550V950H-100V450Z"
            fill="url(#splash-purple-grad)"
          />
          <defs>
            <linearGradient id="splash-purple-grad" x1="0" y1="400" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#5B21B6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Center Branding Monogram & Wordmark */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
        <SmartPayLogo variant="light" size="xl" showTagline={false} />
        
        <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-white">
          SmartPay<span className="text-[#00F0FF]">.</span>
        </h2>
        
        <div className="mt-2 text-sm sm:text-base font-semibold text-purple-200/90 tracking-wide">
          Pay Smart. <br />
          Live Secure.
        </div>

        {/* Quick Launch Buttons */}
        <div className="mt-8 w-full max-w-xs space-y-3">
          <button
            onClick={() => setAuthScreen('onboarding')}
            className="w-full py-3.5 px-6 rounded-full bg-white text-[#6222BD] font-extrabold text-sm shadow-xl shadow-purple-900/30 hover:bg-purple-50 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Get Started (New User)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setAuthScreen('login')}
            className="w-full py-3 px-6 rounded-full bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs shadow-lg backdrop-blur-md border border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Existing Account</span>
          </button>

          <button
            onClick={() => {
              setPlatformMode('personal');
            }}
            className="w-full py-2.5 px-6 rounded-full bg-white/10 hover:bg-white/15 text-purple-200 font-semibold text-xs transition-colors border border-white/10"
          >
            Explore Dashboard Directly
          </button>
        </div>
      </div>

      {/* Bottom Footer Pill */}
      <div className="relative z-10 mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-200">
          <span>Made for a Safer Smarter India</span>
          <span className="text-sm">🇮🇳</span>
        </div>
      </div>
    </div>
  );
};
