import React, { useState } from 'react';
import { Gift, Sparkles, Flame, Copy, Check, Tag, Trophy, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RewardsPage = () => {
  const { rewards, scratchRewardCard, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: SmartCoins + Streak */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#7C3AED] to-[#8B5CF6] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                SmartPay Rewards Club
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {rewards.smartCoins.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-emerald-200">SmartCoins Available</span>
            </div>
            <p className="text-xs text-slate-200 mt-1">
              Worth ₹{Math.floor(rewards.smartCoins / 10)} in cash vouchers & fuel discounts
            </p>
          </div>

          {/* 14 Day Streak Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <Flame className="w-7 h-7 fill-white" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-200">Daily Login Streak</span>
              <h4 className="text-base font-extrabold text-white">14 Days Active 🔥</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scratch Cards */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-sm font-bold text-[#1E1B4B]">Lucky Scratch Cards</h3>
            <p className="text-xs text-[#718096]">Tap any card to scratch and claim your instant reward</p>
          </div>
          <span className="text-xs font-bold text-[#7C3AED]">
            {rewards.scratchCards.filter((c) => !c.unlocked).length} Unscratched
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rewards.scratchCards.map((card) => (
            <div
              key={card.id}
              onClick={() => !card.unlocked && scratchRewardCard(card.id)}
              className={`relative rounded-2xl p-5 border transition-all cursor-pointer ${
                card.unlocked
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 text-[#6222BD]'
                  : 'bg-gradient-to-br from-[#1E1B4B] to-[#173B5E] text-white border-white/10 hover:shadow-lg active:scale-95'
              }`}
            >
              {card.unlocked ? (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Unlocked</span>
                  </div>
                  <h4 className="mt-3 text-base font-extrabold text-[#6222BD]">
                    {card.reward}
                  </h4>
                  <p className="text-xs text-[#7C3AED] mt-1">{card.description}</p>
                  <p className="text-[10px] text-slate-400 mt-3">Credited to SmartPay Wallet</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-yellow-300">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{card.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">{card.description}</p>
                  <div className="mt-4 py-1.5 px-3 rounded-full bg-white/15 text-xs font-bold text-emerald-300 border border-white/20 inline-block">
                    Tap to Scratch ✨
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Local Merchant Offers & Coupons */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-sm font-bold text-[#1E1B4B]">Featured Merchant Coupons</h3>
            <p className="text-xs text-[#718096]">Exclusive discounts on your favourite apps and stores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#1E1B4B] font-extrabold text-xs flex items-center justify-center">
                      {offer.logo}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1E1B4B]">{offer.brand}</h4>
                      <span className="text-[10px] text-[#718096]">{offer.expires}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {offer.discount}
                  </span>
                </div>

                <div className="mt-3 text-xs text-[#718096]">
                  Min Order: <strong className="text-[#1E1B4B]">{offer.minOrder}</strong> • Max Discount: <strong className="text-[#1E1B4B]">{offer.maxDiscount}</strong>
                </div>
              </div>

              {/* Coupon Code Pill with Copy */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-lg border border-dashed border-[#7C3AED]/40">
                  <Tag className="w-3 h-3" />
                  <span>{offer.code}</span>
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E1B4B] hover:text-[#7C3AED]"
                >
                  {copiedCode === offer.code ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
