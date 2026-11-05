import React from 'react';
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const TransactionStatusBadge = ({ status = 'Success' }) => {
  if (status === 'Success') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        <span>Success</span>
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600">
        <Clock className="w-3 h-3" />
        <span>Pending</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600">
      <AlertCircle className="w-3 h-3" />
      <span>Failed</span>
    </span>
  );
};

export const TransactionCard = ({ txn, onClick, compact = false }) => {
  const isIncoming = txn.direction === 'incoming';

  return (
    <div
      onClick={() => onClick && onClick(txn)}
      className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#F5F3FF] border border-transparent hover:border-[#E9D5FF] transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar or Brand Icon */}
        <div className="relative flex-shrink-0">
          {txn.avatar ? (
            <img
              src={txn.avatar}
              alt={txn.name}
              className="w-10 h-10 rounded-full object-cover border border-[#EDE9FE]"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm ${
                txn.iconBg || 'bg-[#1E1B4B]'
              }`}
            >
              {txn.iconText || txn.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          {/* Direction indicator pip */}
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white shadow-sm ${
              isIncoming ? 'bg-[#8B5CF6]' : 'bg-[#1E1B4B]'
            }`}
          >
            {isIncoming ? (
              <ArrowDownLeft className="w-2.5 h-2.5 stroke-[3]" />
            ) : (
              <ArrowUpRight className="w-2.5 h-2.5 stroke-[3]" />
            )}
          </span>
        </div>

        {/* Name and timestamp */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#1E1B4B] truncate group-hover:text-[#7C3AED] transition-colors">
            {txn.name}
          </p>
          <p className="text-xs text-[#718096] truncate">
            {txn.time} {txn.category ? `• ${txn.category}` : ''}
          </p>
        </div>
      </div>

      {/* Amount and optional status */}
      <div className="text-right flex-shrink-0 pl-2">
        <p
          className={`text-sm sm:text-base font-bold tracking-tight ${
            isIncoming ? 'text-[#8B5CF6]' : 'text-[#1E1B4B]'
          }`}
        >
          {isIncoming ? '+' : '-'} ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: txn.amount % 1 === 0 ? 0 : 2 })}
        </p>
        {!compact && (
          <div className="mt-0.5">
            <TransactionStatusBadge status={txn.status} />
          </div>
        )}
      </div>
    </div>
  );
};
