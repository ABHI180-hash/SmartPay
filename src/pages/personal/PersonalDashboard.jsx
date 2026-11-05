import React from 'react';
import {
  QrCode,
  Send,
  ArrowDownLeft,
  ShieldCheck,
  Receipt,
  Tv,
  Smartphone,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Zap,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WalletBalanceCard } from '../../components/common/WalletBalanceCard';
import { QuickActionButton } from '../../components/common/QuickActionButton';
import { SecurityAlertCard } from '../../components/common/SecurityAlertCard';
import { SpendingChart } from '../../components/common/SpendingChart';
import { TopMerchantsCard } from '../../components/common/TopMerchantsCard';
import { TransactionCard } from '../../components/common/TransactionCard';

export const PersonalDashboard = () => {
  const {
    transactions,
    setActiveModal,
    setSelectedTxn,
    setPersonalTab,
    user,
  } = useApp();

  const handleTxnClick = (txn) => {
    setSelectedTxn(txn);
    setActiveModal('txnDetails');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Grid: Available Balance Card + Monthly Spending Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Available Balance Card (matches reference image) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <WalletBalanceCard
            isDesktop={true}
            onAddMoney={() => setActiveModal('addMoney')}
            onViewDetails={() => setPersonalTab('analytics')}
          />
        </div>

        {/* Right Monthly Spending Card with Donut Chart (matches reference image) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <SpendingChart onViewFullAnalytics={() => setPersonalTab('analytics')} />
        </div>
      </div>

      {/* Middle Grid: Quick Actions + AI Scam Shield Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Quick Actions Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-card">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">
              Quick Actions
            </h3>
            <span className="text-xs font-semibold text-[#7C3AED]">Instant 0% Fee</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <QuickActionButton
              icon={QrCode}
              label="Scan & Pay"
              onClick={() => setActiveModal('scanPay')}
            />
            <QuickActionButton
              icon={Send}
              label="Send Money"
              onClick={() => setActiveModal('sendMoney')}
            />
            <QuickActionButton
              icon={ArrowDownLeft}
              label="Receive"
              onClick={() => setActiveModal('receiveMoney')}
            />
            <QuickActionButton
              icon={Receipt}
              label="Bill Pay"
              onClick={() => setPersonalTab('payments')}
            />
            <QuickActionButton
              icon={Tv}
              label="Fastag/TV"
              onClick={() => setPersonalTab('payments')}
            />
            <QuickActionButton
              icon={Smartphone}
              label="Recharge"
              onClick={() => setPersonalTab('payments')}
            />
          </div>
        </div>

        {/* AI Scam Shield Banner (matches reference image) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <SecurityAlertCard onLearnMore={() => setActiveModal('scamCheck')} />
          
          {/* UPI Lite X Offline Quick Status Banner */}
          <div
            onClick={() => setPersonalTab('upilite')}
            className="mt-3 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between cursor-pointer hover:bg-purple-100/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center">
                <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#6222BD]">
                  UPI Lite X: Offline Ready
                </h4>
                <p className="text-[11px] text-[#7C3AED]">
                  Tap & pay even when there is no internet coverage
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#6222BD]" />
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Transactions Table + Top Merchants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Recent Transactions List (matches reference image) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#E9D5FF] shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-[#1E1B4B]">Recent Transactions</h3>
              <p className="text-xs text-[#718096]">Updated in real-time</p>
            </div>
            <button
              onClick={() => setPersonalTab('transactions')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#7C3AED] hover:text-[#6222BD]"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.slice(0, 5).map((txn) => (
              <TransactionCard
                key={txn.id}
                txn={txn}
                onClick={handleTxnClick}
              />
            ))}
          </div>
        </div>

        {/* Top Merchants (matches reference image) */}
        <div className="lg:col-span-5">
          <TopMerchantsCard onSeeAll={() => setPersonalTab('analytics')} />
        </div>
      </div>
    </div>
  );
};
