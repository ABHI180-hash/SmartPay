import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Building2,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { adminMetrics } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const AdminDashboard = () => {
  const { showToast } = useApp();
  const [metrics, setMetrics] = useState(adminMetrics);

  const handleResolve = (ticketId) => {
    setMetrics((prev) => ({
      ...prev,
      supportTickets: prev.supportTickets.map((t) =>
        t.id === ticketId ? { ...t, status: 'Resolved' } : t
      ),
    }));
    showToast(`Ticket ${ticketId} resolved successfully`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              SmartPay Central Command
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight mt-0.5">
            Platform Operations & Risk Radar
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            System Uptime: {metrics.systemHealth}%
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            Current TPS: {metrics.averageTps}
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Total Processed Volume</span>
          <div className="text-2xl font-extrabold text-[#1E1B4B] mt-1">{metrics.totalProcessedVolume}</div>
          <span className="text-xs font-semibold text-emerald-600 mt-1 block">
            {metrics.totalVolumeGrowth} MoM
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Active Verified Users</span>
          <div className="text-2xl font-extrabold text-[#1E1B4B] mt-1">{metrics.activeUsers}</div>
          <span className="text-xs font-semibold text-emerald-600 mt-1 block">
            {metrics.activeUsersGrowth} active this week
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-sm">
          <span className="text-xs font-semibold text-[#718096]">Onboarded Merchants</span>
          <div className="text-2xl font-extrabold text-[#1E1B4B] mt-1">{metrics.activeMerchants}</div>
          <span className="text-xs font-semibold text-emerald-600 mt-1 block">
            {metrics.merchantsGrowth} adoption
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-red-200 bg-red-50/20 shadow-sm">
          <span className="text-xs font-bold text-red-600 uppercase">AI Fraud Prevented</span>
          <div className="text-2xl font-extrabold text-red-700 mt-1">
            {metrics.fraudPreventedAmount}
          </div>
          <span className="text-xs font-semibold text-red-600 mt-1 block">
            {metrics.fraudIncidentsStopped} malicious attempts blocked
          </span>
        </div>
      </div>

      {/* Real-time Infrastructure Rails */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1E1B4B] text-white rounded-2xl p-5 shadow-lg border border-white/10">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
          NPCI Financial Rails Health
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-300">UPI 2.0 Rail</span>
            <div className="text-sm font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{metrics.upiRailStatus}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-300">IMPS Rail</span>
            <div className="text-sm font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{metrics.impsRailStatus}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-300">UPI Lite X Offline</span>
            <div className="text-sm font-bold text-yellow-300 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span>{metrics.offlineLiteXSyncs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transaction Stream with Risk Radar */}
      <div className="bg-white rounded-2xl border border-[#EDE9FE] shadow-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#EDE9FE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="text-sm font-bold text-[#1E1B4B]">
              Live Real-Time Transactions & AI Risk Scoring
            </h3>
          </div>
          <span className="text-xs text-[#718096]">Auto-refreshing 500ms</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EDE9FE] text-[#718096] bg-slate-50">
                <th className="py-2.5 px-4">TXN ID</th>
                <th className="py-2.5 px-4">Sender / Recipient</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Rail</th>
                <th className="py-2.5 px-4">AI Risk Radar</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metrics.liveTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#1E1B4B]">{tx.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#1E1B4B] block">{tx.user}</span>
                    <span className="text-[11px] text-[#718096]">→ {tx.merchant}</span>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-[#1E1B4B]">{tx.amount}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[11px]">
                      {tx.rail}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        tx.riskScore > 50
                          ? 'bg-red-100 text-red-700 animate-pulse'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {tx.riskScore > 50 ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      Score: {tx.riskScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        tx.status.includes('BLOCKED')
                          ? 'bg-red-600 text-white'
                          : 'bg-[#EDE9FE] text-[#8B5CF6]'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support & Grievance Desk */}
      <div className="bg-white rounded-2xl border border-[#EDE9FE] shadow-card p-5">
        <h3 className="text-sm font-bold text-[#1E1B4B] mb-3">Priority Grievance Queue</h3>
        <div className="space-y-2.5">
          {metrics.supportTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-3.5 rounded-xl border border-[#EDE9FE] bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#1E1B4B]">{ticket.id}</span>
                  <span className="font-bold text-[#1E1B4B]">• {ticket.user}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ticket.priority === 'Urgent'
                        ? 'bg-red-100 text-red-700'
                        : ticket.priority === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-[#718096] mt-1">{ticket.issue}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="font-semibold text-slate-500 text-[11px]">{ticket.status}</span>
                {ticket.status !== 'Resolved' && (
                  <button
                    onClick={() => handleResolve(ticket.id)}
                    className="px-3 py-1 rounded-lg bg-[#7C3AED] text-white font-bold hover:bg-[#6222BD] transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
