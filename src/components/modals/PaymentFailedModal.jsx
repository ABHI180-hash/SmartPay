import React from 'react';
import { AlertCircle, RefreshCw, Zap, ArrowRight, ShieldX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentFailedModal = ({ onClose }) => {
  const { lastPaymentResult, setActiveModal, executePayment, selectedBank } = useApp();

  const handleRetryWithFallback = () => {
    // Retry using UPI Lite X or alternative bank
    executePayment({
      recipient: lastPaymentResult?.recipient || 'Zomato',
      upiId: lastPaymentResult?.upiId || 'zomato@upi',
      amount: lastPaymentResult?.amount || 250,
      note: 'Retried via SmartPay Fallback Rail',
      bank: selectedBank,
      failureSimulation: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B] p-6 text-center animate-in zoom-in-95 duration-200">
        {/* Failure Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow-lg shadow-red-500/10">
          <AlertCircle className="w-12 h-12 stroke-[2.5]" />
        </div>

        <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-[#1E1B4B] tracking-tight">
          Payment Failed
        </h2>
        <p className="text-xs text-red-600 font-semibold mt-1">
          {lastPaymentResult?.errorReason || "Bank Server Timed Out"}
        </p>

        {/* Amount */}
        <div className="mt-4 p-4 rounded-2xl bg-red-50/50 border border-red-100">
          <span className="text-xs text-[#718096]">Attempted Amount</span>
          <div className="text-3xl font-extrabold text-[#1E1B4B] mt-0.5">
            ₹{parseFloat(lastPaymentResult?.amount || 250).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-[#718096] mt-1">
            Payee: {lastPaymentResult?.recipient || 'Zomato'}
          </p>
        </div>

        {/* Smart Payment Fallback Recommendation Card */}
        <div className="mt-4 p-4 rounded-2xl bg-[#EDE9FE] text-left border border-[#8B5CF6]/30">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#7C3AED]" />
            <h4 className="text-xs font-bold text-[#6222BD]">
              Smart Fallback Available
            </h4>
          </div>
          <p className="text-xs text-[#7C3AED] mt-1 leading-relaxed">
            NPCI UPI rail is currently overloaded. SmartPay can instantly route this payment via{' '}
            <strong className="text-[#6222BD]">UPI Lite X (Offline Rail)</strong> with zero bank latency.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2">
          <button
            onClick={handleRetryWithFallback}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#6222BD] to-[#8B5CF6] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-[#7C3AED]/30 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry with UPI Lite X Fallback</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full border border-[#EDE9FE] text-[#718096] hover:bg-slate-50 text-xs font-bold transition-colors"
          >
            Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );
};
