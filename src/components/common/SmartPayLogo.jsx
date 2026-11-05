import React from 'react';

export const SmartPayLogo = ({
  variant = 'dark', // 'dark' | 'light'
  size = 'md',      // 'sm' | 'md' | 'lg' | 'xl'
  showTagline = false,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Cashly-inspired Multi-Gradient Folded Ribbon Monogram */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Cyan / Mint ribbon segment */}
          <path
            d="M20 32C20 25.3726 25.3726 20 32 20H52V44H32C25.3726 44 20 38.6274 20 32Z"
            fill="url(#ribbon-cyan)"
          />
          {/* Electric Blue vertical ribbon fold */}
          <path
            d="M32 38H56V68C56 74.6274 50.6274 80 44 80H26C22.6863 80 20 77.3137 20 74V50C20 43.3726 25.3726 38 32 38Z"
            fill="url(#ribbon-blue)"
          />
          {/* Electric Violet / Purple folded wing */}
          <path
            d="M52 20H68C74.6274 20 80 25.3726 80 32V50C80 56.6274 74.6274 62 68 62H44V32C44 25.3726 49.3726 20 52 20Z"
            fill="url(#ribbon-purple)"
          />
          {/* Magenta / Pink accent fold */}
          <path
            d="M44 56H68C74.6274 56 80 61.3726 80 68C80 74.6274 74.6274 80 68 80H44V56Z"
            fill="url(#ribbon-pink)"
          />

          <defs>
            <linearGradient id="ribbon-cyan" x1="20" y1="20" x2="52" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00F0FF" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="ribbon-blue" x1="20" y1="38" x2="56" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="ribbon-purple" x1="44" y1="20" x2="80" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="ribbon-pink" x1="44" y1="56" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EC4899" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Modern High-End Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline tracking-tight font-sans">
          <span
            className={`font-black ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-[#1E1B4B]'
            }`}
          >
            SmartPay
          </span>
          <span className="font-black text-xl text-[#8B5CF6] leading-none">.</span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] tracking-widest uppercase font-extrabold ${
              isLight ? 'text-purple-200' : 'text-purple-600'
            }`}
          >
            Pay Smart • Live Secure
          </span>
        )}
      </div>
    </div>
  );
};
