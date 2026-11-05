import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransactionCard } from '../../components/common/TransactionCard';

export const TransactionHistoryPage = () => {
  const { transactions, setSelectedTxn, setActiveModal, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'outgoing' | 'incoming' | 'Food' | 'Shopping' | 'Bills'

  const filtered = transactions.filter((txn) => {
    const matchesSearch =
      txn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.utr.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'outgoing') return txn.direction === 'outgoing';
    if (filterType === 'incoming') return txn.direction === 'incoming';
    if (filterType !== 'all') return txn.category === filterType;

    return true;
  });

  const handleExport = () => {
    showToast('Transaction statement downloaded (PDF)', 'success');
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight">
            Transaction History
          </h2>
          <p className="text-xs text-[#718096]">
            All UPI, Card and Offline payments recorded on your account
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#EDE9FE] hover:bg-slate-50 text-xs font-bold text-[#1E1B4B] shadow-sm transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>Download Statement</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-[#E9D5FF] shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by payee, UPI ID, or UTR number..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F5F3FF] border border-[#E9D5FF] focus:outline-none focus:border-[#7C3AED]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Transactions' },
            { id: 'outgoing', label: 'Paid Out' },
            { id: 'incoming', label: 'Received' },
            { id: 'Food', label: 'Food & Dining' },
            { id: 'Shopping', label: 'Shopping' },
            { id: 'Bills', label: 'Utility Bills' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterType(pill.id)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                filterType === pill.id
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'bg-[#F5F3FF] border border-[#E9D5FF] text-[#718096] hover:bg-[#F5F2EB]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl border border-[#E9D5FF] shadow-card overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-slate-100 p-2 sm:p-4">
            {filtered.map((txn) => (
              <TransactionCard
                key={txn.id}
                txn={txn}
                onClick={(item) => {
                  setSelectedTxn(item);
                  setActiveModal('txnDetails');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-[#718096]">
            <p className="text-sm font-semibold">No transactions found matching your filter</p>
            <p className="text-xs mt-1">Try searching for a different name or clear filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
