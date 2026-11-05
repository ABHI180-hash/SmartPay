import React, { useState } from 'react';
import {
  Scan,
  Send,
  Building2,
  Smartphone,
  Plus,
  Search,
  Bell,
  SlidersHorizontal,
  Calendar,
  Eye,
  EyeOff,
  ChevronDown,
  Info,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';
import { SmartPayLogo } from '../common/SmartPayLogo';
import { useApp } from '../../context/AppContext';

export const UnifiedOnePageDashboard = () => {
  const {
    user,
    transactions,
    selectedBank,
    setActiveModal,
    setSelectedTxn,
    setPendingPayment,
    setPersonalTab,
  } = useApp();

  const [showBalance, setShowBalance] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Contacts matching exact reference screenshots (Fany, Robin, Emely, Luffy, Alexandria)
  const contactLists = [
    {
      id: 'c-fany',
      name: 'Fany',
      subtext: '**12',
      upi: 'fany@smartpay',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      lastAmount: 1200.00,
    },
    {
      id: 'c-robin',
      name: 'Robin',
      subtext: '**56',
      upi: 'robin@smartpay',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      lastAmount: 500.00,
    },
    {
      id: 'c-emely',
      name: 'Emely',
      subtext: '**91',
      upi: 'emely@smartpay',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
      lastAmount: 350.00,
    },
    {
      id: 'c-luffy',
      name: 'Luffy',
      subtext: '**44',
      upi: 'luffy@smartpay',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
      lastAmount: 750.00,
    },
    {
      id: 'c-alex',
      name: 'Alexandria',
      subtext: '**28',
      upi: 'alexandria@smartpay',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
      lastAmount: 600.00,
    },
  ];

  // Transactions list matching reference screenshots (YouTube Premium with Autopay, etc.)
  const referenceTransactions = [
    {
      id: 'ref-yt',
      name: 'Youtube Premium',
      verified: true,
      category: 'Monthly Subscription',
      isAutopay: true,
      amount: 190.00,
      date: '22 May 2025',
      logo: '▶',
      logoBg: 'bg-[#FF0000] text-white',
      rawRecipient: 'google.youtube@smartpay',
    },
    {
      id: 'ref-insta',
      name: 'Instagram Merchant',
      verified: true,
      category: 'Digital Product Purchase',
      isAutopay: false,
      amount: 600.00,
      date: '18 May 2025',
      logo: '📷',
      logoBg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white',
      rawRecipient: 'meta.instagram@smartpay',
    },
    {
      id: 'ref-spotify',
      name: 'Spotify Music Duo',
      verified: true,
      category: 'Audio Streaming Subscription',
      isAutopay: true,
      amount: 149.00,
      date: '15 May 2025',
      logo: '♫',
      logoBg: 'bg-emerald-500 text-white',
      rawRecipient: 'spotify@smartpay',
    },
  ];

  const handlePayContact = (contact) => {
    setPendingPayment({
      recipient: contact.name,
      upiId: contact.upi,
      amount: contact.lastAmount || 500.00,
      note: `Payment to ${contact.name}`,
      bank: selectedBank,
      category: 'Transfer',
    });
    setActiveModal('confirmPayment');
  };

  const handleTxnClick = (t) => {
    setSelectedTxn({
      id: t.id,
      name: t.name,
      recipient: t.rawRecipient || `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@smartpay`,
      amount: t.amount,
      time: '19:12',
      date: t.date || 'Today',
      direction: 'outgoing',
      status: 'Success',
      bank: `${selectedBank?.name || 'HDFC Bank'} •••• 7382`,
      note: t.category || 'UPI Payment',
      utr: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      iconBg: 'bg-[#7C3AED]',
      iconText: t.name.substring(0, 2).toUpperCase(),
    });
    setActiveModal('txnDetails');
  };

  // Live balance calculation (e.g. ₹1,32,000.04 or user's wallet balance)
  const displayBalance = user?.walletBalance && user.walletBalance > 1000
    ? user.walletBalance
    : 132000.04;

  return (
    <div className="relative pb-32 max-w-md sm:max-w-xl md:max-w-2xl mx-auto select-none space-y-4">
      {/* ========================================================
          1. EXACT CASHLY ORGANIC CURVED VIBRANT PURPLE TOP CARD
      ======================================================== */}
      <div className="relative overflow-visible shadow-xl shadow-purple-600/20">
        {/* Main Purple Gradient Body */}
        <div className="relative bg-gradient-to-b from-[#5C1DBA] via-[#7426E2] to-[#8C3CF7] text-white px-5 pt-4 pb-3 sm:rounded-t-[36px]">
          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#A855F7]/30 blur-[60px]" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#4A148C]/40 blur-[60px]" />

          {/* Brand Header Bar: SmartPay. + Notification Bell + Calendar */}
          <div className="relative z-10 flex items-center justify-between pb-3.5 pt-0.5">
            <SmartPayLogo variant="light" size="md" showTagline={false} />

            <div className="flex items-center gap-2">
              {/* Notification Bell with Pink/Red unread indicator dot */}
              <button
                onClick={() => setPersonalTab('profile')}
                className="w-9 h-9 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/20 shadow-xs relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF2D55] ring-2 ring-[#7426E2] animate-pulse" />
              </button>

              {/* Calendar / Passbook Icon */}
              <button
                onClick={() => setPersonalTab('transactions')}
                className="w-9 h-9 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/20 shadow-xs"
                title="Transaction History"
              >
                <Calendar className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Search Bar matching Reference Screen 1: "Pay anyone on UPI" */}
          <div className="relative z-10 mb-3.5">
            <div className="bg-white rounded-full px-4 py-3 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2.5 flex-1">
                <Search className="w-4 h-4 text-slate-400 stroke-[2.2]" />
                <input
                  type="text"
                  placeholder="Pay anyone on UPI"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setActiveModal('sendMoney');
                  }}
                  className="w-full text-xs sm:text-sm font-semibold text-[#1E1B4B] placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>
              <button
                onClick={() => setActiveModal('sendMoney')}
                className="p-1 text-[#7C3AED] hover:text-[#5C1DBA] transition-colors"
                title="Filter / UPI Pay"
              >
                <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Total Balance Row */}
          <div className="relative z-10 pt-1 pb-2 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-purple-100 text-xs font-semibold">
                <span>Total Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="hover:text-white transition-colors"
                  title={showBalance ? 'Hide Balance' : 'Show Balance'}
                >
                  {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-baseline gap-2 mt-0.5">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {showBalance
                    ? `₹${displayBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : '₹••••••••'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white backdrop-blur-sm border border-white/20">
                  Bal
                </span>
              </div>
            </div>

            {/* Circular White + Button matching reference */}
            <button
              onClick={() => setActiveModal('addMoney')}
              className="w-10 h-10 rounded-full bg-white text-[#7C3AED] flex items-center justify-center font-black shadow-lg shadow-purple-950/30 hover:scale-105 active:scale-95 transition-all"
              title="Add Money / Top Up"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* 4 Circular Quick Action Buttons (Scan & Pay, Pay Contact, Bank Transfer, Mobile Recharge) */}
          <div className="relative z-10 pt-2 pb-1">
            <div className="flex items-center justify-end mb-1 px-1">
              <button
                onClick={() => setActiveModal('sendMoney')}
                className="text-purple-200/80 hover:text-white transition-colors"
                title="More Actions"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {/* 1. Scan & Pay */}
              <button
                onClick={() => setActiveModal('scanPay')}
                className="flex flex-col items-center gap-1.5 group touch-manipulation"
              >
                <div className="w-14 h-14 rounded-full bg-white/16 group-hover:bg-white/25 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-sm transition-all group-active:scale-95">
                  <Scan className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Scan &<br />Pay
                </span>
              </button>

              {/* 2. Pay Contact */}
              <button
                onClick={() => setActiveModal('sendMoney')}
                className="flex flex-col items-center gap-1.5 group touch-manipulation"
              >
                <div className="w-14 h-14 rounded-full bg-white/16 group-hover:bg-white/25 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-sm transition-all group-active:scale-95">
                  <Send className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Pay<br />Contact
                </span>
              </button>

              {/* 3. Bank Transfer */}
              <button
                onClick={() => setActiveModal('sendMoney')}
                className="flex flex-col items-center gap-1.5 group touch-manipulation"
              >
                <div className="w-14 h-14 rounded-full bg-white/16 group-hover:bg-white/25 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-sm transition-all group-active:scale-95">
                  <Building2 className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Bank<br />Transfer
                </span>
              </button>

              {/* 4. Mobile Recharge */}
              <button
                onClick={() => setPersonalTab('payments')}
                className="flex flex-col items-center gap-1.5 group touch-manipulation"
              >
                <div className="w-14 h-14 rounded-full bg-white/16 group-hover:bg-white/25 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-sm transition-all group-active:scale-95">
                  <Smartphone className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Mobile<br />Recharge
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ORGANIC DOWNWARD CURVED SVG BOTTOM CONTOUR WITH CENTERED TONGUE & CHEVRON */}
        <div className="relative w-full overflow-visible pointer-events-none select-none">
          <svg
            viewBox="0 0 390 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 block -mt-[1px]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="purpleBottomCardCurve" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8C3CF7" />
                <stop offset="100%" stopColor="#9645FF" />
              </linearGradient>
            </defs>
            <path
              d="M 0,0 L 0,4 C 50,8 120,9 158,9 C 172,9 176,29 195,29 C 214,29 218,9 232,9 C 270,9 340,8 390,4 L 390,0 Z"
              fill="url(#purpleBottomCardCurve)"
            />
          </svg>
          {/* Centered Chevron Down inside the organic tongue */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <ChevronDown className="w-4 h-4 text-white stroke-[3] drop-shadow-sm" />
          </div>
        </div>
      </div>

      {/* ========================================================
          2. CONTACT LISTS SECTION matching Reference Screen 1
      ======================================================== */}
      <div className="px-3 sm:px-4 pt-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#1E1B4B] tracking-tight">
            Contact Lists
          </h3>
          <button
            onClick={() => setPersonalTab('contacts')}
            className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrolling Contact Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* + Add Contact with dashed purple squircle pill */}
          <button
            onClick={() => setActiveModal('sendMoney')}
            className="flex flex-col items-center justify-center w-16 h-21 rounded-[22px] border-2 border-dashed border-purple-300 bg-purple-50/70 hover:bg-purple-100 text-[#7C3AED] transition-all flex-shrink-0 group touch-manipulation"
          >
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs text-[#7C3AED] font-bold group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[11px] font-bold mt-1 text-purple-700">Add</span>
          </button>

          {/* Squircle Avatars from Cashly Reference */}
          {contactLists.map((c) => (
            <button
              key={c.id}
              onClick={() => handlePayContact(c)}
              className="flex flex-col items-center w-16 flex-shrink-0 group text-center touch-manipulation"
            >
              <div className="relative">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-14 h-14 rounded-[22px] object-cover border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-[#7C3AED] transition-all"
                />
              </div>
              <span className="text-xs font-bold text-[#1E1B4B] mt-1 truncate w-full">
                {c.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-0.5">
                {c.subtext}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          3. TRANSACTIONS SECTION matching Reference Screen 1
      ======================================================== */}
      <div className="px-3 sm:px-4 pt-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#1E1B4B] tracking-tight">
            Transactions
          </h3>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
            <span>July 25, 2025</span>
            <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Reference Screen Item 1: Youtube Premium with Autopay pill */}
          {referenceTransactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => handleTxnClick(tx)}
              className="p-3.5 rounded-2xl bg-white border border-purple-100/90 shadow-[0_2px_12px_rgba(124,58,237,0.04)] hover:shadow-md transition-all flex items-center justify-between cursor-pointer group touch-manipulation"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl ${tx.logoBg} flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  {tx.logo}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                      {tx.name}
                    </h4>
                    {tx.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] fill-[#7C3AED] text-white" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {tx.category}
                  </p>
                  {tx.isAutopay && (
                    <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Autopay
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-extrabold text-[#1E1B4B]">
                  ₹{tx.amount.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {tx.date}
                </div>
              </div>
            </div>
          ))}

          {/* Live MySQL Database Transactions */}
          {transactions.slice(0, 3).map((t) => (
            <div
              key={t.id}
              onClick={() => handleTxnClick(t)}
              className="p-3.5 rounded-2xl bg-white border border-purple-100/90 shadow-[0_2px_12px_rgba(124,58,237,0.04)] hover:shadow-md transition-all flex items-center justify-between cursor-pointer group touch-manipulation"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                  {t.iconText || t.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t.bank || 'HDFC Bank •••• 7382'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-sm font-extrabold ${t.direction === 'incoming' ? 'text-emerald-600' : 'text-[#1E1B4B]'}`}>
                  {t.direction === 'incoming' ? '+' : '-'}₹{t.amount?.toFixed ? t.amount.toFixed(2) : t.amount}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {t.time || 'Today'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
