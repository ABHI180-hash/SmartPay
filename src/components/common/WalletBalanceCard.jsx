import React from 'react';
import { Plus, Eye, Zap, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WalletBalanceCard = ({ isDesktop = false, onAddMoney, onViewDetails }) => {
  const { user } = useApp();

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#6222BD] via-[#752DE0] to-[#8B5CF6] text-white p-6 md:p-7 border border-purple-400/30 shadow-2xl shadow-purple-900/30 transition-all duration-300 hover:shadow-purple-900/40">
      {/* Background Decorative Rings/Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute right-24 -bottom-16 w-48 h-48 rounded-full bg-[#C084FC]/25 blur-2xl" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-purple-200/90">
              Wallet Balance
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
                ₹{(user.walletBalance || 2450.00).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Bonus / UPI Lite Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Bonus ₹125.50</span>
          </div>
        </div>

        {/* Bottom row: Sub-info & Action button */}
        <div className="mt-6 flex items-center justify-between pt-3 border-t border-purple-300/20">
          <div className="flex items-center gap-3 text-xs text-purple-100/90">
            <span className="flex items-center gap-1 font-medium">
              <Zap className="w-3.5 h-3.5 text-yellow-300" /> Offline Cap: ₹500
            </span>
            <span className="hidden sm:inline-block text-purple-300/40">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Bank Grade Safe
            </span>
          </div>

          {/* Action button */}
          {isDesktop ? (
            <button
              onClick={onViewDetails}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#6222BD] text-xs md:text-sm font-extrabold shadow-md hover:bg-purple-50 active:scale-95 transition-transform"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onAddMoney}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#6222BD] text-xs md:text-sm font-extrabold shadow-md hover:bg-purple-50 active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4 stroke-[2.8]" />
              <span>Top-Up</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
