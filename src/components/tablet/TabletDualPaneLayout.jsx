import React from 'react';
import {
  QrCode,
  Send,
  ArrowDownLeft,
  ShieldCheck,
  Zap,
  Users,
  Sparkles,
  ArrowRight,
  Receipt,
  BookOpen,
  Gift,
  BarChart3,
  User,
  Settings
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartPayLogo } from '../common/SmartPayLogo';
import { WalletBalanceCard } from '../common/WalletBalanceCard';
import { SpendingChart } from '../common/SpendingChart';
import { TransactionCard } from '../common/TransactionCard';
import { quickContacts } from '../../data/mockData';

export const TabletDualPaneLayout = () => {
  const {
    user,
    transactions,
    setActiveModal,
    setSelectedTxn,
    setPersonalTab,
    personalTab,
    selectedBank,
  } = useApp();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
      {/* LEFT PANEL (col-span-5): Logo, Nav shortcuts, Camera QR Scanner, Quick Actions, Quick Contacts */}
      <div className="md:col-span-5 space-y-4">
        {/* Left Header Card */}
        <div className="bg-gradient-to-br from-[#04261F] via-[#063B2F] to-[#0A5443] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-emerald-400/25">
          <SmartPayLogo variant="light" size="md" showTagline={true} />

          {/* Quick Pay Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <button
              onClick={() => setActiveModal('scanPay')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
            >
              <QrCode className="w-5 h-5 text-emerald-300" />
              <span className="text-[11px] font-bold text-white mt-1">Scan QR</span>
            </button>

            <button
              onClick={() => setActiveModal('sendMoney')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
            >
              <Send className="w-5 h-5 text-emerald-300" />
              <span className="text-[11px] font-bold text-white mt-1">Send</span>
            </button>

            <button
              onClick={() => setActiveModal('receiveMoney')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
            >
              <ArrowDownLeft className="w-5 h-5 text-emerald-300" />
              <span className="text-[11px] font-bold text-white mt-1">Receive</span>
            </button>
          </div>
        </div>

        {/* QR Scanner Shortcut Viewfinder */}
        <div
          onClick={() => setActiveModal('scanPay')}
          className="relative bg-black/90 text-white rounded-2xl p-5 border border-emerald-500/30 overflow-hidden cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-4 h-4" /> Live Camera Scanner
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              Tap to Scan
            </span>
          </div>

          <div className="h-28 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden">
            <div className="w-20 h-20 border-2 border-emerald-400 rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-slate-400">Aim QR</span>
            </div>
            <div className="absolute left-2 right-2 h-0.5 bg-emerald-400 shadow-[0_0_8px_#8B5CF6] animate-scan-line" />
          </div>
        </div>

        {/* Quick Contacts */}
        <div className="bg-white rounded-2xl p-4 border border-[#EDE9FE] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
              Frequent Contacts
            </h4>
            <span className="text-[11px] text-[#7C3AED] font-bold">Direct UPI</span>
          </div>

          <div className="space-y-2">
            {quickContacts.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setActiveModal('sendMoney');
                }}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#1E1B4B]">{c.name}</h5>
                    <p className="text-[10px] text-[#718096] font-mono">{c.upi}</p>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 text-[#7C3AED]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (col-span-7): Wallet Balance, Analytics, Charts, Recent Txns, AI Insights */}
      <div className="md:col-span-7 space-y-4">
        {/* Wallet Balance Card */}
        <WalletBalanceCard
          isDesktop={true}
          onAddMoney={() => setActiveModal('addMoney')}
          onViewDetails={() => setPersonalTab('analytics')}
        />

        {/* Monthly Spending Donut */}
        <SpendingChart onViewFullAnalytics={() => setPersonalTab('analytics')} />

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-[#1E1B4B]">Recent Transactions</h4>
            <button
              onClick={() => setPersonalTab('transactions')}
              className="text-xs font-bold text-[#7C3AED] hover:underline"
            >
              See All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.slice(0, 4).map((txn) => (
              <TransactionCard
                key={txn.id}
                txn={txn}
                onClick={(item) => {
                  setSelectedTxn(item);
                  setActiveModal('txnDetails');
                }}
              />
            ))}
          </div>
        </div>

        {/* AI Financial Insights snippet */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#6222BD] to-[#8B5CF6] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">SmartPay AI Insight</h5>
              <p className="text-[11px] text-emerald-100">
                You saved ₹420 this month by using UPI Lite X for micro-payments!
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('aiChat')}
            className="px-3 py-1.5 rounded-full bg-white text-[#6222BD] text-xs font-bold hover:bg-emerald-50"
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};
