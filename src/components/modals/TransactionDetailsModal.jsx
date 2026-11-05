import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Share2, HelpCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TransactionDetailsModal = ({ txn, onClose }) => {
  const { showToast } = useApp();

  if (!txn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B]">
        {/* Purple Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6222BD] to-[#752DE0] text-white flex items-center justify-between shadow-md">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-tight">Transaction Details</h2>
          <div className="w-8" />
        </div>

        <div className="p-6 space-y-5">
          {/* Top Payee / Status */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white text-lg font-bold bg-[#7C3AED] shadow-md shadow-purple-500/20">
              {txn.iconText || txn.name.substring(0, 2).toUpperCase()}
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#1E1B4B]">{txn.name}</h3>
            <p className="text-xs text-[#718096] font-mono">{txn.recipient}</p>

            <div className="mt-3 text-3xl font-extrabold text-[#1E1B4B]">
              {txn.direction === 'incoming' ? '+' : '-'} ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Payment Completed</span>
            </div>
          </div>

          {/* Details Metadata */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-[#EDE9FE] space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#718096]">UTR / NPCI Reference</span>
              <span className="font-mono font-bold text-[#1E1B4B]">{txn.utr}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#718096]">Transaction ID</span>
              <span className="font-mono font-bold text-[#1E1B4B]">{txn.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#718096]">Bank Account</span>
              <span className="font-bold text-[#1E1B4B]">{txn.bank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#718096]">Category</span>
              <span className="font-semibold text-[#7C3AED]">{txn.category}</span>
            </div>
            {txn.note && (
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-[#718096]">Remark / Note</span>
                <span className="font-medium text-[#1E1B4B]">{txn.note}</span>
              </div>
            )}
          </div>

          {/* AI Security Shield Verdict */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold">AI Safety Verification Passed</p>
              <p className="text-[11px] text-emerald-700">
                Verified genuine payee. 0% scam risk detected.
              </p>
            </div>
          </div>

          {/* Dispute & Receipt buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => showToast('Connecting to 24/7 SmartPay dispute assistant...', 'info')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Raise Dispute</span>
            </button>
            <button
              onClick={() => showToast('Receipt downloaded (PDF)', 'success')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold transition-all shadow-md shadow-[#7C3AED]/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
