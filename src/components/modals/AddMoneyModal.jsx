import React, { useState } from 'react';
import { ArrowLeft, Wallet, Plus, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddMoneyModal = ({ onClose }) => {
  const { user, selectedBank, addMoneyToWallet } = useApp();
  const [amount, setAmount] = useState('500');

  const presets = ['100', '500', '1000', '2000'];

  const handleSubmit = (e) => {
    e.preventDefault();
    addMoneyToWallet(amount);
  };

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
          <h2 className="text-base font-bold text-white tracking-tight">Add Money to Wallet</h2>
          <div className="w-8" />
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          {/* Current Balance */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EDE9FE] text-[#6222BD]">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-5 h-5 text-[#8B5CF6]" />
              <span className="text-xs font-semibold">Current Wallet Balance</span>
            </div>
            <span className="text-sm font-bold">
              ₹{user.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Amount input */}
          <div className="text-center">
            <label className="text-xs font-bold text-[#718096] uppercase tracking-wider block mb-2">
              Enter Amount
            </label>
            <div className="relative inline-flex items-center justify-center">
              <span className="text-2xl font-bold text-[#1E1B4B] mr-1">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="10"
                max="50000"
                className="w-48 text-4xl sm:text-5xl font-extrabold text-center text-[#1E1B4B] focus:outline-none border-b-2 border-[#7C3AED] pb-1 bg-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center justify-center gap-2">
            {presets.map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => setAmount(preset)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  amount === preset
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm'
                    : 'bg-slate-50 text-[#1E1B4B] border-[#EDE9FE] hover:bg-slate-100'
                }`}
              >
                +₹{preset}
              </button>
            ))}
          </div>

          {/* Payment Source */}
          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1.5">
              Debit From Bank
            </label>
            <div className="flex items-center justify-between p-3 rounded-2xl border border-[#EDE9FE] bg-slate-50">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
                  style={{ backgroundColor: selectedBank?.color || '#004C8F' }}
                >
                  {selectedBank?.logoText || (selectedBank?.name ? selectedBank.name.substring(0, 4).toUpperCase() : 'BANK')}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1B4B]">{selectedBank?.name || 'Primary Bank Account'}</h4>
                  <p className="text-[11px] text-[#718096]">{selectedBank?.accountNumber || '•••• 5543'}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Zero Fee</span>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-xs text-[#718096]">
            <ShieldCheck className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
            <span>Funds are immediately available for scan & pay and UPI Lite X</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-base shadow-lg shadow-[#7C3AED]/30 transition-all active:scale-[0.99]"
          >
            Add ₹{parseFloat(amount || 0).toLocaleString('en-IN')} to Wallet
          </button>
        </form>
      </div>
    </div>
  );
};
