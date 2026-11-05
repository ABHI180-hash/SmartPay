import React, { useState } from 'react';
import { Zap, WifiOff, Smartphone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UpiLiteXPage = () => {
  const { user, setUser, executePayment, showToast, selectedBank } = useApp();
  const [offlineSimulating, setOfflineSimulating] = useState(false);
  const [offlineSuccess, setOfflineSuccess] = useState(false);

  const handleSimulateOfflineTap = () => {
    setOfflineSimulating(true);
    setOfflineSuccess(false);

    setTimeout(() => {
      setOfflineSimulating(false);
      setOfflineSuccess(true);
      executePayment({
        recipient: 'Metro Station Turnstile',
        upiId: 'dmrc.offline@smartpay',
        amount: 32.00,
        note: 'UPI Lite X Offline Gate Tap',
        bank: { name: 'UPI Lite X (Offline Vault)', accountNumber: 'On-Device Secure Element' },
      });
      showToast('Offline payment of ₹32.00 completed via NFC!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight">
          UPI Lite X – Offline Payments
        </h2>
        <p className="text-xs text-[#718096]">
          Pay even without internet or cellular connectivity using on-device encrypted NFC rails
        </p>
      </div>

      {/* Main Feature Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#6222BD] to-[#8B5CF6] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>NPCI Certified • Hardware Encrypted</span>
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pay at Zero Connectivity
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mt-1.5 leading-relaxed">
              Whether you are inside an underground metro tunnel, a remote village, or experiencing network downtime, SmartPay UPI Lite X lets you tap and pay instantly without entering a UPI PIN.
            </p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-xs font-medium text-emerald-200">On-Device Offline Balance:</span>
              <span className="text-2xl font-extrabold text-white">₹{user.upiLiteXBalance.toFixed(2)}</span>
            </div>
          </div>

          {/* Interactive Simulation Button */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center w-full md:w-64">
            <WifiOff className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Offline NFC Simulator
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 mb-4">
              Simulates a contactless metro or grocery tap with zero WiFi/4G
            </p>
            <button
              onClick={handleSimulateOfflineTap}
              disabled={offlineSimulating}
              className="w-full py-2.5 px-4 rounded-full bg-white text-[#0B1F3A] hover:bg-emerald-50 text-xs font-extrabold shadow-lg transition-transform active:scale-95 disabled:opacity-50"
            >
              {offlineSimulating ? 'Simulating Offline Handshake...' : 'Simulate Offline Tap (₹32)'}
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#EDE9FE] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold mb-3">
            01
          </div>
          <h4 className="text-sm font-bold text-[#1E1B4B]">Zero Failure Rate</h4>
          <p className="text-xs text-[#718096] mt-1">
            Bypasses the traditional bank CBS server. Transactions settle instantly on your local encrypted enclave.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EDE9FE] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold mb-3">
            02
          </div>
          <h4 className="text-sm font-bold text-[#1E1B4B]">No PIN Required</h4>
          <p className="text-xs text-[#718096] mt-1">
            Fast transactions under ₹500 for transit turnstiles, toll plazas, parking, and daily tea & snacks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EDE9FE] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold mb-3">
            03
          </div>
          <h4 className="text-sm font-bold text-[#1E1B4B]">Auto-Recharge Vault</h4>
          <p className="text-xs text-[#718096] mt-1">
            When balance falls below ₹100, your offline vault auto-replenishes from your linked HDFC Bank account when online.
          </p>
        </div>
      </div>
    </div>
  );
};
