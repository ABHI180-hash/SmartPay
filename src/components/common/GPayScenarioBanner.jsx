import React from 'react';
import { Search, Mic, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import { SmartPayLogo } from './SmartPayLogo';
import { useApp } from '../../context/AppContext';

export const GPayScenarioBanner = () => {
  const { user, setActiveModal, setPersonalTab } = useApp();

  return (
    <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-b from-[#09182B] via-[#0D243F] to-[#1E1B4B] text-white shadow-2xl border border-white/10 select-none">
      {/* Top Floating Glass Intelligence Search Bar */}
      <div className="relative z-20 pt-4 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <SmartPayLogo variant="light" size="sm" showTagline={false} />

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#8B5CF6]/20 text-emerald-300 border border-[#8B5CF6]/40">
              <Shield className="w-3 h-3 text-[#8B5CF6]" />
              AI Shield 24/7
            </span>

            <button
              onClick={() => setPersonalTab('profile')}
              className="relative p-0.5 rounded-full ring-2 ring-[#8B5CF6]/50 hover:ring-[#8B5CF6] transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Global Omni-Search Bar */}
        <div className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-inner transition-all">
          <Search className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <input
            type="text"
            placeholder="Pay any contact, merchant UPI ID or biller..."
            onClick={() => setActiveModal('sendMoney')}
            readOnly
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-300 focus:outline-none cursor-pointer"
          />
          <button
            onClick={() => setActiveModal('soundbox')}
            className="p-1 rounded-lg hover:bg-white/10 text-emerald-300"
            title="Voice Command"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cinematic Digital India Horizon Artwork (Bespoke Smart City + Cyber Aurora) */}
      <div className="relative w-full h-40 sm:h-48 mt-2 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 900 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Cyber Aurora Gradient Rays */}
          <path
            d="M 100 0 Q 300 120 500 0 T 900 30 L 900 0 Z"
            fill="url(#aurora-glow)"
            opacity="0.45"
          />

          {/* Twinkling Constellation Stars */}
          <circle cx="140" cy="25" r="1.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="290" cy="18" r="2" fill="#38BDF8" opacity="0.8" />
          <circle cx="480" cy="30" r="2.5" fill="#8B5CF6" opacity="0.95" />
          <circle cx="680" cy="22" r="1.5" fill="#FCD34D" opacity="0.85" />
          <circle cx="820" cy="35" r="2" fill="#FFFFFF" opacity="0.9" />

          {/* Distant Futuristic Tech Towers (Silhouettes) */}
          <rect x="80" y="70" width="48" height="150" rx="3" fill="#0C1D33" />
          <polygon points="104,40 85,70 123,70" fill="#0C1D33" />
          <line x1="104" y1="20" x2="104" y2="40" stroke="#38BDF8" strokeWidth="2" />

          <rect x="150" y="90" width="60" height="130" rx="3" fill="#112948" />
          <rect x="230" y="110" width="75" height="110" rx="3" fill="#0C1D33" />
          <rect x="330" y="80" width="55" height="140" rx="3" fill="#132F4F" />

          {/* High-Tech Glowing Windows */}
          <rect x="92" y="85" width="8" height="12" rx="1.5" fill="#38BDF8" opacity="0.85" />
          <rect x="108" y="85" width="8" height="12" rx="1.5" fill="#FBBF24" opacity="0.75" />
          <rect x="92" y="105" width="8" height="12" rx="1.5" fill="#8B5CF6" opacity="0.9" />
          <rect x="108" y="105" width="8" height="12" rx="1.5" fill="#38BDF8" opacity="0.8" />

          <rect x="165" y="105" width="10" height="14" rx="2" fill="#8B5CF6" opacity="0.8" />
          <rect x="185" y="105" width="10" height="14" rx="2" fill="#F59E0B" opacity="0.9" />
          <rect x="165" y="128" width="10" height="14" rx="2" fill="#38BDF8" opacity="0.8" />
          <rect x="185" y="128" width="10" height="14" rx="2" fill="#8B5CF6" opacity="0.95" />

          {/* Right Skyline Buildings */}
          <rect x="680" y="75" width="65" height="145" rx="3" fill="#0F2845" />
          <polygon points="712,45 690,75 735,75" fill="#0F2845" />
          <circle cx="712.5" cy="42" r="3" fill="#F43F5E" />
          <rect x="765" y="95" width="55" height="125" rx="3" fill="#0C1D33" />

          <rect x="695" y="92" width="10" height="14" rx="2" fill="#38BDF8" opacity="0.8" />
          <rect x="720" y="92" width="10" height="14" rx="2" fill="#FBBF24" opacity="0.9" />
          <rect x="695" y="115" width="10" height="14" rx="2" fill="#8B5CF6" opacity="0.9" />
          <rect x="720" y="115" width="10" height="14" rx="2" fill="#38BDF8" opacity="0.8" />

          {/* Elevated Metro / Vande Bharat Viaduct & Fast Train */}
          <g transform="translate(0, 140)">
            {/* Viaduct Track Beam */}
            <path d="M 0 35 Q 450 15 900 25" stroke="#334155" strokeWidth="6" fill="none" />
            <path d="M 0 32 Q 450 12 900 22" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.8" />
            {/* Viaduct Pillars */}
            <line x1="120" y1="34" x2="120" y2="90" stroke="#1E293B" strokeWidth="8" />
            <line x1="320" y1="28" x2="320" y2="90" stroke="#1E293B" strokeWidth="8" />
            <line x1="560" y1="22" x2="560" y2="90" stroke="#1E293B" strokeWidth="8" />
            <line x1="780" y1="24" x2="780" y2="90" stroke="#1E293B" strokeWidth="8" />

            {/* Aerodynamic Speed Train (Vande Bharat style) */}
            <g transform="translate(380, 8)">
              {/* Train Head */}
              <path d="M 120 16 L 20 16 L 0 24 L 120 24 Z" fill="#F8FAFC" />
              <path d="M 2 23 Q 8 18 25 17 L 120 17 L 120 21 L 10 23 Z" fill="#0284C7" />
              <circle cx="12" cy="21" r="2.5" fill="#FEF08A" />
              <line x1="20" y1="19" x2="115" y2="19" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="6 3" />
            </g>
          </g>

          {/* Smart Street Foreground Ground Wave */}
          <path
            d="M -20 195 Q 300 175 600 185 T 920 180 L 920 240 L -20 240 Z"
            fill="#081423"
          />

          {/* Electric Mobility & Smart Auto-Rickshaw (EV Modernized) */}
          <g transform="translate(480, 168)">
            <rect x="8" y="10" width="36" height="18" rx="4" fill="#0284C7" />
            <path d="M 14 10 L 22 2 L 38 2 L 44 10 Z" fill="#10B981" />
            <rect x="18" y="4" width="18" height="7" rx="1.5" fill="#0F172A" opacity="0.7" />
            {/* EV Badge */}
            <circle cx="10" cy="18" r="2" fill="#A7F3D0" />
            {/* Wheels */}
            <circle cx="16" cy="30" r="6" fill="#020617" stroke="#64748B" strokeWidth="2" />
            <circle cx="38" cy="30" r="6" fill="#020617" stroke="#64748B" strokeWidth="2" />
          </g>

          {/* SmartPay Digital Kiosk & People Figures */}
          <g transform="translate(240, 162)">
            {/* Smart Digital Kiosk */}
            <rect x="35" y="8" width="14" height="28" rx="2" fill="#1E293B" stroke="#8B5CF6" strokeWidth="1.5" />
            <rect x="37" y="11" width="10" height="12" rx="1" fill="#8B5CF6" opacity="0.8" />
            {/* Customer Figure with Phone */}
            <circle cx="22" cy="14" r="5" fill="#FDBA74" />
            <path d="M 18 20 L 26 20 L 28 42 L 16 42 Z" fill="#3B82F6" />
            {/* Smartphone in hand emitting glowing beam to kiosk */}
            <rect x="27" y="22" width="3" height="5" fill="#F8FAFC" />
            <line x1="30" y1="24" x2="35" y2="17" stroke="#34D399" strokeWidth="1.5" strokeDasharray="2 1" />
          </g>

          {/* Stylized Modern Flora / Lotus Tech Element */}
          <g transform="translate(680, 185)">
            <ellipse cx="40" cy="22" rx="20" ry="7" fill="#042F2E" />
            <path d="M 32 20 C 32 12 40 8 40 8 C 40 8 48 12 48 20 Z" fill="#2DD4BF" opacity="0.85" />
            <circle cx="40" cy="14" r="3" fill="#FEF08A" />
          </g>

          <defs>
            <linearGradient id="aurora-glow" x1="100" y1="0" x2="700" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="0.5" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
