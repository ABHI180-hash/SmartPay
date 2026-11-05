import React, { useState } from 'react';
import { SmartPayLogo } from '../../components/common/SmartPayLogo';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RegisterScreen = () => {
  const { setAuthScreen, showToast } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    referralCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    showToast('OTP sent to your mobile number!', 'info');
    setAuthScreen('otp');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#F6F3EC] to-[#F2EFE8] flex items-center justify-center p-4 sm:p-6 text-[#1E1B4B]">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-[#E9D5FF] p-6 sm:p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setAuthScreen('login')}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#718096]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SmartPayLogo size="sm" />
          <div className="w-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B] tracking-tight">
          Create Account
        </h2>
        <p className="text-xs text-[#718096] mt-0.5">
          Join 10M+ Indians on SmartPay for seamless UPI & Khata.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Avijit Roy"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold focus:outline-none focus:border-[#7C3AED]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">Mobile Number</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-bold text-[#1E1B4B]">+91</span>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="98765 43210"
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm font-semibold focus:outline-none focus:border-[#7C3AED]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#EDE9FE] text-sm focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#718096] mb-1">Referral Code (Optional)</label>
            <input
              type="text"
              value={formData.referralCode}
              onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
              placeholder="e.g. SMART100"
              className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-[#EDE9FE] text-xs font-mono uppercase focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-[#718096]">
            <ShieldCheck className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
            <span>Bank-grade security compliant with RBI guidelines.</span>
          </div>

          <button
            type="submit"
            className="w-full mt-3 py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Verify</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[#718096]">
          Already have an account?{' '}
          <button
            onClick={() => setAuthScreen('login')}
            className="font-bold text-[#7C3AED] hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
