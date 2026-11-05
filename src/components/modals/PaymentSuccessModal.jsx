import React, { useEffect } from 'react';
import { CheckCircle2, Download, Share2, ArrowRight, ShieldCheck, Fingerprint, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const PaymentSuccessModal = ({ onClose }) => {
  const { lastPaymentResult, showToast } = useApp();

  useEffect(() => {
    // Fire confetti celebration in purple & gold
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#8B5CF6', '#C084FC', '#F59E0B'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleDownloadReceipt = () => {
    showToast('Receipt downloaded successfully (PDF)', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SmartPay Payment Receipt',
        text: `Paid ₹${lastPaymentResult?.amount} to ${lastPaymentResult?.name} via SmartPay. UTR: ${lastPaymentResult?.utr}`,
      }).catch(() => {});
    } else {
      showToast('Receipt link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B] p-6 text-center animate-in zoom-in-95 duration-200 border border-purple-100">
        {/* Animated Checkmark Icon in Cashly Purple */}
        <div className="mx-auto w-20 h-20 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-500/20 animate-bounce border-2 border-purple-200">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <h2 className="mt-4 text-xl sm:text-2xl font-black text-[#1E1B4B] tracking-tight">
          Payment Successful!
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Your payment has been securely routed via SmartPay
        </p>

        {/* Amount */}
        <div className="mt-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
          <span className="text-xs font-semibold text-slate-400 uppercase">Amount Paid</span>
          <div className="mt-1 text-3xl sm:text-4xl font-black text-[#1E1B4B] font-sans">
            ₹{parseFloat(lastPaymentResult?.amount || 250).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="mt-1 text-xs font-bold text-[#7C3AED]">
            Paid to {lastPaymentResult?.name || 'Robin Jessy'}
          </p>

          {/* Authorization Method Pill */}
          <div className="mt-2.5 flex justify-center">
            {lastPaymentResult?.authMethod === 'biometric' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 shadow-xs">
                <Fingerprint className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Authorized via 1-Touch Biometric Sensor</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#7C3AED] text-[11px] font-bold border border-purple-200 shadow-xs">
                <Lock className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>Authorized via 4-Digit Secret UPI PIN</span>
              </span>
            )}
          </div>
        </div>

        {/* Details Table */}
        <div className="mt-4 space-y-2 text-left text-xs bg-white rounded-2xl p-3 border border-purple-100">
          <div className="flex justify-between py-1 border-b border-purple-50">
            <span className="text-slate-400">Transaction ID</span>
            <span className="font-mono font-bold text-[#1E1B4B]">{lastPaymentResult?.id || 'TXN-9842'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-purple-50">
            <span className="text-slate-400">Bank UTR</span>
            <span className="font-mono font-bold text-[#1E1B4B]">{lastPaymentResult?.utr || 'UPI/3948291039'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-purple-50">
            <span className="text-slate-400">Debited From</span>
            <span className="font-bold text-[#1E1B4B]">{lastPaymentResult?.bank || 'HDFC Bank •••• 7382'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Date & Time</span>
            <span className="font-medium text-[#1E1B4B]">{new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Reward pill */}
        <div className="mt-3 flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
          <span>🎉 You earned +12 SmartCoins on this transaction!</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-purple-200 hover:bg-purple-50 text-xs font-bold text-[#1E1B4B] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-purple-200 hover:bg-purple-50 text-xs font-bold text-[#1E1B4B] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-3.5 rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] hover:brightness-105 text-white text-sm font-extrabold shadow-lg shadow-purple-500/30 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};
