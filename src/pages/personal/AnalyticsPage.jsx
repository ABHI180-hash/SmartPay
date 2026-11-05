import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { monthlySpendingTrend, spendingCategories, topMerchants } from '../../data/mockData';
import { TrendingUp, ArrowDownRight, Wallet, PieChart as PieIcon, Target } from 'lucide-react';

const COLORS = ['#7C3AED', '#8B5CF6', '#3B82F6', '#F59E0B', '#8B5CF6'];

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight">
          Financial Analytics & Budgeting
        </h2>
        <p className="text-xs text-[#718096]">
          AI insights into your expenditure habits, forecasts, and category budgets
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">October Total Spend</span>
          <div className="text-2xl font-extrabold text-[#1E1B4B] mt-1">₹8,450.00</div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% vs Sep
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Average Daily Spend</span>
          <div className="text-2xl font-extrabold text-[#1E1B4B] mt-1">₹281.60</div>
          <span className="text-xs text-[#718096] mt-1 block">Within healthy safe limits</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Budget Remaining</span>
          <div className="text-2xl font-extrabold text-[#8B5CF6] mt-1">₹6,550.00</div>
          <span className="text-xs text-[#718096] mt-1 block">Out of ₹15,000 monthly cap</span>
        </div>
      </div>

      {/* Spending Curves Chart */}
      <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card">
        <h3 className="text-sm font-bold text-[#1E1B4B] mb-4">
          Daily Spending Trend (October 2026)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySpendingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#718096" fontSize={11} />
              <YAxis stroke="#718096" fontSize={11} tickFormatter={(val) => `₹${val}`} />
              <Tooltip
                formatter={(val) => [`₹${val}`, 'Spent']}
                contentStyle={{
                  backgroundColor: '#0B1F3A',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="amount" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown & Budget Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Category Share */}
        <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card">
          <h3 className="text-sm font-bold text-[#1E1B4B] mb-3">Category Distribution</h3>
          <div className="space-y-3">
            {spendingCategories.map((cat, idx) => (
              <div key={cat.name}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#1E1B4B]">{cat.name}</span>
                  <span className="text-[#718096]">
                    ₹{cat.amount.toLocaleString('en-IN')} ({cat.value}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${cat.value}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Management */}
        <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#1E1B4B]">Category Budget Limits</h3>
            <span className="text-xs font-bold text-[#7C3AED]">4 Active Budgets</span>
          </div>

          <div className="space-y-3.5">
            {[
              { cat: 'Dining & Food', used: 2704, cap: 3500, percent: 77 },
              { cat: 'Groceries & Shopping', used: 2028, cap: 4000, percent: 50 },
              { cat: 'Utilities & Bills', used: 1352, cap: 2500, percent: 54 },
              { cat: 'Travel & Commute', used: 1521, cap: 2000, percent: 76 },
            ].map((b) => (
              <div key={b.cat} className="p-3 rounded-xl bg-slate-50 border border-[#EDE9FE]">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>{b.cat}</span>
                  <span className={b.percent > 75 ? 'text-amber-600' : 'text-emerald-600'}>
                    ₹{b.used} / ₹{b.cap} ({b.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      b.percent > 75 ? 'bg-amber-500' : 'bg-[#8B5CF6]'
                    }`}
                    style={{ width: `${b.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
