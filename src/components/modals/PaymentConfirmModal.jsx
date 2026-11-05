import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  Lock,
  AlertTriangle,
  Fingerprint,
  KeyRound,
  Check,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentConfirmModal = ({ onClose }) => {
  const {
    pendingPayment,
    setPendingPayment,
    selectedBank,
    setActiveModal,
    executePayment,
    showToast,
  } = useApp();

  const [note, setNote] = useState(pendingPayment.note || 'Food Order 😋');
  const [simulateFail, setSimulateFail] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment authorization method: 'biometric' | 'pin'
  const [authMethod, setAuthMethod] = useState('biometric');
  const [pin, setPin] = useState('1234');
  const [showPin, setShowPin] = useState(false);
  
  // Biometric scanning state
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);

  // Trigger 1-Touch Biometric Fingerprint Pay
  const handleBiometricPay = async () => {
    setBiometricScanning(true);
    
    // Haptic vibration feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([40, 60, 40]);
    }

    // Simulate authentic device biometric hardware scan (800ms)
    setTimeout(async () => {
      setBiometricScanning(false);
      setBiometricVerified(true);
      showToast('Biometric fingerprint recognized & authenticated!', 'success');

      setIsProcessing(true);
      try {
        await executePayment({
          recipient: pendingPayment.recipient,
          upiId: pendingPayment.upiId,
          amount: pendingPayment.amount,
          note: note,
          bank: selectedBank,
          failureSimulation: simulateFail,
          authMethod: 'biometric',
        });
      } finally {
        setIsProcessing(false);
      }
    }, 850);
  };

  // Traditional UPI PIN Pay
  const handlePinPay = async (e) => {
    if (e) e.preventDefault();
    if (!pin || pin.length < 4) {
      showToast('Please enter your 4-digit UPI PIN', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      await executePayment({
        recipient: pendingPayment.recipient,
        upiId: pendingPayment.upiId,
        amount: pendingPayment.amount,
        note: note,
        bank: selectedBank,
        failureSimulation: simulateFail,
        authMethod: 'pin',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full sm:h-auto sm:max-h-[92vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#172B3A]">
        {/* Purple Header matching reference image */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] text-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-base font-extrabold text-white tracking-tight">Payment Confirmation</h2>
            <p className="text-[10px] text-purple-200 font-medium">NPCI 256-Bit Encrypted</p>
          </div>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Merchant Payee Details matching reference image */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6D28D9] to-[#7C3AED] flex items-center justify-center text-white font-extrabold text-base shadow-md flex-shrink-0">
              {pendingPayment.recipient ? pendingPayment.recipient.substring(0, 2).toUpperCase() : 'SP'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-[#1E1B4B] truncate">
                {pendingPayment.recipient || 'Zomato'}
              </h3>
              <p className="text-xs text-slate-500 font-mono truncate">
                {pendingPayment.upiId || 'zomato@upi'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified
            </span>
          </div>

          {/* Large Amount Display matching reference image */}
          <div className="text-center py-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Transfer Amount
            </span>
            <div className="mt-1 flex items-baseline justify-center gap-1 font-sans">
              <span className="text-2xl font-bold text-[#1E1B4B]">₹</span>
              <span className="text-4xl sm:text-5xl font-black text-[#1E1B4B] tracking-tight">
                {parseFloat(pendingPayment.amount || 250).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* Add a note matching reference image */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Add a note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Food Order, Rent, Groceries"
              className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-sm font-medium text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED] transition-colors"
            />
          </div>

          {/* Pay from Bank selector matching reference image */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Pay from Linked Account
            </label>
            <div
              onClick={() => setActiveModal('selectBank')}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-purple-100 bg-white hover:bg-purple-50/40 cursor-pointer transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm bg-[#7C3AED]"
                >
                  {selectedBank?.logoText || (selectedBank?.name ? selectedBank.name.substring(0, 4).toUpperCase() : 'HDFC')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E1B4B]">{selectedBank?.name || 'HDFC Bank'}</h4>
                  <p className="text-xs text-slate-400">{selectedBank?.accountNumber || '•••• 7382'}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* CHOOSE AUTHORIZATION METHOD: BIOMETRIC FINGERPRINT VS PIN */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                Authorization Method
              </span>

              {/* Segmented Switcher */}
              <div className="inline-flex p-0.5 rounded-xl bg-white border border-purple-200 text-xs font-semibold shadow-xs">
                <button
                  type="button"
                  onClick={() => setAuthMethod('biometric')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    authMethod === 'biometric'
                      ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                      : 'text-slate-500 hover:text-[#1E1B4B]'
                  }`}
                >
                  <Fingerprint className="w-3 h-3" />
                  <span>Fingerprint</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('pin')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    authMethod === 'pin'
                      ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                      : 'text-slate-500 hover:text-[#1E1B4B]'
                  }`}
                >
                  <KeyRound className="w-3 h-3" />
                  <span>UPI PIN</span>
                </button>
              </div>
            </div>

            {/* TAB 1: 1-TOUCH BIOMETRIC SENSOR */}
            {authMethod === 'biometric' && (
              <div className="p-4 rounded-2xl bg-white border border-purple-100 flex flex-col items-center text-center space-y-3 shadow-xs">
                {/* Fingerprint Interactive Sensor Button */}
                <div className="relative">
                  <div className={`absolute -inset-2 rounded-full bg-purple-400/20 ${biometricScanning ? 'animate-ping' : 'animate-pulse'}`} />

                  <button
                    type="button"
                    onClick={handleBiometricPay}
                    disabled={biometricScanning || isProcessing}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-lg ${
                      biometricVerified
                        ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                        : biometricScanning
                        ? 'bg-[#7C3AED] text-white shadow-purple-500/40'
                        : 'bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] text-white shadow-purple-500/30 hover:scale-105'
                    }`}
                    title="Touch sensor to pay directly"
                  >
                    {biometricVerified ? (
                      <Check className="w-10 h-10 stroke-[3] text-white animate-in zoom-in" />
                    ) : (
                      <Fingerprint className={`w-11 h-11 stroke-[2.2] ${biometricScanning ? 'animate-bounce' : ''}`} />
                    )}
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1E1B4B]">
                    {biometricScanning
                      ? 'Scanning Fingerprint Sensor...'
                      : biometricVerified
                      ? 'Identity Verified!'
                      : 'Touch Fingerprint Sensor to Pay'}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
                    {biometricScanning
                      ? 'Please keep your finger steady on your device sensor...'
                      : 'Fast, secure biometric 1-touch payment without typing UPI PIN'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBiometricPay}
                  disabled={biometricScanning || isProcessing}
                  className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#7C3AED] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Fingerprint className="w-4 h-4 stroke-[2.5]" />
                  <span>Tap Here to Trigger Fingerprint Scan</span>
                </button>
              </div>
            )}

            {/* TAB 2: TRADITIONAL 4-DIGIT UPI PIN */}
            {authMethod === 'pin' && (
              <div className="p-4 rounded-2xl bg-white border border-purple-100 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-500">
                    Enter 4-Digit UPI PIN
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-xs text-[#7C3AED] font-bold hover:underline flex items-center gap-1"
                  >
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPin ? 'Hide' : 'Show'}</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="••••"
                    className="w-full text-center py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xl font-mono tracking-widest font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  NPCI UPI PIN is never stored and transmitted via hardware encryption.
                </p>
              </div>
            )}
          </div>

          {/* Secure Payment & Simulation Helper */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-500 bg-purple-50/40 p-2.5 rounded-xl border border-dashed border-purple-200">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Simulate Bank Server Failure:
            </span>
            <input
              type="checkbox"
              checked={simulateFail}
              onChange={(e) => setSimulateFail(e.target.checked)}
              className="w-4 h-4 rounded text-[#7C3AED] focus:ring-[#7C3AED] cursor-pointer"
            />
          </div>
        </div>

        {/* Bottom Pay Button matching reference image */}
        <div className="p-4 sm:p-5 border-t border-purple-100 bg-white">
          {authMethod === 'biometric' ? (
            <button
              onClick={handleBiometricPay}
              disabled={isProcessing || biometricScanning}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] hover:brightness-105 disabled:opacity-75 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isProcessing || biometricScanning ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Fingerprint & Paying...</span>
                </>
              ) : (
                <>
                  <Fingerprint className="w-5 h-5 stroke-[2.5]" />
                  <span>Pay ₹{parseFloat(pendingPayment.amount || 250).toLocaleString('en-IN')} with Fingerprint</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handlePinPay}
              disabled={isProcessing}
              className="w-full py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-75 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing UPI PIN...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay ₹{parseFloat(pendingPayment.amount || 250).toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
