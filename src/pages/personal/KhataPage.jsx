import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  PieChart
} from 'lucide-react';
import { familyKhataData, groupExpensesData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const KhataPage = () => {
  const { setActiveModal, setPendingPayment, showToast, selectedBank } = useApp();
  const [tab, setTab] = useState('family'); // 'family' | 'groups'
  const [family, setFamily] = useState(familyKhataData);
  const [groups, setGroups] = useState(groupExpensesData);

  const handleSettle = (recipientName, amount) => {
    setPendingPayment({
      recipient: recipientName,
      upiId: `${recipientName.toLowerCase().replace(/\s+/g, '')}@smartpay`,
      amount: amount,
      note: 'Khata Settlement',
      bank: selectedBank,
      category: 'Transfer',
    });
    setActiveModal('confirmPayment');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight">
            SmartPay Digital Khata & Split
          </h2>
          <p className="text-xs text-[#718096]">
            Manage household ledgers, roommate expenses, and instant group bill settlements
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-bold border border-[#EDE9FE]">
          <button
            onClick={() => setTab('family')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              tab === 'family' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#718096]'
            }`}
          >
            Family Khata
          </button>
          <button
            onClick={() => setTab('groups')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              tab === 'groups' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#718096]'
            }`}
          >
            Group Split Bills
          </button>
        </div>
      </div>

      {tab === 'family' ? (
        /* Family Khata View */
        <div className="space-y-6">
          {/* Household Budget Progress Card */}
          <div className="bg-gradient-to-r from-[#1E1B4B] to-[#173B5E] text-white rounded-2xl p-6 shadow-md border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  {family.familyName} • {family.month}
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight">
                    ₹{family.totalSpent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-300">
                    spent of ₹{family.totalBudget.toLocaleString('en-IN')} budget
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8B5CF6]/20 text-emerald-300 border border-[#8B5CF6]/30">
                  {Math.round((family.totalSpent / family.totalBudget) * 100)}% Consumed
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full transition-all"
                style={{ width: `${(family.totalSpent / family.totalBudget) * 100}%` }}
              />
            </div>

            {/* Members Split Grid */}
            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {family.members.map((mem) => (
                <div
                  key={mem.name}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5"
                >
                  <img
                    src={mem.avatar}
                    alt={mem.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-400/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{mem.name}</h4>
                    <p className="text-[11px] text-emerald-300">
                      Paid: ₹{mem.contributed.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Household Recurring Services */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#1E1B4B]">
                  Monthly Recurring Household Services
                </h3>
                <p className="text-xs text-[#718096]">
                  Automatic reminders and one-tap payment for household help & bills
                </p>
              </div>

              <button
                onClick={() => showToast('Add new service modal opened', 'info')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDE9FE] text-[#6222BD] text-xs font-bold hover:bg-[#d0ece8]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {family.recurringDues.map((due, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1B4B]">{due.title}</h4>
                    <p className="text-xs text-[#718096]">
                      Due: {due.dueDay} • Paid by: <span className="font-semibold">{due.paidBy}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-[#1E1B4B]">
                      ₹{due.amount.toLocaleString('en-IN')}
                    </span>

                    {due.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#EDE9FE] text-[#8B5CF6]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Paid</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSettle(due.title, due.amount)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED] text-white hover:bg-[#6222BD]"
                      >
                        <Send className="w-3 h-3" />
                        <span>Pay Now</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Group Split Bills View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {groups.map((grp) => (
              <div
                key={grp.id}
                className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#1E1B4B]">{grp.title}</h3>
                      <p className="text-xs text-[#718096] mt-0.5">
                        {grp.members.length} Members: {grp.members.join(', ')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-full">
                      Total: ₹{grp.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Net status */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-[#EDE9FE] flex items-center justify-between">
                    <span className="text-xs text-[#718096]">Your Net Position:</span>
                    {grp.youAreOwed > 0 ? (
                      <span className="text-xs font-bold text-[#8B5CF6]">
                        You are owed ₹{grp.youAreOwed.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-600">
                        You owe ₹{grp.youOwe.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Itemized Splits */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[11px] font-bold text-[#718096] uppercase tracking-wider">
                      Recent Expenses
                    </p>
                    {grp.splits.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0"
                      >
                        <div>
                          <span className="font-semibold text-[#1E1B4B]">{s.title}</span>
                          <span className="text-[#718096] text-[11px] block">
                            Paid by {s.payer}
                          </span>
                        </div>
                        <span className="font-bold text-[#1E1B4B]">
                          ₹{s.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EDE9FE] flex items-center justify-between">
                  {grp.youOwe > 0 ? (
                    <button
                      onClick={() => handleSettle(grp.title, grp.youOwe)}
                      className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Settle ₹{grp.youOwe} via UPI</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => showToast('WhatsApp settlement reminder sent to group members!', 'success')}
                      className="w-full py-2.5 rounded-xl bg-[#EDE9FE] text-[#6222BD] hover:bg-[#d0ece8] text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>Send Friendly WhatsApp Reminder</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
