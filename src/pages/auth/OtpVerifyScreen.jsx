import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OtpVerifyScreen = () => {
  const { setAuthScreen, showToast } = useApp();
  const [otp, setOtp] = useState(['5', '8', '2', '9', '', '']);
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    showToast('Mobile verified successfully!', 'success');
    setAuthScreen('profileSetup');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#F6F3EC] to-[#F2EFE8] flex items-center justify-center p-4 sm:p-6 text-[#1E1B4B]">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-[#E9D5FF] p-6 sm:p-8 flex flex-col text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setAuthScreen('login')}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#718096]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-[#718096] uppercase tracking-wider">
            Step 2 of 3
          </span>
          <div className="w-8" />
        </div>

        <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#1E1B4B] tracking-tight">
          Verify Mobile
        </h2>
        <p className="text-xs text-[#718096] mt-1 max-w-xs mx-auto">
          We sent a 6-digit verification code to <br />
          <strong className="text-[#1E1B4B]">+91 98765 43210</strong>
        </p>

        {/* 6 Digit Inputs */}
        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold text-[#1E1B4B] rounded-2xl bg-slate-50 border-2 border-[#EDE9FE] focus:border-[#7C3AED] focus:bg-white focus:outline-none transition-all shadow-sm"
              />
            ))}
          </div>

          <div className="text-xs text-[#718096]">
            {timer > 0 ? (
              <span>Resend OTP in <strong className="text-[#7C3AED] font-mono">00:{timer < 10 ? `0${timer}` : timer}</strong></span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(45)}
                className="font-bold text-[#7C3AED] hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/30 transition-all active:scale-[0.99]"
          >
            Verify & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};
