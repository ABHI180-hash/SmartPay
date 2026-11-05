import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  QrCode,
  Copy,
  Share2,
  Download,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Plus,
  Play,
  Pause,
  Trash2,
  Fingerprint,
  Lock,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  LogOut,
  Camera,
  RefreshCw,
  Sparkles,
  Check,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfilePage = () => {
  const {
    user,
    setUser,
    banks,
    setBanks,
    selectedBank,
    setSelectedBank,
    autopayMandates,
    toggleAutopayStatus,
    cancelAutopayMandate,
    addAutopayMandate,
    biometricPayEnabled,
    setBiometricPayEnabled,
    updateBiometricSettings,
    setActiveModal,
    setPlatformMode,
    setAuthScreen,
    showToast
  } = useApp();

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [revealedBalances, setRevealedBalances] = useState({});
  const [showAddAutopay, setShowAddAutopay] = useState(false);
  const [newAutopay, setNewAutopay] = useState({
    merchant: '',
    amount: '',
    frequency: 'Monthly',
    category: 'Subscription'
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || 'Avijit Roy',
    email: user.email || 'avijit.roy@gmail.com',
    phone: user.phone || '+91 98765 43210',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  // Copy UPI ID to clipboard
  const handleCopyUpi = () => {
    const upi = user.upiId || '9876543210@smartpay';
    navigator.clipboard.writeText(upi);
    setCopiedUpi(true);
    showToast(`Copied ${upi} to clipboard!`, 'success');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Share QR Code
  const handleShareQr = () => {
    const upi = user.upiId || '9876543210@smartpay';
    if (navigator.share) {
      navigator.share({
        title: `Pay ${user.name} on SmartPay`,
        text: `Send money to ${user.name} using UPI ID: ${upi}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyUpi();
    }
  };

  // Download QR Code image
  const handleDownloadQr = () => {
    const upi = user.upiId || '9876543210@smartpay';
    const link = document.createElement('a');
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(user.name)}&cu=INR`;
    link.download = `SmartPay-QR-${user.name.replace(/\s+/g, '_')}.png`;
    link.target = '_blank';
    link.click();
    showToast('Downloaded SmartPay QR Code image', 'success');
  };

  // Toggle bank balance visibility
  const toggleBalanceReveal = (bankId) => {
    setRevealedBalances(prev => ({
      ...prev,
      [bankId]: !prev[bankId]
    }));
  };

  // Set primary bank
  const handleSetPrimaryBank = (bank) => {
    setBanks(prev => prev.map(b => ({
      ...b,
      isPrimary: b.id === bank.id
    })));
    setSelectedBank(bank);
    showToast(`${bank.name} is now your primary UPI bank account`, 'success');
  };

  // Handle Add New AutoPay Mandate
  const handleCreateAutopay = (e) => {
    e.preventDefault();
    if (!newAutopay.merchant || !newAutopay.amount) {
      showToast('Please enter merchant name and amount', 'error');
      return;
    }
    const mandate = {
      id: `auto-${Date.now()}`,
      merchant: newAutopay.merchant,
      category: newAutopay.category,
      logoText: newAutopay.merchant.substring(0, 2).toUpperCase(),
      logoBg: 'bg-[#7C3AED]',
      amount: parseFloat(newAutopay.amount),
      frequency: newAutopay.frequency,
      nextDeduction: '15 Nov 2026',
      bank: `${selectedBank.name} ${selectedBank.accountNumber}`,
      status: 'ACTIVE',
      umn: `${newAutopay.merchant.toUpperCase().replace(/\s+/g, '')}@HDFC0099881`,
    };
    addAutopayMandate(mandate);
    setShowAddAutopay(false);
    setNewAutopay({ merchant: '', amount: '', frequency: 'Monthly', category: 'Subscription' });
  };

  // Save profile edits
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      avatar: editForm.avatar
    }));
    setShowEditProfile(false);
    showToast('Google Account & Profile details updated!', 'success');
  };

  // Sign out
  const handleLogout = () => {
    localStorage.removeItem('smartpay_token');
    localStorage.removeItem('smartpay_refresh_token');
    showToast('Signed out of SmartPay', 'info');
    setAuthScreen('login');
    setPlatformMode('auth');
  };

  const totalAutopayAmount = (autopayMandates || [])
    .filter(m => m.status === 'ACTIVE')
    .reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);

  const primaryUpiId = user.upiId || '9876543210@smartpay';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(primaryUpiId)}&pn=${encodeURIComponent(user.name)}&cu=INR`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* 1. GOOGLE/GMAIL PROFILE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-card relative overflow-hidden">
        {/* Decorative Top Accent in Cashly Purple */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#C084FC]" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
          {/* Avatar with Google badge */}
          <div className="relative group">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl ring-2 ring-purple-300"
            />
            {/* Google G icon badge */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md border border-purple-100 flex items-center justify-center" title="Connected with Google">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
              </svg>
            </div>
            {/* Change photo button */}
            <button
              onClick={() => setShowEditProfile(true)}
              className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] tracking-tight">
                    {user.name}
                  </h1>
                  <span className="p-1 rounded-full bg-purple-50 text-[#7C3AED]" title="KYC & Google Verified">
                    <CheckCircle2 className="w-5 h-5 fill-[#7C3AED] text-white" />
                  </span>
                </div>
                <p className="text-xs text-purple-600/80 font-medium mt-0.5">
                  SmartPay Elite Member • Verified NPCI Holder
                </p>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => setShowEditProfile(true)}
                className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#7C3AED] text-xs font-bold transition-colors self-center sm:self-start"
              >
                Edit Google Info
              </button>
            </div>

            {/* Email & Phone Pill Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50/60 border border-purple-100 text-[#1E1B4B]">
                <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="font-semibold">{user.email || 'avijit.roy@gmail.com'}</span>
                <span className="text-[10px] bg-purple-100 text-[#7C3AED] px-1.5 py-0.2 rounded-full font-bold">Google</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50/60 border border-purple-100 text-[#1E1B4B]">
                <Phone className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="font-semibold">{user.phone}</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold">UPI Linked</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PERSONAL UPI QR CODE CARD (DIRECTLY UNDER PHOTO) */}
        <div className="mt-8 pt-6 border-t border-purple-100">
          <div className="bg-gradient-to-br from-[#6222BD] via-[#752DE0] to-[#8B5CF6] rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-purple-500/25 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Background geometric flare */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#C084FC]/25 blur-2xl pointer-events-none" />

            {/* Left QR Info */}
            <div className="space-y-3 text-center md:text-left z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-bold border border-white/20">
                <QrCode className="w-3.5 h-3.5" />
                <span>Your Personal NPCI UPI QR Code</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Receive Money Instantly
              </h3>
              <p className="text-xs text-purple-100/90 max-w-sm">
                Friends and customers can scan this QR code with any UPI app (Cashly, Google Pay, PhonePe, Paytm, or BHIM) to pay you directly.
              </p>

              {/* UPI ID Pill Box */}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md">
                <span className="text-xs text-purple-200">UPI ID:</span>
                <strong className="text-sm font-mono font-bold text-white">{primaryUpiId}</strong>
                <button
                  onClick={handleCopyUpi}
                  className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check className="w-4 h-4 text-emerald-300 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={handleCopyUpi}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0B1F3A] text-xs font-bold hover:bg-slate-100 transition-colors shadow-md"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>

                <button
                  onClick={handleShareQr}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share QR</span>
                </button>

                <button
                  onClick={handleDownloadQr}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image</span>
                </button>
              </div>
            </div>

            {/* Right QR Display Box */}
            <div className="z-10 flex flex-col items-center flex-shrink-0">
              <div className="relative p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-white/80">
                <img
                  src={qrUrl}
                  alt="Personal UPI QR Code"
                  className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl object-contain"
                />
                {/* Center Monogram */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                    SP
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 mt-2">
                Scan to pay {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AUTOPAY & RECURRING MANDATES SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-[#1E1B4B] tracking-tight">
                UPI AutoPay Mandates
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold border border-purple-200">
                {(autopayMandates || []).filter(m => m.status === 'ACTIVE').length} Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated recurring subscriptions & utility bills approved on your account
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#1E1B4B] bg-purple-50/60 px-3 py-1.5 rounded-xl border border-purple-100">
              Committed: <strong className="text-[#7C3AED]">₹{totalAutopayAmount.toLocaleString('en-IN')}/mo</strong>
            </span>
            <button
              onClick={() => setShowAddAutopay(!showAddAutopay)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Mandate</span>
            </button>
          </div>
        </div>

        {/* Add AutoPay Form (Collapsible) */}
        {showAddAutopay && (
          <form onSubmit={handleCreateAutopay} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Setup New Recurring AutoPay</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Merchant / Service Name</label>
                <input
                  type="text"
                  value={newAutopay.merchant}
                  onChange={e => setNewAutopay({ ...newAutopay, merchant: e.target.value })}
                  placeholder="e.g. Hotstar, Gym, Amazon Prime"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-semibold focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Monthly Amount (₹)</label>
                <input
                  type="number"
                  value={newAutopay.amount}
                  onChange={e => setNewAutopay({ ...newAutopay, amount: e.target.value })}
                  placeholder="e.g. 299"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-semibold focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Frequency</label>
                <select
                  value={newAutopay.frequency}
                  onChange={e => setNewAutopay({ ...newAutopay, frequency: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-semibold focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddAutopay(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-purple-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9]"
              >
                Save AutoPay Mandate
              </button>
            </div>
          </form>
        )}

        {/* Mandates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(autopayMandates || []).map((mandate) => (
            <div
              key={mandate.id}
              className={`p-4 rounded-2xl border transition-all ${
                mandate.status === 'ACTIVE'
                  ? 'bg-white border-[#E9D5FF] hover:border-[#7C3AED]/50 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${mandate.logoBg || 'bg-[#7C3AED]'} text-white font-extrabold text-sm flex items-center justify-center shadow-sm`}>
                    {mandate.logoText || mandate.merchant.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1B4B]">{mandate.merchant}</h4>
                    <span className="text-[11px] text-[#718096]">{mandate.category} • {mandate.frequency}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-[#1E1B4B]">
                    ₹{parseFloat(mandate.amount).toLocaleString('en-IN')}
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 ${
                      mandate.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {mandate.status}
                  </span>
                </div>
              </div>

              {/* Sub-info */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#718096]">
                <span>Next: <strong className="text-[#1E1B4B] font-semibold">{mandate.nextDeduction}</strong></span>
                <span className="font-mono">{mandate.bank}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => toggleAutopayStatus(mandate.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    mandate.status === 'ACTIVE'
                      ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {mandate.status === 'ACTIVE' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{mandate.status === 'ACTIVE' ? 'Pause AutoPay' : 'Resume AutoPay'}</span>
                </button>

                <button
                  onClick={() => cancelAutopayMandate(mandate.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                  title="Cancel this mandate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LINKED BANK ACCOUNTS SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9D5FF] shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B] tracking-tight">
                Linked Bank Accounts
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-xs font-bold">
                {banks.length} Accounts Linked
              </span>
            </div>
            <p className="text-xs text-[#718096] mt-0.5">
              Real-time balance check & primary settlement account routing
            </p>
          </div>

          <button
            onClick={() => setActiveModal('selectBank')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Link Another Bank</span>
          </button>
        </div>

        {/* Bank List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banks.map((bank) => {
            const isRevealed = !!revealedBalances[bank.id];
            return (
              <div
                key={bank.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  bank.isPrimary
                    ? 'border-[#7C3AED] bg-[#F5F3FF] shadow-sm ring-1 ring-[#7C3AED]/30'
                    : 'border-[#EDE9FE] bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl text-white font-extrabold text-xs flex items-center justify-center shadow-md"
                      style={{ backgroundColor: bank.color || '#1E1B4B' }}
                    >
                      {bank.logoText || bank.name.substring(0, 4)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E1B4B]">{bank.name}</h4>
                      <p className="text-xs text-[#718096] font-mono">{bank.accountNumber}</p>
                    </div>
                  </div>

                  {bank.isPrimary ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Primary UPI
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetPrimaryBank(bank)}
                      className="text-xs text-[#7C3AED] hover:underline font-bold"
                    >
                      Set Primary
                    </button>
                  )}
                </div>

                {/* Balance Display & Check Live Balance button */}
                <div className="mt-4 pt-3 border-t border-[#EDE9FE] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#718096] font-medium block">Available Bank Balance</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <strong className="text-sm sm:text-base font-extrabold text-[#1E1B4B] font-mono">
                        {isRevealed
                          ? `₹${parseFloat(bank.balance || 42850).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                          : '••••••••'}
                      </strong>
                      <button
                        onClick={() => toggleBalanceReveal(bank.id)}
                        className="p-1 rounded text-[#718096] hover:text-[#1E1B4B]"
                        title={isRevealed ? 'Hide Balance' : 'Show Balance'}
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      toggleBalanceReveal(bank.id);
                      showToast(`Live balance fetched for ${bank.name}`, 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#EDE9FE] hover:bg-slate-100 text-xs font-bold text-[#1E1B4B] transition-colors"
                  >
                    Check Balance
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. UPI ID & NUMBER SETTINGS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9D5FF] shadow-card space-y-4">
        <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B] tracking-tight">
          UPI IDs & National UPI Numbers
        </h2>
        <p className="text-xs text-[#718096]">
          Manage your virtual payment addresses and NPCI 10-digit mobile mapping
        </p>

        <div className="space-y-3 pt-1">
          {/* Primary UPI ID */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#EDE9FE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs">
                @
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B] font-mono">{primaryUpiId}</p>
                <p className="text-[11px] text-[#718096]">Default Payment Address (Direct HDFC Settlement)</p>
              </div>
            </div>
            <button
              onClick={handleCopyUpi}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-[#718096] transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Secondary Alias */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EDE9FE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#718096] flex items-center justify-center font-bold text-xs">
                @
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B] font-mono">avijit@smartpay</p>
                <p className="text-[11px] text-[#718096]">Secondary Vanity Handle</p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-100 text-[#718096] px-2 py-0.5 rounded-full font-bold">Linked</span>
          </div>

          {/* Mapped Phone UPI Number */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs">
                #
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E1B4B] font-mono">+91 98765 43210</p>
                <p className="text-[11px] text-emerald-800">NPCI Central Mapper Active (Receive from PhonePe/GPay)</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Active</span>
          </div>
        </div>
      </div>

      {/* 6. SECURITY, BIOMETRIC & SETTINGS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9D5FF] shadow-card space-y-4">
        <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B4B] tracking-tight">
          Security & Biometric Preferences
        </h2>

        <div className="space-y-3 pt-1">
          {/* Biometric Payment Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-[#EDE9FE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
                <Fingerprint className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                  1-Touch Biometric Fingerprint Pay
                </h4>
                <p className="text-[11px] text-[#718096]">
                  Pay instantly using your device fingerprint sensor without typing UPI PIN
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={biometricPayEnabled}
                onChange={e => {
                  if (updateBiometricSettings) {
                    updateBiometricSettings(e.target.checked);
                  } else {
                    setBiometricPayEnabled(e.target.checked);
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]" />
            </label>
          </div>

          {/* AI Scam Shield Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-[#EDE9FE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                  AI Scam Shield Protection
                </h4>
                <p className="text-[11px] text-[#718096]">
                  24/7 heuristic blacklist scan & anti-phishing safeguard active
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Active
            </span>
          </div>

          {/* Reset UPI PIN */}
          <div
            onClick={() => {
              setAuthScreen('forgotPin');
              setPlatformMode('auth');
            }}
            className="p-4 rounded-2xl bg-white border border-[#EDE9FE] flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
                  Change 4-Digit UPI PIN
                </h4>
                <p className="text-[11px] text-[#718096]">
                  Reset or change your secret payment authorization PIN
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#718096]" />
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="p-4 rounded-2xl bg-red-50/50 border border-red-200 flex items-center justify-between cursor-pointer hover:bg-red-50 transition-colors text-red-600"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-red-700">
                  Sign Out from Account
                </h4>
                <p className="text-[11px] text-red-500">
                  Log out of this device session safely
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[#1E1B4B]">Edit Google Account Details</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#718096] mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#718096] mb-1">Google Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#718096] mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={editForm.avatar}
                  onChange={e => setEditForm({ ...editForm, avatar: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-[#EDE9FE] text-xs font-mono"
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#718096] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6222BD]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
