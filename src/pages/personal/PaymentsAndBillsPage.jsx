import React, { useState } from 'react';
import {
  Smartphone,
  Zap,
  Tv,
  Car,
  Wifi,
  CreditCard,
  Droplets,
  Flame,
  Building,
  Receipt,
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentsAndBillsPage = () => {
  const { setActiveModal, setPendingPayment, selectedBank, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('recharge');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [selectedOperator, setSelectedOperator] = useState('Jio');

  const categories = [
    { id: 'recharge', label: 'Mobile Recharge', icon: Smartphone, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'electricity', label: 'Electricity', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { id: 'dth', label: 'DTH / Cable TV', icon: Tv, color: 'text-purple-600 bg-purple-50' },
    { id: 'fastag', label: 'FASTag Recharge', icon: Car, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'broadband', label: 'Broadband / WiFi', icon: Wifi, color: 'text-blue-600 bg-blue-50' },
    { id: 'creditcard', label: 'Credit Card Bill', icon: CreditCard, color: 'text-rose-600 bg-rose-50' },
    { id: 'water', label: 'Water Utility', icon: Droplets, color: 'text-teal-600 bg-teal-50' },
    { id: 'gas', label: 'Piped Gas', icon: Flame, color: 'text-orange-600 bg-orange-50' },
  ];

  const rechargePlans = [
    {
      id: 'p1',
      price: 299,
      validity: '28 Days',
      data: '1.5 GB/Day',
      calls: 'Truly Unlimited',
      popular: true,
      tag: 'Best Value',
    },
    {
      id: 'p2',
      price: 349,
      validity: '28 Days',
      data: '2.0 GB/Day',
      calls: 'Unlimited + 5G Unlimited',
      popular: false,
      tag: 'True 5G',
    },
    {
      id: 'p3',
      price: 719,
      validity: '84 Days',
      data: '1.5 GB/Day',
      calls: 'Truly Unlimited + 100 SMS/day',
      popular: true,
      tag: 'Most Popular',
    },
    {
      id: 'p4',
      price: 999,
      validity: '84 Days',
      data: '3.0 GB/Day',
      calls: 'Unlimited + Hero Unlimited Night Data',
      popular: false,
      tag: 'Heavy Data',
    },
  ];

  const pendingBills = [
    {
      id: 'b1',
      biller: 'BESCOM Electricity (Bangalore)',
      category: 'Electricity',
      caNumber: '1098234512',
      amount: 1420.00,
      dueDate: 'Due in 3 days (03 Nov)',
      icon: Zap,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'b2',
      biller: 'Airtel Xstream Fiber (Broadband)',
      category: 'Broadband',
      caNumber: '080-49102931',
      amount: 943.00,
      dueDate: 'Due in 5 days (05 Nov)',
      icon: Wifi,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'b3',
      biller: 'ICICI Bank Coral Credit Card',
      category: 'Credit Card',
      caNumber: '•••• 8912',
      amount: 4520.00,
      dueDate: 'Due on 10 Nov',
      icon: CreditCard,
      iconBg: 'bg-rose-50 text-rose-600',
    },
  ];

  const handlePayBill = (bill) => {
    setPendingPayment({
      recipient: bill.biller,
      upiId: `${bill.biller.toLowerCase().replace(/[^a-z]/g, '')}@billdesk`,
      amount: bill.amount,
      note: `Bill for ${bill.caNumber}`,
      bank: selectedBank,
      category: bill.category,
      type: 'Bill Payment',
    });
    setActiveModal('confirmPayment');
  };

  const handlePayPlan = (plan) => {
    setPendingPayment({
      recipient: `${selectedOperator} Prepaid Recharge`,
      upiId: `${selectedOperator.toLowerCase()}recharge@smartpay`,
      amount: plan.price,
      note: `Recharge for +91 ${mobileNumber} (${plan.validity})`,
      bank: selectedBank,
      category: 'Recharge',
      type: 'Mobile Recharge',
    });
    setActiveModal('confirmPayment');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 1. Header Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6222BD] via-[#752DE0] to-[#8B5CF6] text-white p-6 sm:p-8 shadow-xl shadow-purple-500/20 border border-purple-400/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-bold border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Bharat BillPay (BBPS) Certified • 0% Platform Fee</span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bills, Recharges & Utilities
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/90 mt-1 max-w-lg leading-relaxed">
              Instant settlement across 20,000+ electricity boards, telecom operators, DTH providers, and FASTag issuers with auto-fetch and receipt confirmation.
            </p>
          </div>

          <div className="flex-shrink-0 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center w-full md:w-56">
            <span className="text-[10px] uppercase font-extrabold text-purple-200 tracking-wider block">
              Cashback Booster
            </span>
            <div className="text-2xl font-black text-white mt-0.5">Up to ₹75</div>
            <span className="text-[11px] text-purple-100/80 mt-0.5 block">
              Auto-credited to wallet on electricity & broadband bills
            </span>
          </div>
        </div>
      </div>

      {/* 2. Urgent Pending Bills Due Alert */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9D5FF] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-[#1E1B4B]">Pending Due Bills (3)</h2>
            <p className="text-xs text-[#718096]">Fetched automatically via NPCI BBPS mapper</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Due This Week
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {pendingBills.map((bill) => {
            const Icon = bill.icon;
            return (
              <div
                key={bill.id}
                className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] hover:border-[#7C3AED] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${bill.iconBg}`}>
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {bill.dueDate}
                    </span>
                  </div>

                  <h3 className="text-xs font-extrabold text-[#1E1B4B] mt-2.5 truncate">
                    {bill.biller}
                  </h3>
                  <p className="text-[11px] text-[#718096] font-mono mt-0.5">
                    Account: {bill.caNumber}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#718096] uppercase font-bold block">Bill Amount</span>
                    <strong className="text-base font-extrabold text-[#1E1B4B] font-sans">
                      ₹{bill.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>

                  <button
                    onClick={() => handlePayBill(bill)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span>Pay Bill</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BBPS Category Selector Grid */}
      <div>
        <h2 className="text-base font-extrabold text-[#1E1B4B] mb-3">All Bill & Recharge Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#EDE9FE] border-[#7C3AED] shadow-sm'
                    : 'bg-white border-[#E9D5FF] hover:border-slate-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.color}`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="truncate">
                  <span className={`text-xs font-extrabold block truncate ${isSelected ? 'text-[#6222BD]' : 'text-[#1E1B4B]'}`}>
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-[#718096]">Instant Pay</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Interactive Service Panel (Mobile Recharge / Biller Input) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9D5FF] shadow-card">
        {activeCategory === 'recharge' ? (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-[#1E1B4B]">Instant Mobile Prepaid Recharge</h3>
              <p className="text-xs text-[#718096]">Choose telecom circle, browse packs, and pay in 1 tap</p>
            </div>

            {/* Mobile & Operator Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#718096] mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-[#1E1B4B]">+91</span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 10-digit number"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#718096] mb-1.5">
                  Operator Circle
                </label>
                <select
                  value={selectedOperator}
                  onChange={(e) => setSelectedOperator(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="Jio">Jio (5G Ready)</option>
                  <option value="Airtel">Airtel 5G Plus</option>
                  <option value="Vi">Vodafone Idea (Vi)</option>
                  <option value="BSNL">BSNL Prepaid</option>
                </select>
              </div>
            </div>

            {/* Popular Plans List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                  Recommended Recharge Packs for {selectedOperator}
                </span>
                <span className="text-xs font-bold text-[#7C3AED]">0% Extra Fee</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {rechargePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 rounded-2xl border border-[#E9D5FF] bg-[#F5F3FF] hover:border-[#7C3AED] hover:bg-white transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#1E1B4B] font-sans">
                          ₹{plan.price}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE9FE] text-[#7C3AED] border border-[#8B5CF6]/20">
                          {plan.tag}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-xs">
                        <div className="flex justify-between text-[#718096]">
                          <span>Validity</span>
                          <strong className="text-[#1E1B4B]">{plan.validity}</strong>
                        </div>
                        <div className="flex justify-between text-[#718096]">
                          <span>Data</span>
                          <strong className="text-[#1E1B4B]">{plan.data}</strong>
                        </div>
                        <div className="flex justify-between text-[#718096]">
                          <span>Voice</span>
                          <strong className="text-emerald-700 font-semibold">{plan.calls}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePayPlan(plan)}
                      className="w-full mt-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
                    >
                      Recharge ₹{plan.price}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-[#1E1B4B]">
                Fetch & Pay {categories.find((c) => c.id === activeCategory)?.label}
              </h3>
              <p className="text-xs text-[#718096]">
                Enter Consumer / Account Number to fetch official bill from utility servers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#718096] mb-1.5">
                  Select Board / Provider
                </label>
                <input
                  type="text"
                  placeholder="e.g. BESCOM, Tata Power, IGL, Fastag"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#718096] mb-1.5">
                  Consumer ID / Account Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1098234512"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Fetched latest bill of ₹1,420 from utility server!', 'success');
                handlePayBill(pendingBills[0]);
              }}
              className="py-3 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Fetch Bill & Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
