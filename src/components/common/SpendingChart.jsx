import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowRight,
  Utensils,
  ShoppingBag,
  Plane,
  Zap,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'food',
    name: 'Food & Dining',
    shortName: 'Food',
    value: 32,
    amount: 2704,
    color: '#0E7490', // Deep Cyan / Teal
    gradient: ['#0E7490', '#06B6D4'],
    icon: Utensils,
    transactions: '14 orders (Zomato, Swiggy)',
  },
  {
    id: 'shopping',
    name: 'Shopping & Retail',
    shortName: 'Shopping',
    value: 24,
    amount: 2028,
    color: '#7C3AED', // SmartPay Primary Teal
    gradient: ['#7C3AED', '#8B5CF6'],
    icon: ShoppingBag,
    transactions: '5 purchases (Amazon, Blinkit)',
  },
  {
    id: 'travel',
    name: 'Travel & Transit',
    shortName: 'Travel',
    value: 18,
    amount: 1521,
    color: '#8B5CF6', // Emerald
    gradient: ['#8B5CF6', '#34D399'],
    icon: Plane,
    transactions: 'Uber & Metro Smart Card',
  },
  {
    id: 'bills',
    name: 'Bills & Utilities',
    shortName: 'Bills',
    value: 16,
    amount: 1352,
    color: '#D97706', // Warm Amber Gold
    gradient: ['#D97706', '#FBBF24'],
    icon: Zap,
    transactions: 'BESCOM Electricity & WiFi',
  },
  {
    id: 'others',
    name: 'Entertainment & Misc',
    shortName: 'Others',
    value: 10,
    amount: 845,
    color: '#7C3AED', // Violet
    gradient: ['#7C3AED', '#A78BFA'],
    icon: Sparkles,
    transactions: 'Netflix & BookMyShow',
  },
];

export const SpendingChart = ({ onViewFullAnalytics }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [timeRange, setTimeRange] = useState('OCT_2026'); // 'OCT_2026' | 'SEP_2026'

  const totalSpent = timeRange === 'OCT_2026' ? 8450 : 7520;
  const monthlyCap = 15000;
  const remaining = monthlyCap - totalSpent;
  const budgetPercent = Math.round((totalSpent / monthlyCap) * 100);

  // SVG Donut calculation with gaps
  const size = 180;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const arcs = CATEGORIES.map((cat) => {
    const strokeDasharray = `${(cat.value / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += cat.value;
    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const highlightedData = activeCategory !== null ? CATEGORIES[activeCategory] : null;

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#E9D5FF] shadow-[0_4px_24px_rgba(16,43,79,0.05)] transition-all flex flex-col justify-between">
      {/* 1. Header with Period Tag & Month-over-Month Delta */}
      <div>
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-[#718096] uppercase tracking-wider">
                Monthly Spending
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F3FF] text-[#1E1B4B] border border-[#E9D5FF]">
                <Calendar className="w-3 h-3 text-[#7C3AED]" />
                October 2026
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight font-sans">
                ₹{totalSpent.toLocaleString('en-IN')}<span className="text-lg font-bold text-slate-400">.00</span>
              </span>
            </div>
          </div>

          {/* Delta Pill */}
          <div className="flex flex-col items-end">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-extrabold shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>+12.4% vs Sep</span>
            </div>
            <span className="text-[10px] text-[#718096] font-medium mt-1">Auto-Categorized</span>
          </div>
        </div>

        {/* 2. Visual Donut + Interactive Category Rows */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Custom Precision SVG Donut Ring with Rounded Gap Styling */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0 flex items-center justify-center">
            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Background circle track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={strokeWidth}
              />

              {/* Category Segments */}
              {arcs.map((arc, index) => {
                const isHovered = activeCategory === index;
                const isAnyHovered = activeCategory !== null;
                const opacity = isHovered || !isAnyHovered ? 1 : 0.35;
                const strokeW = isHovered ? strokeWidth + 2 : strokeWidth;

                return (
                  <circle
                    key={arc.id}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={strokeW}
                    strokeDasharray={arc.strokeDasharray}
                    strokeDashoffset={arc.strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setActiveCategory(index)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                );
              })}
            </svg>

            {/* Central Metric Badge */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <span className="text-[10px] text-[#718096] font-bold uppercase tracking-widest">
                {highlightedData ? highlightedData.shortName : 'Total Outflow'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#1E1B4B] tracking-tight mt-0.5 font-sans">
                ₹{highlightedData ? highlightedData.amount.toLocaleString('en-IN') : '8,450'}
              </span>
              <span className="text-[10px] font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full mt-1 border border-[#8B5CF6]/20">
                {highlightedData ? `${highlightedData.value}% of total` : 'Within Budget'}
              </span>
            </div>
          </div>

          {/* Category Breakdown Rows with Micro Progress Bars */}
          <div className="flex-1 w-full space-y-2">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isHovered = activeCategory === idx;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(idx)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`p-2 sm:p-2.5 rounded-2xl transition-all cursor-pointer ${
                    isHovered
                      ? 'bg-[#F5F3FF] shadow-sm border border-[#E9D5FF]'
                      : 'hover:bg-slate-50/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs"
                        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                      >
                        <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                      <div className="truncate">
                        <span className="font-extrabold text-[#1E1B4B] block truncate">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-[#718096] font-medium block truncate">
                          {cat.transactions}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-right flex-shrink-0 pl-2">
                      <span className="font-mono font-bold text-[#1E1B4B] text-xs">
                        ₹{cat.amount.toLocaleString('en-IN')}
                      </span>
                      <span
                        className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md min-w-[34px] text-center"
                        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                      >
                        {cat.value}%
                      </span>
                    </div>
                  </div>

                  {/* Micro Progress Track */}
                  <div className="mt-1.5 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${cat.value}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Monthly Cap Utilization Bar */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-[#718096] mb-1.5">
            <span className="font-semibold">
              Monthly Budget Cap: <strong className="text-[#1E1B4B]">₹15,000</strong>
            </span>
            <span className="font-extrabold text-[#8B5CF6]">
              ₹{remaining.toLocaleString('en-IN')} Remaining ({100 - budgetPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#1E1B4B] rounded-full transition-all duration-500"
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Footer CTA Action */}
      {onViewFullAnalytics && (
        <button
          onClick={onViewFullAnalytics}
          className="w-full mt-4 py-2.5 rounded-2xl bg-[#F5F3FF] hover:bg-[#F4F1EA] border border-[#E9D5FF] flex items-center justify-center gap-2 text-xs font-extrabold text-[#7C3AED] hover:text-[#6222BD] transition-all active:scale-[0.99] group shadow-xs"
        >
          <span>View Detailed Category Analytics & Statement</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};
