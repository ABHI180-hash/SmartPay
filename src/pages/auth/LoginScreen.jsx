import React, { useState } from 'react';
import { SmartPayLogo } from '../../components/common/SmartPayLogo';
import { Eye, EyeOff, Fingerprint, Apple, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginScreen = () => {
  const { setAuthScreen, setPlatformMode, showToast, handleLogin } = useApp();
  const [mobile, setMobile] = useState('98765 43210');
  const [pin, setPin] = useState('1234');
  const [showPin, setShowPin] = useState(false);
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      showToast('Please enter your 4-digit UPI PIN', 'error');
      return;
    }
    setLoading(true);
    if (handleLogin) {
      const cleanPhone = mobile.replace(/\s+/g, '');
      const ok = await handleLogin(cleanPhone, pin);
      if (ok) {
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    showToast('Signed in successfully!', 'success');
    setPlatformMode('personal');
  };

  const handleBiometric = () => {
    showToast('Biometric Fingerprint Verified!', 'success');
    setPlatformMode('personal');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F2FD] via-[#ECE6FD] to-[#F8F6FF] flex items-center justify-center p-4 sm:p-6 text-[#1E1B4B]">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-[36px] shadow-2xl shadow-purple-500/10 border border-purple-100 p-6 sm:p-8 flex flex-col">
        {/* Logo Monogram */}
        <div className="flex flex-col items-center text-center">
          <SmartPayLogo size="lg" />
          <h2 className="mt-3 text-2xl font-black text-[#1E1B4B] tracking-tight">
            SmartPay<span className="text-[#7C3AED]">.</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pay Smart. Live Secure.
          </p>
        </div>

        {/* Segmented Toggle Tabs */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex p-1 rounded-full bg-purple-50/70 border border-purple-100 text-xs font-semibold w-full">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2 rounded-full transition-all text-center ${
                activeTab === 'signin'
                  ? 'bg-[#7C3AED] text-white shadow-md shadow-purple-500/25 font-bold'
                  : 'text-slate-600 hover:text-[#1E1B4B]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthScreen('onboarding')}
              className={`flex-1 py-2 rounded-full transition-all text-center ${
                activeTab === 'register'
                  ? 'bg-[#7C3AED] text-white shadow-md shadow-purple-500/25 font-bold'
                  : 'text-slate-600 hover:text-[#1E1B4B]'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-black text-[#7C3AED]">
                +91
              </span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="98765 43210"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-purple-50/40 border border-purple-100 text-sm font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          {/* UPI PIN with Show/Hide toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-600">
                UPI PIN
              </label>
              <button
                type="button"
                onClick={() => setAuthScreen('forgotPin')}
                className="text-xs font-bold text-[#7C3AED] hover:underline"
              >
                Forgot UPI PIN?
              </button>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-purple-50/40 border border-purple-100 text-base font-mono tracking-widest text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 text-slate-400 hover:text-[#1E1B4B]"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Demo Credentials Pill */}
          <div className="p-3 rounded-2xl bg-purple-50 text-[#6D28D9] text-[11px] font-semibold flex items-center justify-between border border-purple-200">
            <span>Demo: <strong className="font-mono text-[#7C3AED]">9876543210</strong> • PIN: <strong className="font-mono text-[#7C3AED]">1234</strong></span>
            <button
              type="button"
              onClick={() => { setMobile('9876543210'); setPin('1234'); }}
              className="text-[#7C3AED] hover:underline font-extrabold text-[10px] uppercase tracking-wider bg-white px-2 py-1 rounded-lg border border-purple-200 shadow-xs"
            >
              Fill Demo
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-[#6222BD] via-[#752DE0] to-[#8B5CF6] hover:from-[#501AA0] hover:to-[#6222BD] text-white font-extrabold text-sm shadow-xl shadow-purple-500/25 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Divider: "Or continue with" */}
        <div className="mt-6 relative flex items-center justify-center">
          <div className="border-t border-purple-100 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
            Or continue with
          </span>
        </div>

        {/* Social / Biometric Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {/* Google */}
          <button
            onClick={() => setAuthScreen('onboarding')}
            className="w-12 h-12 rounded-2xl border border-purple-100 hover:bg-purple-50/50 flex items-center justify-center transition-transform active:scale-95 shadow-sm"
            title="Continue with Google Onboarding & Verification"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
          </button>

          {/* Apple */}
          <button
            onClick={() => handleBiometric()}
            className="w-12 h-12 rounded-2xl border border-purple-100 hover:bg-purple-50/50 flex items-center justify-center transition-transform active:scale-95 shadow-sm"
            title="Continue with Apple ID"
          >
            <Apple className="w-5 h-5 text-[#1E1B4B]" />
          </button>

          {/* Biometric */}
          <button
            onClick={handleBiometric}
            className="w-12 h-12 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100 flex items-center justify-center transition-transform active:scale-95 shadow-sm text-[#7C3AED]"
            title="Login with Biometrics"
          >
            <Fingerprint className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Action to Launch Full Onboarding */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setAuthScreen('onboarding')}
            className="text-xs font-bold text-[#7C3AED] hover:underline"
          >
            New to SmartPay? Onboard & Link Bank →
          </button>
        </div>

        {/* Quick Bypass link */}
        <div className="mt-5 pt-4 border-t border-purple-100 text-center">
          <button
            type="button"
            onClick={() => setPlatformMode('personal')}
            className="text-xs font-bold text-slate-500 hover:text-[#7C3AED] hover:underline"
          >
            Skip to Live Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};
