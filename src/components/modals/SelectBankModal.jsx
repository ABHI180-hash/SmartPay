import React, { useState } from 'react';
import { ArrowLeft, Search, Check, Building, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SelectBankModal = ({ onClose }) => {
  const { banks, selectedBank, setSelectedBank, showToast } = useApp();
  const [search, setSearch] = useState('');

  const safeBanks = Array.isArray(banks) && banks.length > 0 ? banks : [
    { id: 'bank-hdfc', name: 'HDFC Bank', code: 'HDFC', accountNumber: '•••• 5543', balance: 42850, color: '#004C8F', logoText: 'HDFC' }
  ];

  const filteredBanks = safeBanks.filter((b) => {
    const q = (search || '').toLowerCase();
    const nameMatch = (b?.name || '').toLowerCase().includes(q);
    const codeMatch = (b?.code || '').toLowerCase().includes(q);
    const accMatch = (b?.accountNumber || '').includes(q);
    return nameMatch || codeMatch || accMatch;
  });

  const activeBank = selectedBank || safeBanks[0];

  const handleSelect = (bank) => {
    if (!bank) return;
    setSelectedBank(bank);
    showToast(`Default bank switched to ${bank.name}`, 'info');
    onClose();
  };

  const firstBank = safeBanks[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full sm:h-auto sm:max-h-[92vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Purple Header matching Cashly reference */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6222BD] to-[#752DE0] text-white flex items-center justify-between shadow-md">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-tight">Select your bank</h2>
          <div className="w-8" />
        </div>

        {/* Search Bar matching reference image */}
        <div className="p-4 bg-[#F5F3FF] border-b border-[#E9D5FF]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bank name, BLZ, BIC"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E9D5FF] focus:border-[#7C3AED] focus:outline-none transition-colors placeholder:text-[#718096]"
            />
          </div>
        </div>

        {/* Bank List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Previously Connected Section */}
          {firstBank && (
            <div>
              <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
                Primary Linked Account
              </p>
              <div
                onClick={() => handleSelect(firstBank)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeBank.id === firstBank.id
                    ? 'border-[#7C3AED] bg-[#EDE9FE]/30 shadow-sm'
                    : 'border-[#EDE9FE] bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs text-white shadow-sm"
                    style={{ backgroundColor: firstBank.color || '#004C8F' }}
                  >
                    {firstBank.logoText || firstBank.name.substring(0, 4).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1B4B]">{firstBank.name}</h4>
                    <p className="text-xs text-[#718096]">
                      {firstBank.accountNumber} • Balance: ₹{(firstBank.balance || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    activeBank.id === firstBank.id
                      ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {activeBank.id === firstBank.id && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </div>
          )}

          {/* All Banks List */}
          <div>
            <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-2">
              All Supported Accounts ({filteredBanks.length})
            </p>
            <div className="space-y-2">
              {filteredBanks.map((bank) => {
                const isSelected = activeBank.id === bank.id;
                return (
                  <div
                    key={bank.id}
                    onClick={() => handleSelect(bank)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7C3AED] bg-[#EDE9FE]/30 shadow-sm'
                        : 'border-[#EDE9FE] bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm"
                        style={{ backgroundColor: bank.color || '#7C3AED' }}
                      >
                        {bank.logoText || bank.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#1E1B4B]">
                          {bank.name}
                        </h4>
                        <p className="text-[11px] text-[#718096]">
                          {bank.accountNumber || 'NPCI Verified Account'}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Button matching reference image */}
        <div className="p-4 border-t border-[#EDE9FE] bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/30 transition-all active:scale-[0.99]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
