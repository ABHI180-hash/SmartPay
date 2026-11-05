import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ForgotPinScreen = () => {
  const { setAuthScreen, showToast } = useApp();
  const [mobile, setMobile] = useState('+91 98765 43210');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Reset OTP sent to your registered mobile!', 'info');
    setAuthScreen('otp');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#F6F3EC] to-[#F2EFE8] flex items-center justify-center p-4 sm:p-6 text-[#1E1B4B]">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-[#E9D5FF] p-6 sm:p-8 flex flex-col text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setAuthScreen('login')}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#718096]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center mx-auto mb-3">
          <KeyRound className="w-7 h-7" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B] tracking-tight">
          Reset UPI PIN
        </h2>
        <p className="text-xs text-[#718096] mt-1 max-w-xs mx-auto">
          Enter your registered mobile number to receive a secure PIN reset authorization code.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">
              Registered Mobile Number
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/30 transition-all active:scale-[0.99]"
          >
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
};
