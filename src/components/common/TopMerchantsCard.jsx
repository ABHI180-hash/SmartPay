import React from 'react';
import { topMerchants } from '../../data/mockData';
import { ArrowRight, Store, ArrowUpRight } from 'lucide-react';

export const TopMerchantsCard = ({ onSeeAll }) => {
  const merchantMeta = {
    Zomato: { category: 'Food & Dining', orders: '8 orders' },
    Dmart: { category: 'Supermarket & Retail', orders: '2 visits' },
    Amazon: { category: 'Online Shopping', orders: '3 purchases' },
    Swiggy: { category: 'Food & Gourmet', orders: '4 orders' },
  };

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#E9D5FF] shadow-[0_4px_20px_rgba(16,43,79,0.04)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#1E1B4B]">Top Merchants</h3>
            <p className="text-[11px] text-[#718096]">Highest monthly spend</p>
          </div>
          <button
            onClick={onSeeAll}
            className="inline-flex items-center gap-1 text-xs font-extrabold text-[#7C3AED] hover:text-[#6222BD]"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {topMerchants.map((merchant) => {
            const meta = merchantMeta[merchant.name] || { category: 'Retail', orders: 'Verified' };
            return (
              <div
                key={merchant.name}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] hover:border-[#7C3AED] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm flex-shrink-0"
                    style={{ backgroundColor: merchant.color }}
                  >
                    {merchant.logo}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1E1B4B] group-hover:text-[#7C3AED] transition-colors">
                      {merchant.name}
                    </h4>
                    <span className="text-[10px] text-[#718096]">
                      {meta.category} • {meta.orders}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#1E1B4B] block">
                    ₹{merchant.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    Auto-settled
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#718096]">
        <span>4 Active Merchants</span>
        <span className="font-bold text-[#7C3AED]">Cashback Eligible ✨</span>
      </div>
    </div>
  );
};
