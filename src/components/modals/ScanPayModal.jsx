import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Info,
  CheckCircle2,
  Edit2,
  MoreHorizontal,
  Plus,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScanPayModal = ({ onClose }) => {
  const { selectedBank, setPendingPayment, setActiveModal } = useApp();

  const [amount, setAmount] = useState('500.00');
  const [selectedMethod, setSelectedMethod] = useState('hdfc');

  const payee = {
    name: 'Robin Jessy',
    upiId: 'paytmqr1wdw1qsy4q@paytm',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    accountMasked: '******7382',
  };

  const handlePay = () => {
    setPendingPayment({
      recipient: payee.name,
      upiId: payee.upiId,
      amount: parseFloat(amount) || 500.00,
      note: 'Payment to Robin Jessy via QR',
      bank: selectedBank || { name: 'HDFC Bank', accountNumber: '*** 4263' },
      category: 'Dining',
    });
    setActiveModal('confirmPayment');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full sm:h-auto sm:max-h-[94vh] bg-[#FAF8FF] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B] border border-purple-100">
        {/* Header matching Reference Screen 3 */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-purple-100 bg-white">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-[#1E1B4B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">QR Payment</h2>
          <button
            className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-[#7C3AED] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body matching Reference Screen 3 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 1. QR Code Scan Card */}
          <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-card">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-[#1E1B4B]">QR Code Scan</span>
              <button className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1">
                <span>View details</span>
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Left: QR Code Box */}
              <div className="w-24 h-24 p-2 bg-white rounded-2xl border-2 border-purple-100 shadow-xs flex items-center justify-center flex-shrink-0">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=paytmqr1wdw1qsy4q@paytm&pn=Robin+Jessy&am=500.00&cu=INR"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right: Total Amount + Bank info */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">Total Amount</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Secured
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#1E1B4B]">
                    ₹{amount}
                  </span>
                  <button
                    onClick={() => {
                      const newAmt = prompt('Enter payment amount (₹):', amount);
                      if (newAmt && !isNaN(parseFloat(newAmt))) setAmount(parseFloat(newAmt).toFixed(2));
                    }}
                    className="p-1 text-[#7C3AED] hover:bg-purple-50 rounded-lg transition-colors"
                    title="Edit Amount"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-4 h-4 rounded bg-rose-600 text-white flex items-center justify-center text-[9px] font-black">
                    H
                  </span>
                  <span>Account Info</span>
                  <span className="font-mono font-bold text-[#1E1B4B]">{payee.accountMasked}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Payee Profile Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-purple-100 shadow-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={payee.avatar}
                alt={payee.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-purple-100 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                    {payee.name}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] fill-[#7C3AED] text-white" />
                </div>
                <p className="text-[11px] text-slate-400 font-mono truncate max-w-[160px] sm:max-w-xs">
                  {payee.upiId}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-extrabold text-[#1E1B4B]">
                ₹{amount}
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Secured
              </span>
            </div>
          </div>

          {/* 3. Recommended Payment Method (Electric Purple Active Card) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-xs font-bold text-[#1E1B4B]">Recommended</span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Purple Card matching Reference Screen 3 */}
            <div
              onClick={() => setSelectedMethod('hdfc')}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                selectedMethod === 'hdfc'
                  ? 'bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white border border-purple-100 text-[#1E1B4B]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black text-xs shadow-xs">
                  H
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-extrabold ${selectedMethod === 'hdfc' ? 'text-white' : 'text-[#1E1B4B]'}`}>
                    HDFC Bank
                  </h4>
                  <p className={`text-[11px] ${selectedMethod === 'hdfc' ? 'text-purple-200' : 'text-slate-400'}`}>
                    *** 4263 <span className="font-bold">UPI</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${selectedMethod === 'hdfc' ? 'text-white' : 'text-[#1E1B4B]'}`}>
                  ₹{amount}
                </span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  selectedMethod === 'hdfc' ? 'bg-white text-[#7C3AED]' : 'border-2 border-slate-300'
                }`}>
                  {selectedMethod === 'hdfc' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Bank Accounts list */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-xs font-bold text-[#1E1B4B]">Bank Accounts</span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {/* ICICI Bank */}
              <div
                onClick={() => setSelectedMethod('icici')}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between bg-white border ${
                  selectedMethod === 'icici' ? 'border-[#7C3AED] shadow-sm' : 'border-purple-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">
                    I
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1E1B4B]">ICICI Bank</h5>
                    <p className="text-[10px] text-slate-400">*** 4263 UPI</p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'icici' ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-slate-300'
                }`}>
                  {selectedMethod === 'icici' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </div>
              </div>

              {/* Axis Bank */}
              <div
                onClick={() => setSelectedMethod('axis')}
                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between bg-white border ${
                  selectedMethod === 'axis' ? 'border-[#7C3AED] shadow-sm' : 'border-purple-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs">
                    A
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1E1B4B]">Axis Bank</h5>
                    <p className="text-[10px] text-slate-400">*** 4263 UPI</p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'axis' ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-slate-300'
                }`}>
                  {selectedMethod === 'axis' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Add payment methods */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-xs font-bold text-[#1E1B4B]">Add payment methods</span>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div
              onClick={() => setActiveModal('selectBank')}
              className="p-3.5 rounded-2xl bg-white border border-purple-100 shadow-xs hover:bg-purple-50/50 cursor-pointer transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center font-bold text-xs">
                  🏦
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#1E1B4B]">Add Bank Accounts</h5>
                  <p className="text-[10px] text-slate-400">Link via registered mobile number</p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Purple Pill Action Button */}
        <div className="p-4 sm:p-5 border-t border-purple-100 bg-white">
          <button
            onClick={handlePay}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] hover:brightness-105 active:scale-[0.99] text-white font-extrabold text-sm shadow-lg shadow-[#7C3AED]/35 transition-all flex items-center justify-center gap-2"
          >
            <span>₹</span>
            <span>Pay ₹{amount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
