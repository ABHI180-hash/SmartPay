import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Send,
  ArrowDownLeft,
  CheckCircle2,
  Phone,
  AtSign,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { quickContacts } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const ContactsPage = () => {
  const { setActiveModal, setPendingPayment, selectedBank, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'recent' | 'favorites'

  const allContacts = [
    ...quickContacts,
    {
      id: 'c5',
      name: 'Arihant Jain',
      phone: '+91 99887 76655',
      upi: 'arihant@smartpay',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      status: 'Verified',
      isFavorite: true,
    },
    {
      id: 'c6',
      name: 'Priya Sharma',
      phone: '+91 91234 56780',
      upi: 'priya.sharma@smartpay',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      status: 'Verified',
      isFavorite: true,
    },
    {
      id: 'c7',
      name: 'Vikram Sengupta',
      phone: '+91 98765 12345',
      upi: 'vikram.sen@smartpay',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      status: 'Verified',
      isFavorite: false,
    },
    {
      id: 'c8',
      name: 'Swati Deshmukh',
      phone: '+91 94433 22110',
      upi: 'swati.d@smartpay',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      status: 'Verified',
      isFavorite: false,
    },
  ];

  const filteredContacts = allContacts.filter((c) => {
    const q = (search || '').toLowerCase();
    const match = c.name.toLowerCase().includes(q) || (c.upi || '').toLowerCase().includes(q) || (c.phone || '').includes(q);
    if (filter === 'favorites') return match && c.isFavorite;
    return match;
  });

  const handleSendToContact = (contact) => {
    setPendingPayment({
      recipient: contact.name,
      upiId: contact.upi,
      amount: 500.00,
      note: `Payment to ${contact.name}`,
      bank: selectedBank,
      category: 'Transfer',
    });
    setActiveModal('confirmPayment');
  };

  const handleRequestMoney = (contact) => {
    showToast(`Payment request of ₹500 sent to ${contact.name}!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1E1B4B] tracking-tight">
            UPI Contacts & Beneficiaries
          </h1>
          <p className="text-xs text-[#718096]">
            Send money directly to phone contacts or saved UPI payment addresses
          </p>
        </div>

        <button
          onClick={() => setActiveModal('sendMoney')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Pay New Contact</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E9D5FF] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone or UPI ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-[#EDE9FE] text-xs font-semibold focus:outline-none focus:border-[#7C3AED]"
          />
        </div>

        {/* Filter Pills */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-bold border border-[#EDE9FE] self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'all' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-[#718096]'
            }`}
          >
            All ({allContacts.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'favorites' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-[#718096]'
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 rounded-2xl bg-white border border-[#E9D5FF] hover:border-[#7C3AED] transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={contact.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Verified UPI Payee" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-[#1E1B4B] truncate">
                    {contact.name}
                  </h3>
                  {contact.isFavorite && (
                    <span className="text-[10px] text-amber-500" title="Favorite">★</span>
                  )}
                </div>
                <p className="text-xs text-[#718096] font-mono truncate">{contact.upi}</p>
                <p className="text-[11px] text-[#718096] truncate">{contact.phone || '+91 98765 43210'}</p>
              </div>
            </div>

            {/* Quick Actions for this contact */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => handleSendToContact(contact)}
                className="flex-1 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Pay</span>
              </button>

              <button
                onClick={() => handleRequestMoney(contact)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E1B4B] text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Request</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
