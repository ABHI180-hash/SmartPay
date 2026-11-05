import React, { useState } from 'react';
import { ArrowLeft, Copy, Share2, Download, Check, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReceiveMoneyModal = ({ onClose }) => {
  const { user, selectedBank, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const qrUrl = customAmount && parseFloat(customAmount) > 0
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${user.upiId}&pn=${encodeURIComponent(user.name)}&am=${customAmount}&cu=INR`
    : `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${user.upiId}&pn=${encodeURIComponent(user.name)}&cu=INR`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(user.upiId);
    setCopied(true);
    showToast('UPI ID copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B] text-center">
        {/* Purple Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6222BD] to-[#752DE0] text-white flex items-center justify-between shadow-md">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-tight">Receive Money</h2>
          <div className="w-8" />
        </div>

        <div className="p-6 space-y-5">
          {/* QR Code Container */}
          <div className="inline-block p-4 bg-white rounded-3xl border-2 border-[#7C3AED]/30 shadow-xl">
            <img
              src={qrUrl}
              alt="Receive Money QR"
              className="w-44 h-44 mx-auto object-contain"
            />
            {customAmount && parseFloat(customAmount) > 0 && (
              <span className="mt-2 block text-xs font-bold text-[#7C3AED]">
                Amount: ₹{parseFloat(customAmount).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#1E1B4B]">{user.name}</h3>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-xs font-mono font-bold text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
                {user.upiId}
              </span>
              <button
                onClick={handleCopyUpi}
                className="p-1 rounded-full hover:bg-slate-100 text-[#718096] transition-colors"
                title="Copy UPI ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-[#718096] mt-2">
              Credited directly to {selectedBank?.name || 'Primary Bank Account'} ({selectedBank?.accountNumber || '•••• 5543'})
            </p>
          </div>

          {/* Optional Amount input */}
          <div className="text-left bg-slate-50 p-3.5 rounded-2xl border border-[#EDE9FE]">
            <label className="block text-xs font-semibold text-[#718096] mb-1">
              Add Specific Amount to QR (Optional)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1E1B4B]">₹</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="e.g. 500"
                className="w-full bg-white px-3 py-1.5 rounded-lg border border-[#EDE9FE] text-xs font-bold focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => showToast('QR Code saved to gallery', 'success')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#EDE9FE] hover:bg-slate-50 text-xs font-bold text-[#1E1B4B] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Save QR</span>
            </button>
            <button
              onClick={handleCopyUpi}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/30 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
