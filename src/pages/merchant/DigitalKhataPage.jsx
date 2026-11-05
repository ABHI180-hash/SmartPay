import React, { useState } from 'react';
import { BookOpen, Send, Phone, CheckCircle2, Plus, Download, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DigitalKhataPage = () => {
  const { merchant, setMerchant, showToast, settleMerchantDue, remindMerchantDue } = useApp();
  const dues = merchant.pendingDuesList || [];

  const handleSendReminder = (customer) => {
    if (remindMerchantDue) {
      remindMerchantDue(customer.id, customer.name, customer.amount);
    } else {
      showToast(`WhatsApp reminder sent to ${customer.name} for ₹${customer.amount}!`, 'success');
    }
  };

  const handleRecordSettlement = (id, customerName, amt) => {
    if (settleMerchantDue) {
      settleMerchantDue(id, customerName, amt);
    } else {
      setMerchant((prev) => ({
        ...prev,
        pendingDues: Math.max(0, prev.pendingDues - amt),
        pendingCustomersCount: Math.max(0, prev.pendingCustomersCount - 1),
        totalReceived: prev.totalReceived + amt,
        pendingDuesList: prev.pendingDuesList.filter((d) => d.id !== id),
      }));
      showToast(`Recorded full settlement of ₹${amt} from ${customerName}`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight">
            Digital Khata (Customer Credit Ledger)
          </h2>
          <p className="text-xs text-[#718096]">
            Track udhaar, automate WhatsApp collection reminders, and reconcile settlements
          </p>
        </div>

        <button
          onClick={() => showToast('Opening new customer credit modal...', 'info')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Customer Udhaar</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Total Outstanding Credit
          </span>
          <div className="text-2xl font-extrabold text-amber-900 mt-1">
            ₹{merchant.pendingDues.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-amber-700 mt-0.5 block">
            Across {dues.length} regular store customers
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Average Collection Period
          </span>
          <div className="text-2xl font-extrabold text-emerald-900 mt-1">
            4.2 Days
          </div>
          <span className="text-xs text-emerald-700 mt-0.5 block">
            88% settled within 1 week
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
            Auto-Reminders
          </span>
          <div className="text-2xl font-extrabold text-blue-900 mt-1">
            Active
          </div>
          <span className="text-xs text-blue-700 mt-0.5 block">
            Free automated WhatsApp links
          </span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-[#EDE9FE] shadow-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#EDE9FE] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1E1B4B]">Pending Customer Balances</h3>
          <span className="text-xs text-[#718096]">{dues.length} records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {dues.map((due) => (
            <div
              key={due.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#1E1B4B]">{due.name}</h4>
                  <span className="text-xs font-mono text-[#718096]">{due.phone}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {due.daysPending} days overdue
                  </span>
                </div>
                <p className="text-xs text-[#718096] mt-1">
                  Items: <span className="text-[#1E1B4B]">{due.items}</span> • Last purchased: {due.lastPurchased}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-xs text-[#718096] block">Due Amount</span>
                  <span className="text-base font-extrabold text-[#1E1B4B]">
                    ₹{due.amount.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => handleSendReminder(due)}
                  className="px-3 py-1.5 rounded-xl bg-[#EDE9FE] hover:bg-[#d0ece8] text-[#6222BD] text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Link</span>
                </button>

                <button
                  onClick={() => handleRecordSettlement(due.id, due.name, due.amount)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Settled</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
