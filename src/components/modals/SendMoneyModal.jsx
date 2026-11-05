import React, { useState } from 'react';
import {
  ArrowLeft,
  Scan,
  CreditCard,
  Plus,
  Info,
  Check,
  Delete,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SendMoneyModal = ({ onClose }) => {
  const { user, selectedBank, setPendingPayment, setActiveModal } = useApp();

  const [amountStr, setAmountStr] = useState('1200');
  const [selectedContact, setSelectedContact] = useState({
    id: 'c-fany',
    name: 'Fany',
    upi: 'fany@smartpay',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  });

  const quickSendContacts = [
    {
      id: 'c-fany',
      name: 'Fany',
      upi: 'fany@smartpay',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'c-robin',
      name: 'Robin',
      upi: 'robin@smartpay',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'c-emely',
      name: 'Emely',
      upi: 'emely@smartpay',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'c-luffy',
      name: 'Luffy',
      upi: 'luffy@smartpay',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'c-alex',
      name: 'Alexandria',
      upi: 'alexandria@smartpay',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    },
  ];

  // Numeric Keypad Handler
  const handleKeyPress = (val) => {
    if (val === 'backspace') {
      setAmountStr((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (val === 'enter') {
      handleConfirmPay();
    } else {
      setAmountStr((prev) => {
        if (prev === '0') return val;
        if (prev.length >= 7) return prev; // limit max length
        return prev + val;
      });
    }
  };

  const handleConfirmPay = () => {
    const numericAmt = parseFloat(amountStr) || 1200;
    setPendingPayment({
      recipient: selectedContact?.name || 'Robin Jessy',
      upiId: selectedContact?.upi || 'robin@smartpay',
      amount: numericAmt,
      note: 'Money Transfer via SmartPay',
      bank: selectedBank || { name: 'HDFC Bank', accountNumber: '****7382' },
      category: 'Transfer',
    });
    setActiveModal('confirmPayment');
  };

  const numericAmt = parseFloat(amountStr) || 0;
  const limitMax = 100000;
  const limitPct = Math.min(100, Math.max(5, (numericAmt / limitMax) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full sm:h-auto sm:max-h-[94vh] bg-[#FAF8FF] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B] border border-purple-100">
        {/* Header matching Reference Screen 2 */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-purple-100/80 bg-white">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-[#1E1B4B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-[#1E1B4B]">Money Transfer</h2>
          <button
            onClick={() => setActiveModal('scanPay')}
            className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-[#7C3AED] transition-colors"
            title="Scan QR"
          >
            <Scan className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 1. Transfer From Card matching Reference Screen 2 */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-xs font-bold text-[#1E1B4B]">Transfer from</span>
              <button
                onClick={() => setActiveModal('selectBank')}
                className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-purple-100 shadow-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  $
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1B4B]">
                    {selectedBank?.name || 'My Account'}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono font-bold text-[#1E1B4B]">
                      {selectedBank?.accountNumber || '****7382'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      ₹18,377.00
                    </span>
                  </div>
                </div>
              </div>

              <CreditCard className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* 2. Large Amount Input Display with Blinking Cursor */}
          <div className="text-center py-2">
            <div className="inline-flex items-center justify-center font-sans tracking-tight">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B]">₹</span>
              <span className="text-4xl sm:text-5xl font-black text-[#1E1B4B] tracking-tight ml-1">
                {parseInt(amountStr || '0').toLocaleString('en-IN')}
              </span>
              <span className="text-2xl sm:text-3xl font-light text-slate-400 ml-0.5">.00</span>
              <span className="w-0.5 h-9 bg-[#7C3AED] ml-1 animate-pulse" />
            </div>
          </div>

          {/* 3. Transfer Limits Slider matching Reference Screen 2 */}
          <div className="px-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
              <span>Transfer Limits</span>
              <span className="text-[#1E1B4B]">₹1,00,000.00</span>
            </div>
            <div className="w-full h-2 rounded-full bg-purple-100 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] transition-all duration-300"
                style={{ width: `${limitPct}%` }}
              />
            </div>
          </div>

          {/* 4. Quick Send Contact Row matching Reference Screen 2 */}
          <div>
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-xs font-bold text-[#1E1B4B]">Quick Send</span>
              <button
                onClick={() => setActiveModal('sendMoney')}
                className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {/* + Add Contact with dashed purple border */}
              <button
                onClick={() => {}}
                className="flex flex-col items-center justify-center w-13 h-16 rounded-2xl border-2 border-dashed border-purple-400 bg-purple-50/70 text-[#7C3AED] flex-shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="text-[10px] font-bold mt-1 text-purple-700">Add</span>
              </button>

              {quickSendContacts.map((c) => {
                const isSelected = selectedContact?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    className="flex flex-col items-center w-13 flex-shrink-0 group text-center"
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className={`w-12 h-12 rounded-2xl object-cover border-2 transition-all ${
                        isSelected
                          ? 'border-[#7C3AED] ring-2 ring-purple-300 shadow-md scale-105'
                          : 'border-white shadow-xs'
                      }`}
                    />
                    <span className={`text-[11px] mt-1 truncate w-full ${
                      isSelected ? 'font-black text-[#7C3AED]' : 'font-semibold text-[#1E1B4B]'
                    }`}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Minimalist Clean Numeric Keypad matching Reference Screen 2 */}
          <div className="pt-1">
            <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-3xl border border-purple-100 shadow-card">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeyPress(digit)}
                  className="h-12 rounded-2xl text-xl font-bold text-[#1E1B4B] hover:bg-purple-50 active:bg-purple-100 active:scale-95 transition-all flex items-center justify-center font-sans"
                >
                  {digit}
                </button>
              ))}

              {/* Enter / Submit Key */}
              <button
                type="button"
                onClick={() => handleKeyPress('enter')}
                className="h-12 rounded-2xl text-[#7C3AED] hover:bg-purple-50 active:bg-purple-100 active:scale-95 transition-all flex items-center justify-center font-bold"
                title="Confirm Amount"
              >
                ↵
              </button>

              {/* Zero */}
              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="h-12 rounded-2xl text-xl font-bold text-[#1E1B4B] hover:bg-purple-50 active:bg-purple-100 active:scale-95 transition-all flex items-center justify-center font-sans"
              >
                0
              </button>

              {/* Backspace / Delete Key */}
              <button
                type="button"
                onClick={() => handleKeyPress('backspace')}
                className="h-12 rounded-2xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 active:scale-95 transition-all flex items-center justify-center font-bold"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* 6. Bottom Confirm & Pay Full-Width Purple Pill Button */}
        <div className="p-4 sm:p-5 border-t border-purple-100 bg-white">
          <button
            onClick={handleConfirmPay}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] hover:brightness-105 active:scale-[0.99] text-white font-extrabold text-sm shadow-lg shadow-[#7C3AED]/35 transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            <span>Confirm & Pay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
