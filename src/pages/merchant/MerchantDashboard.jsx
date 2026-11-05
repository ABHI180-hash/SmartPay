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
import {
  TrendingUp,
  Users,
  CreditCard,
  AlertCircle,
  ArrowRight,
  Clock,
  Calendar,
  Volume2,
  QrCode,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransactionStatusBadge } from '../../components/common/TransactionCard';

const METHOD_COLORS = ['#7C3AED', '#3B82F6', '#F59E0B', '#8B5CF6'];

export const MerchantDashboard = () => {
  const { merchant, setActiveModal, setMerchantTab, playSoundboxAnnouncement, showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards matching reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Received */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Total Received</span>
          <div className="text-2xl lg:text-3xl font-extrabold text-[#1E1B4B] mt-1 tracking-tight">
            ₹{merchant.totalReceived.toLocaleString('en-IN')}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {merchant.receivedGrowth}
          </span>
        </div>

        {/* Total Transactions */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Total Transactions</span>
          <div className="text-2xl lg:text-3xl font-extrabold text-[#1E1B4B] mt-1 tracking-tight">
            {merchant.totalTransactions}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {merchant.txGrowth}
          </span>
        </div>

        {/* Unique Customers */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Unique Customers</span>
          <div className="text-2xl lg:text-3xl font-extrabold text-[#1E1B4B] mt-1 tracking-tight">
            {merchant.uniqueCustomers}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {merchant.customerGrowth}
          </span>
        </div>

        {/* Pending Dues */}
        <div
          onClick={() => setMerchantTab('khata')}
          className="bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-sm cursor-pointer hover:border-amber-300 transition-colors"
        >
          <span className="text-xs font-semibold text-[#718096]">Pending Dues</span>
          <div className="text-2xl lg:text-3xl font-extrabold text-[#1E1B4B] mt-1 tracking-tight">
            ₹{merchant.pendingDues.toLocaleString('en-IN')}
          </div>
          <span className="text-xs font-semibold text-amber-600 mt-1 block">
            {merchant.pendingCustomersCount} customers
          </span>
        </div>
      </div>

      {/* Middle Grid matching reference image: Payment Overview Bar Chart + Popular Methods Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Payment Overview Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#1E1B4B]">Payment Overview</h3>
              <p className="text-xs text-[#718096]">Daily revenue trends</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                <span className="text-[#1E1B4B]">Received</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="text-[#718096]">Transactions</span>
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={merchant.dailyPayments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#718096" fontSize={11} />
                <YAxis stroke="#718096" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  formatter={(val, name) => [name === 'received' ? `₹${val}` : val, name === 'received' ? 'Received' : 'Count']}
                  contentStyle={{
                    backgroundColor: '#0B1F3A',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="received" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Payment Methods Donut */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-card flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#1E1B4B] mb-2">Popular Payment Methods</h3>

          <div className="w-36 h-36 mx-auto relative my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={merchant.paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={58}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {merchant.paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={METHOD_COLORS[index % METHOD_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-semibold">Dominant</span>
              <span className="text-xs font-bold text-[#7C3AED]">UPI 70%</span>
            </div>
          </div>

          <div className="space-y-1.5 mt-2">
            {merchant.paymentMethods.map((m, idx) => (
              <div key={m.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: METHOD_COLORS[idx % METHOD_COLORS.length] }}
                  />
                  <span className="font-semibold text-[#1E1B4B]">{m.name}</span>
                </div>
                <span className="font-bold text-[#718096]">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid matching reference image: Recent Transactions + Smart Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1E1B4B]">Recent Transactions</h3>
            <button
              onClick={() => setMerchantTab('transactions')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#7C3AED] hover:text-[#6222BD]"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDE9FE] text-[#718096] font-semibold">
                  <th className="pb-2.5">Customer</th>
                  <th className="pb-2.5">Amount</th>
                  <th className="pb-2.5">Payment Method</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {merchant.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3">
                      <span className="font-bold text-[#1E1B4B] block">{tx.customer}</span>
                      <span className="text-[11px] text-[#718096]">{tx.time}</span>
                    </td>
                    <td className="py-3 font-extrabold text-[#1E1B4B]">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-[#1E1B4B] text-[11px]">
                        {tx.method}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <TransactionStatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Smart Insights Card matching reference image */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-card space-y-4">
          <h3 className="text-sm font-bold text-[#1E1B4B]">Smart Insights</h3>

          <div className="space-y-3 text-xs">
            {/* Peak Time */}
            <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#ECE7DD]">
              <span className="text-[#718096] block text-[11px]">Peak Time</span>
              <div className="font-extrabold text-[#1E1B4B] text-sm mt-0.5">
                {merchant.peakHours}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Highest transactions
              </span>
            </div>

            {/* Regular Customers */}
            <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#ECE7DD]">
              <span className="text-[#718096] block text-[11px]">Regular Customers</span>
              <div className="font-extrabold text-[#1E1B4B] text-sm mt-0.5">
                {merchant.regularCustomers}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                {merchant.regularGrowth}
              </span>
            </div>

            {/* Average Transaction */}
            <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#ECE7DD]">
              <span className="text-[#718096] block text-[11px]">Average Transaction</span>
              <div className="font-extrabold text-[#1E1B4B] text-sm mt-0.5">
                ₹{merchant.avgTransaction}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                {merchant.avgGrowth}
              </span>
            </div>

            {/* Best Day */}
            <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#ECE7DD]">
              <span className="text-[#718096] block text-[11px]">Best Day</span>
              <div className="font-extrabold text-[#1E1B4B] text-sm mt-0.5">
                {merchant.bestDay}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Most payments
              </span>
            </div>
          </div>

          {/* Quick Soundbox Trigger */}
          <button
            onClick={() => setActiveModal('soundbox')}
            className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold transition-all shadow-md shadow-[#7C3AED]/20 flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Launch Voice Soundbox</span>
          </button>
        </div>
      </div>
    </div>
  );
};
