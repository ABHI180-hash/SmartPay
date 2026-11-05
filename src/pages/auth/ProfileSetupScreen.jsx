import React, { useState } from 'react';
import { ArrowLeft, User, Camera, Check, Building2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileSetupScreen = () => {
  const { user, setUser, setPlatformMode, showToast } = useApp();
  const [handle, setHandle] = useState('avijit');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const handleFinish = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      upiId: `${handle}@smartpay`,
    }));
    showToast('SmartPay profile configured successfully!', 'success');
    setPlatformMode('personal');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#F6F3EC] to-[#F2EFE8] flex items-center justify-center p-4 sm:p-6 text-[#1E1B4B]">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-[#E9D5FF] p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#718096] uppercase tracking-wider">
            Step 3 of 3
          </span>
          <span className="text-xs font-bold text-[#7C3AED]">Almost Done!</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B] tracking-tight">
          Setup Your SmartPay UPI
        </h2>
        <p className="text-xs text-[#718096] mt-0.5">
          Choose your unique UPI ID and link your primary bank account.
        </p>

        <form onSubmit={handleFinish} className="mt-6 space-y-5">
          {/* Avatar selector */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-[#EDE9FE] shadow-md"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#7C3AED] text-white shadow-md hover:bg-[#6222BD]"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs font-semibold text-[#1E1B4B] mt-2">{user.name}</span>
          </div>

          {/* UPI Handle input */}
          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">
              Create UPI ID
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9.]/g, ''))}
                className="w-full pl-3 pr-24 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                required
              />
              <span className="absolute right-3 text-xs font-mono font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded">
                @smartpay
              </span>
            </div>
            <p className="text-[11px] text-[#718096] mt-1">
              Your payments will arrive at <strong className="text-[#1E1B4B]">{handle}@smartpay</strong>
            </p>
          </div>

          {/* Bank selection */}
          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">
              Select Primary Bank Account
            </label>
            <div className="space-y-2">
              {['HDFC Bank •••• 5543', 'State Bank of India •••• 2512', 'ICICI Bank •••• 9104'].map((bank) => (
                <div
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedBank === bank
                      ? 'border-[#7C3AED] bg-[#EDE9FE]/30 font-bold'
                      : 'border-[#EDE9FE] bg-white'
                  }`}
                >
                  <span className="text-xs text-[#1E1B4B]">{bank}</span>
                  {selectedBank === bank && (
                    <span className="w-4 h-4 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/30 transition-all active:scale-[0.99]"
          >
            Complete Setup & Enter SmartPay
          </button>
        </form>
      </div>
    </div>
  );
};
