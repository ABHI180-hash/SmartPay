import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Search,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  RefreshCw,
  Lock,
  Sparkles,
  CreditCard,
  KeyRound,
  ChevronRight,
  User,
  Globe,
  AlertCircle,
  X,
  Check,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { SmartPayLogo } from '../../components/common/SmartPayLogo';
import { useApp } from '../../context/AppContext';
import { bankApi, onboardingApi } from '../../services/api';

export const OnboardingWizard = () => {
  const {
    user,
    setUser,
    setBanks,
    setSelectedBank,
    setPlatformMode,
    setAuthScreen,
    showToast
  } = useApp();

  // Onboarding Screen Steps:
  // 1: WELCOME
  // 2: GOOGLE_SIGNIN
  // 3: MOBILE_OTP
  // 4: SELECT_BANK
  // 5: BANK_DISCOVERY
  // 6: BANK_VERIFICATION
  // 7: CONFIRMATION
  // 'RETURNING_USER': RETURNING_USER_WELCOME
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [language, setLanguage] = useState('English');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [googleUser, setGoogleUser] = useState({
    name: 'Avijit Roy',
    email: 'avijit.roy@gmail.com',
    sub: 'google_oauth_sub_1092830192',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // OTP State
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [otpCanResend, setOtpCanResend] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [simulatedDemoOtp, setSimulatedDemoOtp] = useState('482910');
  const otpInputRefs = useRef([]);

  // Bank Selection State
  const [banksList, setBanksList] = useState([]);
  const [searchBankQuery, setSearchBankQuery] = useState('');
  const [selectedBankObj, setSelectedBankObj] = useState(null);
  const [loadingBanks, setLoadingBanks] = useState(false);

  // Bank Discovery State
  const [discoveringAccounts, setDiscoveringAccounts] = useState(false);
  const [discoveredAccounts, setDiscoveredAccounts] = useState([]);
  const [selectedAccountRef, setSelectedAccountRef] = useState(null);

  // Bank Verification State
  const [verificationMethod, setVerificationMethod] = useState('DEBIT_CARD'); // 'DEBIT_CARD' | 'AADHAAR' | 'FAST_SIM'
  const [debitLast6, setDebitLast6] = useState('891024');
  const [expiryMonth, setExpiryMonth] = useState('08');
  const [expiryYear, setExpiryYear] = useState('29');
  const [aadhaarLast4, setAadhaarLast4] = useState('4512');
  const [isPrimaryBank, setIsPrimaryBank] = useState(true);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState(null);

  // Returning User State
  const [returningUserData, setReturningUserData] = useState(null);
  const [deviceTrustPending, setDeviceTrustPending] = useState(false);
  const [deviceOtpInput, setDeviceOtpInput] = useState('');

  // Fetch supported banks on mount
  useEffect(() => {
    fetchSupportedBanks();
  }, []);

  // OTP Timer countdown
  useEffect(() => {
    let interval = null;
    if (currentStep === 3 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setOtpCanResend(true);
    }
    return () => clearInterval(interval);
  }, [currentStep, otpTimer]);

  const fetchSupportedBanks = async () => {
    setLoadingBanks(true);
    try {
      const res = await bankApi.getSupportedBanks();
      if (res?.data) {
        setBanksList(res.data);
      }
    } catch {
      // Fallback local list
      setBanksList([
        { bankCode: 'SBI', bankName: 'State Bank of India', logoText: 'SBI', brandColor: '#1A5A96', popular: true, supportedFeatures: ['UPI', 'UPI_LITE', 'AUTOPAY'] },
        { bankCode: 'HDFC', bankName: 'HDFC Bank', logoText: 'HDFC', brandColor: '#004C8F', popular: true, supportedFeatures: ['UPI', 'UPI_LITE', 'AUTOPAY'] },
        { bankCode: 'ICICI', bankName: 'ICICI Bank', logoText: 'ICICI', brandColor: '#B02A30', popular: true, supportedFeatures: ['UPI', 'UPI_LITE', 'AUTOPAY'] },
        { bankCode: 'AXIS', bankName: 'Axis Bank', logoText: 'AXIS', brandColor: '#97144D', popular: true, supportedFeatures: ['UPI', 'UPI_LITE', 'AUTOPAY'] },
        { bankCode: 'PNB', bankName: 'Punjab National Bank', logoText: 'PNB', brandColor: '#A2192A', popular: true, supportedFeatures: ['UPI', 'UPI_LITE'] },
        { bankCode: 'BOB', bankName: 'Bank of Baroda', logoText: 'BOB', brandColor: '#F26522', popular: true, supportedFeatures: ['UPI', 'UPI_LITE'] },
        { bankCode: 'KOTAK', bankName: 'Kotak Mahindra Bank', logoText: 'KOTAK', brandColor: '#ED1C24', popular: true, supportedFeatures: ['UPI', 'AUTOPAY'] },
        { bankCode: 'IDFC', bankName: 'IDFC FIRST Bank', logoText: 'IDFC', brandColor: '#9B1A24', popular: true, supportedFeatures: ['UPI', 'AUTOPAY'] },
        { bankCode: 'CANARA', bankName: 'Canara Bank', logoText: 'CANARA', brandColor: '#0093DD', popular: false, supportedFeatures: ['UPI'] },
        { bankCode: 'UNION', bankName: 'Union Bank of India', logoText: 'UNION', brandColor: '#D62329', popular: false, supportedFeatures: ['UPI'] },
        { bankCode: 'INDIAN', bankName: 'Indian Bank', logoText: 'INDIAN', brandColor: '#004B87', popular: false, supportedFeatures: ['UPI'] },
        { bankCode: 'BOI', bankName: 'Bank of India', logoText: 'BOI', brandColor: '#E31E24', popular: false, supportedFeatures: ['UPI'] },
      ]);
    } finally {
      setLoadingBanks(false);
    }
  };

  // SCREEN 1: Continue from Welcome
  const handleWelcomeContinue = () => {
    if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setCurrentStep(2); // Go to Google Sign-In
  };

  // SCREEN 2: Google Sign-in Authentication & Returning User check
  const handleGoogleSelect = async (account) => {
    setShowGoogleModal(false);
    setGoogleUser(account);

    try {
      const res = await onboardingApi.googleAuth({
        googleSubjectId: account.sub,
        email: account.email,
        name: account.name,
        avatarUrl: account.avatar,
        deviceIdentifier: 'browser_fingerprint_' + navigator.userAgent.replace(/\s+/g, '').substring(0, 30),
        deviceName: 'Chrome on Windows 11',
      });

      if (res?.data) {
        const authData = res.data;
        if (authData.accessToken) {
          localStorage.setItem('smartpay_token', authData.accessToken);
          localStorage.setItem('smartpay_refresh_token', authData.refreshToken);
        }

        // Check if Returning User with already verified bank accounts
        if (authData.returningUser && authData.verifiedBanks && authData.verifiedBanks.length > 0) {
          setReturningUserData(authData);
          setDeviceTrustPending(!authData.deviceTrusted);
          setCurrentStep('RETURNING_USER');
          showToast(`Welcome back, ${authData.fullName}!`, 'success');
          return;
        }

        // New user or unverified: Send Mobile OTP
        await triggerSendOtp();
        setCurrentStep(3);
      }
    } catch {
      // Fallback simulation for offline testing
      setCurrentStep(3);
    }
  };

  // SCREEN 3: Send & Verify Mobile OTP
  const triggerSendOtp = async () => {
    setOtpTimer(30);
    setOtpCanResend(false);
    try {
      const res = await onboardingApi.sendMobileOtp({
        mobileNumber: mobileNumber,
        purpose: 'ONBOARDING_MOBILE',
      });
      if (res?.data?.simulatedOtp) {
        setSimulatedDemoOtp(res.data.simulatedOtp);
      }
      showToast('6-digit OTP sent to ' + mobileNumber, 'success');
    } catch {
      showToast('Simulated OTP sent: ' + simulatedDemoOtp, 'info');
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillDemoOtp = () => {
    const digits = simulatedDemoOtp.split('');
    setOtpValues(digits);
    showToast('Auto-filled Demo OTP ' + simulatedDemoOtp, 'success');
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otpValues.join('');
    if (fullOtp.length < 6) {
      showToast('Please enter complete 6-digit OTP', 'error');
      return;
    }

    try {
      await onboardingApi.verifyMobileOtp({
        mobileNumber: mobileNumber,
        otp: fullOtp,
        purpose: 'ONBOARDING_MOBILE',
      });
      showToast('Mobile number verified successfully!', 'success');
      setCurrentStep(4); // Select Bank
    } catch (err) {
      setOtpAttempts((prev) => prev + 1);
      // If error is handled in backend or dev mode fallback
      if (fullOtp === simulatedDemoOtp || fullOtp === '482910') {
        showToast('Mobile verified (Dev Simulation)', 'success');
        setCurrentStep(4);
      } else {
        showToast(err?.message || 'Invalid OTP. Try demo OTP: 482910', 'error');
      }
    }
  };

  // SCREEN 4: Select Bank & Initiate Discovery
  const handleSelectBank = async (bank) => {
    setSelectedBankObj(bank);
    setCurrentStep(5); // Go to Bank Discovery
    initiateBankDiscovery(bank);
  };

  // SCREEN 5: Bank Discovery via PSP
  const initiateBankDiscovery = async (bank) => {
    setDiscoveringAccounts(true);
    setDiscoveredAccounts([]);

    try {
      const res = await bankApi.discoverAccounts(bank.bankCode, mobileNumber);
      setTimeout(() => {
        if (res?.data && res.data.length > 0) {
          setDiscoveredAccounts(res.data);
          setSelectedAccountRef(res.data[0].accountReference);
        } else {
          // Fallback generated mock accounts
          const mockDiscovered = [
            {
              accountReference: 'ACC_REF_MOCK_1',
              bankCode: bank.bankCode,
              bankName: bank.bankName,
              maskedAccountNumber: '•••• 5432',
              accountHolderName: googleUser.name.toUpperCase(),
              accountType: 'SAVINGS',
              ifscCode: (bank.ifscPrefix || bank.bankCode) + '0001048',
              branchName: 'Main Financial Hub Branch',
              eligibleForUpi: true,
              supportsAadhaar: true,
            },
            {
              accountReference: 'ACC_REF_MOCK_2',
              bankCode: bank.bankCode,
              bankName: bank.bankName,
              maskedAccountNumber: '•••• 8910',
              accountHolderName: googleUser.name.toUpperCase(),
              accountType: 'CURRENT',
              ifscCode: (bank.ifscPrefix || bank.bankCode) + '0002091',
              branchName: 'Corporate Metro Branch',
              eligibleForUpi: true,
              supportsAadhaar: true,
            },
          ];
          setDiscoveredAccounts(mockDiscovered);
          setSelectedAccountRef(mockDiscovered[0].accountReference);
        }
        setDiscoveringAccounts(false);
      }, 1200);
    } catch {
      setTimeout(() => {
        setDiscoveringAccounts(false);
      }, 1000);
    }
  };

  // SCREEN 6: Verify Bank Account via Debit Card / Aadhaar
  const handleVerifyBankDetails = async () => {
    const selectedAcc = discoveredAccounts.find((a) => a.accountReference === selectedAccountRef) || {
      bankCode: selectedBankObj?.bankCode || 'HDFC',
      bankName: selectedBankObj?.bankName || 'HDFC Bank',
      maskedAccountNumber: '•••• 5432',
      accountHolderName: googleUser.name,
      ifscCode: 'HDFC0001048',
      accountType: 'SAVINGS',
    };

    setVerifyingAccount(true);

    try {
      const res = await bankApi.verifyAccount({
        bankCode: selectedAcc.bankCode,
        maskedAccountNumber: selectedAcc.maskedAccountNumber,
        accountHolderName: selectedAcc.accountHolderName,
        ifscCode: selectedAcc.ifscCode,
        accountType: selectedAcc.accountType,
        verificationMethod: verificationMethod,
        debitLast6: debitLast6,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        aadhaarLast4: aadhaarLast4,
        setPrimary: isPrimaryBank,
      });

      const verified = res?.data || {
        bankCode: selectedAcc.bankCode,
        bankName: selectedAcc.bankName,
        accountNumberMasked: selectedAcc.maskedAccountNumber,
        accountHolderName: selectedAcc.accountHolderName,
        providerReference: 'NPCI-PSP-SETU-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        verificationStatus: 'VERIFIED',
        simulatedBalance: 45200.50,
      };

      setVerifiedResult(verified);
      setVerifyingAccount(false);
      setCurrentStep(7); // Account Confirmation
    } catch {
      // Fallback
      setVerifiedResult({
        bankCode: selectedAcc.bankCode,
        bankName: selectedAcc.bankName,
        accountNumberMasked: selectedAcc.maskedAccountNumber,
        accountHolderName: selectedAcc.accountHolderName,
        providerReference: 'NPCI-PSP-SETU-DEMO-' + Date.now().toString().slice(-6),
        verificationStatus: 'VERIFIED',
        simulatedBalance: 45200.50,
      });
      setVerifyingAccount(false);
      setCurrentStep(7);
    }
  };

  // SCREEN 7: Complete Onboarding & Open Dashboard
  const handleFinalConfirmation = async () => {
    try {
      await onboardingApi.complete();
    } catch {
      // Proceed gracefully
    }

    // Update global app state
    setUser((prev) => ({
      ...prev,
      name: googleUser.name,
      email: googleUser.email,
      phone: '+91 ' + mobileNumber,
      avatar: googleUser.avatar,
      upiId: mobileNumber + '@smartpay',
      isOnboarded: true,
    }));

    if (verifiedResult) {
      const newBank = {
        id: verifiedResult.id || Date.now(),
        name: verifiedResult.bankName,
        accountNumber: verifiedResult.accountNumberMasked || '•••• 5432',
        type: 'Savings Account',
        balance: verifiedResult.simulatedBalance || 45200.50,
        isPrimary: isPrimaryBank,
        color: selectedBankObj?.brandColor || '#004c8f',
        logoText: selectedBankObj?.logoText || 'BANK',
      };

      setBanks([newBank]);
      setSelectedBank(newBank);
    }

    showToast('Onboarding complete! Welcome to SmartPay.', 'success');
    setPlatformMode('personal');
    setAuthScreen('login');
  };

  // RETURNING USER: Handle Device Verification (Case B) or Direct Continue (Case A)
  const handleReturningUserContinue = async () => {
    if (deviceTrustPending) {
      if (!deviceOtpInput || deviceOtpInput.length < 6) {
        showToast('Please enter the 6-digit device verification code', 'error');
        return;
      }
      try {
        await onboardingApi.verifyDevice({
          userId: returningUserData.userId,
          deviceIdentifier: 'browser_fingerprint_' + navigator.userAgent.substring(0, 20),
          otp: deviceOtpInput,
        });
        showToast('New device verified and trusted!', 'success');
      } catch {
        showToast('Device verified (Dev Simulation)', 'info');
      }
    }

    // Set user from returning data
    if (returningUserData) {
      setUser((prev) => ({
        ...prev,
        id: returningUserData.userId,
        name: returningUserData.fullName || 'Avijit Roy',
        email: returningUserData.email || 'avijit.roy@gmail.com',
        phone: returningUserData.phone || '+91 98765 43210',
        avatar: returningUserData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        upiId: returningUserData.upiId || 'avijitroy@smartpay',
        isOnboarded: true,
      }));

      if (returningUserData.verifiedBanks && returningUserData.verifiedBanks.length > 0) {
        const banksMapped = returningUserData.verifiedBanks.map((b) => ({
          id: b.id,
          name: b.bankName,
          accountNumber: b.accountNumberMasked,
          type: b.accountType + ' Account',
          balance: b.simulatedBalance || 45200.50,
          isPrimary: b.primary,
          color: '#004c8f',
          logoText: b.bankCode || 'BANK',
        }));
        setBanks(banksMapped);
        setSelectedBank(banksMapped[0]);
      }
    }

    showToast('Welcome back! Direct access to SmartPay dashboard.', 'success');
    setPlatformMode('personal');
  };

  // Filtered banks for Screen 4
  const filteredBanks = banksList.filter(
    (b) =>
      b.bankName.toLowerCase().includes(searchBankQuery.toLowerCase()) ||
      b.bankCode.toLowerCase().includes(searchBankQuery.toLowerCase())
  );
  const popularBanks = banksList.filter((b) => b.popular);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#F3E8FF] flex flex-col items-center justify-center p-3 sm:p-6 text-[#1E1B4B] select-none">
      {/* Top SmartPay Header */}
      <header className="w-full max-w-lg flex items-center justify-between mb-4 px-2">
        <SmartPayLogo size="sm" showTagline={false} />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EDE9FE] text-[#6222BD] border border-[#8B5CF6]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
            NPCI 256-Bit SSL
          </span>
          <button
            onClick={() => setPlatformMode('personal')}
            className="text-xs text-[#718096] hover:text-[#1E1B4B] underline font-medium"
          >
            Skip
          </button>
        </div>
      </header>

      {/* Main Glass/Card Container */}
      <main className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#EDE9FE] overflow-hidden flex flex-col">
        {/* Progress Step Bar */}
        {typeof currentStep === 'number' && (
          <div className="w-full bg-[#F5F3FF] px-6 py-3 border-b border-[#EDE9FE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1E1B4B]">Step {currentStep} of 7</span>
              <span className="text-[11px] text-[#718096]">
                {currentStep === 1 && 'Welcome'}
                {currentStep === 2 && 'Google Identity'}
                {currentStep === 3 && 'Mobile OTP'}
                {currentStep === 4 && 'Select Bank'}
                {currentStep === 5 && 'Account Discovery'}
                {currentStep === 6 && 'Verification'}
                {currentStep === 7 && 'Confirmation'}
              </span>
            </div>
            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === currentStep
                      ? 'w-6 bg-[#7C3AED]'
                      : s < currentStep
                      ? 'w-2 bg-[#8B5CF6]'
                      : 'w-2 bg-[#EDE9FE]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 1: WELCOME TO SMARTPAY
        ======================================================== */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-[#1E1B4B] to-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20">
                <SmartPayLogo variant="light" size="md" showTagline={false} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1E1B4B] tracking-tight">
                Welcome to SmartPay
              </h2>
              <p className="text-xs sm:text-sm text-[#718096]">
                India&apos;s Next-Gen AI-Powered Digital Payments & Banking Hub
              </p>
            </div>

            {/* Language & Country Selectors */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF]">
              <div>
                <label className="block text-[11px] font-bold text-[#718096] mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#7C3AED]" /> Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white border border-[#EDE9FE] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#718096] mb-1">
                  Country
                </label>
                <div className="flex items-center gap-1.5 bg-white border border-[#EDE9FE] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#1E1B4B]">
                  <span className="text-base leading-none">🇮🇳</span>
                  <span>India (+91)</span>
                </div>
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B4B]">
                Enter your mobile number
              </label>
              <div className="flex items-center gap-2 border border-[#EDE9FE] focus-within:border-[#7C3AED] rounded-2xl px-3.5 py-3 bg-white shadow-xs transition-colors">
                <span className="text-sm font-bold text-[#1E1B4B] flex items-center gap-1">
                  <span>🇮🇳</span> +91
                </span>
                <span className="text-slate-300">|</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full bg-transparent text-sm sm:text-base font-bold text-[#1E1B4B] placeholder-slate-400 focus:outline-none tracking-wide"
                />
              </div>
              <p className="text-[11px] text-[#718096]">
                Make sure this number is registered with your bank account.
              </p>
            </div>

            {/* Terms & Consent */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-[#718096] leading-relaxed">
              By proceeding, you agree to SmartPay&apos;s{' '}
              <a href="#terms" className="text-[#7C3AED] font-semibold underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-[#7C3AED] font-semibold underline">
                Privacy Policy
              </a>
              . Standard SMS charges may apply for bank registration.
            </div>

            {/* Continue Button */}
            <button
              onClick={handleWelcomeContinue}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#6222BD] to-[#7C3AED] text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN 2: GOOGLE ACCOUNT SIGN-IN (OAuth 2.0 / OIDC)
        ======================================================== */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#718096] hover:text-[#1E1B4B]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#EDE9FE] shadow-sm flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.7 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9z"/>
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.9-2.2-6.8-5.1H1.1v3.2C3.1 21.1 7.2 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.2 14c-.2-.7-.4-1.5-.4-2s.2-1.3.4-2V6.8H1.1C.4 8.2 0 9.8 0 12s.4 3.8 1.1 5.2l4.1-3.2z"/>
                  <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.2 0 3.1 2.9 1.1 6.8l4.1 3.2c.9-2.9 3.6-5.2 6.8-5.2z"/>
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                Sign in with Google
              </h2>
              <p className="text-xs text-[#718096]">
                Securely authenticate via Google OAuth 2.0 / OpenID Connect.
              </p>
            </div>

            {/* Selected Google Account Card Preview */}
            <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={googleUser.avatar}
                  alt={googleUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#8B5CF6]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1E1B4B]">{googleUser.name}</h4>
                  <p className="text-[11px] text-[#718096]">{googleUser.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="text-xs font-bold text-[#7C3AED] hover:underline"
              >
                Change
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleGoogleSelect(googleUser)}
              className="w-full py-3.5 rounded-2xl bg-white border border-[#EDE9FE] text-[#1E1B4B] font-bold text-sm shadow-sm hover:bg-slate-50 active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.7 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9z"/>
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.9-2.2-6.8-5.1H1.1v3.2C3.1 21.1 7.2 24 12 24z"/>
                <path fill="#FBBC05" d="M5.2 14c-.2-.7-.4-1.5-.4-2s.2-1.3.4-2V6.8H1.1C.4 8.2 0 9.8 0 12s.4 3.8 1.1 5.2l4.1-3.2z"/>
                <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.2 0 3.1 2.9 1.1 6.8l4.1 3.2c.9-2.9 3.6-5.2 6.8-5.2z"/>
              </svg>
              <span>Continue as {googleUser.name.split(' ')[0]}</span>
            </button>

            {/* Test Returning User Fast-Track Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  handleGoogleSelect({
                    name: 'Avijit Roy',
                    email: 'avijit.roy@gmail.com',
                    sub: '1092830192830192',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                  });
                }}
                className="text-xs font-semibold text-[#7C3AED] hover:underline inline-flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Simulate Returning User Experience (Direct Fast-Track)
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 3: MOBILE NUMBER VERIFICATION (OTP)
        ======================================================== */}
        {currentStep === 3 && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#718096] hover:text-[#1E1B4B]"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Change Number
              </button>
              <span className="text-[11px] font-bold text-[#718096]">
                Attempt {otpAttempts + 1} of 4
              </span>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                Verify your mobile number
              </h2>
              <p className="text-xs text-[#718096]">
                Enter the 6-digit code sent to{' '}
                <span className="font-bold text-[#1E1B4B]">
                  +91 {mobileNumber ? mobileNumber.substring(0, 2) + '•••• ••' + mobileNumber.substring(8) : '98•••• ••10'}
                </span>
              </p>
            </div>

            {/* Clearly Marked Dev Simulation Mode Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start justify-between gap-2 shadow-xs">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 font-extrabold uppercase text-[10px] tracking-wider text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  <Sparkles className="w-3 h-3" /> Dev Simulation Mode
                </span>
                <p className="text-[11px] text-amber-800 leading-tight">
                  For educational & testing purposes. Simulated OTP is:{' '}
                  <span className="font-mono font-bold text-amber-950 text-xs">
                    {simulatedDemoOtp}
                  </span>
                </p>
              </div>
              <button
                onClick={handleAutoFillDemoOtp}
                className="px-2.5 py-1.5 rounded-xl bg-amber-700 text-white font-bold text-[11px] shadow-xs hover:bg-amber-800 flex-shrink-0"
              >
                Auto-fill
              </button>
            </div>

            {/* 6-Digit OTP Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5">
              {otpValues.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpInputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e.target)}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-extrabold text-[#1E1B4B] bg-[#F5F3FF] border border-[#EDE9FE] focus:border-[#7C3AED] focus:bg-white rounded-2xl shadow-xs focus:outline-none transition-all"
                />
              ))}
            </div>

            {/* Resend Countdown */}
            <div className="flex items-center justify-between text-xs">
              {otpCanResend ? (
                <button
                  type="button"
                  onClick={triggerSendOtp}
                  className="font-bold text-[#7C3AED] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                </button>
              ) : (
                <span className="text-[#718096]">
                  Resend OTP in{' '}
                  <span className="font-mono font-bold text-[#1E1B4B]">{otpTimer}s</span>
                </span>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1E1B4B] to-[#7C3AED] text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN 4: SELECT YOUR BANK (Inspired by GPay reference)
        ======================================================== */}
        {currentStep === 4 && (
          <div className="p-5 sm:p-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#1E1B4B]">Select your bank</h2>
              <span className="text-xs font-bold text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-full">
                All Indian Banks
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search bank name, BLZ, BIC..."
                value={searchBankQuery}
                onChange={(e) => setSearchBankQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#F5F3FF] border border-[#EDE9FE] text-xs sm:text-sm text-[#1E1B4B] placeholder-[#718096] focus:outline-none focus:border-[#7C3AED]"
              />
              {searchBankQuery && (
                <button
                  onClick={() => setSearchBankQuery('')}
                  className="absolute right-3 top-3 text-[#718096]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular Banks Grid */}
            {!searchBankQuery && (
              <div>
                <span className="text-[11px] font-bold text-[#718096] uppercase tracking-wider block mb-2">
                  Popular Banks
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {popularBanks.slice(0, 6).map((bank) => (
                    <button
                      key={bank.bankCode}
                      onClick={() => handleSelectBank(bank)}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl border border-[#E9D5FF] hover:border-[#7C3AED] hover:bg-[#F5F3FF] transition-all group active:scale-95 text-center"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-sm mb-1.5"
                        style={{ backgroundColor: bank.brandColor || '#1E1B4B' }}
                      >
                        {bank.logoText}
                      </div>
                      <span className="text-[11px] font-bold text-[#1E1B4B] leading-tight line-clamp-1">
                        {bank.bankName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Banks List */}
            <div>
              <span className="text-[11px] font-bold text-[#718096] uppercase tracking-wider block mb-2">
                {searchBankQuery ? 'Search Results' : 'All Supported Banks'}
              </span>
              <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
                {filteredBanks.map((bank) => (
                  <div
                    key={bank.bankCode}
                    onClick={() => handleSelectBank(bank)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F5F3FF] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-[11px] shadow-sm flex-shrink-0"
                        style={{ backgroundColor: bank.brandColor || '#1E1B4B' }}
                      >
                        {bank.logoText}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1E1B4B] group-hover:text-[#7C3AED]">
                          {bank.bankName}
                        </h4>
                        <span className="text-[10px] text-[#718096]">
                          {bank.supportedFeatures?.includes('UPI_LITE') ? 'UPI Lite • ' : ''}
                          AutoPay Supported
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#718096] group-hover:text-[#7C3AED]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 5: BANK ACCOUNT DISCOVERY (via PSP)
        ======================================================== */}
        {currentStep === 5 && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <button
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#718096] hover:text-[#1E1B4B]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Choose Different Bank
            </button>

            <div className="text-center space-y-2">
              <div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-lg"
                style={{ backgroundColor: selectedBankObj?.brandColor || '#1E1B4B' }}
              >
                {selectedBankObj?.logoText || 'BANK'}
              </div>
              <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                Discovering {selectedBankObj?.bankName} Accounts
              </h2>
              <p className="text-xs text-[#718096]">
                Matching mobile number{' '}
                <span className="font-bold text-[#1E1B4B]">+91 {mobileNumber}</span> with NPCI
                records.
              </p>
            </div>

            {/* Loading Radar Animation */}
            {discoveringAccounts ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-[#7C3AED]/20 animate-ping" />
                  <div className="w-12 h-12 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-md">
                    <Building2 className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#6222BD]">
                  Connecting securely to {selectedBankObj?.bankName}...
                </p>
              </div>
            ) : discoveredAccounts.length > 0 ? (
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#718096] uppercase tracking-wider block">
                  Eligible Accounts Found ({discoveredAccounts.length})
                </span>
                {discoveredAccounts.map((acc) => (
                  <div
                    key={acc.accountReference}
                    onClick={() => setSelectedAccountRef(acc.accountReference)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedAccountRef === acc.accountReference
                        ? 'border-[#7C3AED] bg-[#EDE9FE]/50 shadow-xs'
                        : 'border-[#EDE9FE] bg-white hover:bg-[#F5F3FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-[#7C3AED]">
                        {selectedAccountRef === acc.accountReference && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#1E1B4B]">
                            {acc.accountType} {acc.maskedAccountNumber}
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Eligible
                          </span>
                        </div>
                        <p className="text-xs text-[#718096]">
                          {acc.branchName} • IFSC: {acc.ifscCode}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setCurrentStep(6)}
                  className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#1E1B4B] to-[#7C3AED] text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="text-xs text-[#718096]">
                  No accounts found for this mobile number at {selectedBankObj?.bankName}.
                </p>
                <button
                  onClick={() => initiateBankDiscovery(selectedBankObj)}
                  className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold"
                >
                  Retry Discovery
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            SCREEN 6: BANK ACCOUNT VERIFICATION
        ======================================================== */}
        {currentStep === 6 && (
          <div className="p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
            <button
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#718096] hover:text-[#1E1B4B]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Accounts
            </button>

            <div>
              <h2 className="text-xl font-extrabold text-[#1E1B4B]">
                Verify Bank Account
              </h2>
              <p className="text-xs text-[#718096]">
                Verify ownership with {selectedBankObj?.bankName} via NPCI secure gateway.
              </p>
            </div>

            {/* Verification Method Segmented Toggle */}
            <div className="inline-flex p-1 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] text-xs font-semibold w-full">
              <button
                type="button"
                onClick={() => setVerificationMethod('DEBIT_CARD')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  verificationMethod === 'DEBIT_CARD'
                    ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                    : 'text-[#718096]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> Debit Card
              </button>
              <button
                type="button"
                onClick={() => setVerificationMethod('AADHAAR')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  verificationMethod === 'AADHAAR'
                    ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                    : 'text-[#718096]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Aadhaar OTP
              </button>
            </div>

            {/* Form Fields */}
            {verificationMethod === 'DEBIT_CARD' ? (
              <div className="space-y-3.5 p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF]">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] mb-1">
                    Last 6 digits of Debit Card
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={debitLast6}
                    onChange={(e) => setDebitLast6(e.target.value.replace(/\D/g, ''))}
                    placeholder="891024"
                    className="w-full bg-white border border-[#EDE9FE] rounded-xl px-3 py-2 text-sm font-mono font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] mb-1">
                      Expiry Month
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={expiryMonth}
                      onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, ''))}
                      placeholder="MM"
                      className="w-full bg-white border border-[#EDE9FE] rounded-xl px-3 py-2 text-sm font-mono font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] mb-1">
                      Expiry Year
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={expiryYear}
                      onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, ''))}
                      placeholder="YY"
                      className="w-full bg-white border border-[#EDE9FE] rounded-xl px-3 py-2 text-sm font-mono font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] space-y-3">
                <label className="block text-xs font-bold text-[#1E1B4B]">
                  Last 4 digits of Aadhaar Number
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={aadhaarLast4}
                  onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, ''))}
                  placeholder="4512"
                  className="w-full bg-white border border-[#EDE9FE] rounded-xl px-3 py-2 text-sm font-mono font-bold text-[#1E1B4B] focus:outline-none focus:border-[#7C3AED]"
                />
                <p className="text-[11px] text-[#718096]">
                  A simulated OTP will be sent by UIDAI to your Aadhaar-linked mobile.
                </p>
              </div>
            )}

            {/* Compliance Guarantee */}
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 leading-tight">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Bank-Grade Compliance:</strong> SmartPay never collects or stores your
                sensitive ATM PIN, UPI PIN, or CVV. All verification is encrypted directly with
                NPCI.
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleVerifyBankDetails}
              disabled={verifyingAccount}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1E1B4B] to-[#7C3AED] text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {verifyingAccount ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying with {selectedBankObj?.bankName}...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Verify & Link Bank Account</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN 7: ACCOUNT CONFIRMATION
        ======================================================== */}
        {currentStep === 7 && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-300">
            {/* Animated Checkmark */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white shadow-xl shadow-[#8B5CF6]/30 animate-in zoom-in duration-300">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#1E1B4B]">
                Bank Account Verified!
              </h2>
              <p className="text-xs text-[#718096]">
                Your bank account is now securely linked to SmartPay UPI.
              </p>
            </div>

            {/* Verified Details Card */}
            <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] text-left space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E9D5FF]">
                <span className="text-xs text-[#718096]">Account Holder</span>
                <span className="text-xs font-bold text-[#1E1B4B]">{googleUser.name}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E9D5FF]">
                <span className="text-xs text-[#718096]">Bank Name</span>
                <span className="text-xs font-bold text-[#1E1B4B]">
                  {verifiedResult?.bankName || selectedBankObj?.bankName}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E9D5FF]">
                <span className="text-xs text-[#718096]">Account Number</span>
                <span className="text-xs font-mono font-bold text-[#1E1B4B]">
                  {verifiedResult?.accountNumberMasked || '•••• 5432'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#718096]">Provider Reference</span>
                <span className="text-[10px] font-mono text-[#6222BD] bg-[#EDE9FE] px-2 py-0.5 rounded-md">
                  {verifiedResult?.providerReference || 'NPCI-PSP-SETU-OK'}
                </span>
              </div>
            </div>

            {/* Primary Bank Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#EDE9FE]">
              <span className="text-xs font-semibold text-[#1E1B4B]">
                Set as Primary UPI Payment Account
              </span>
              <button
                type="button"
                onClick={() => setIsPrimaryBank(!isPrimaryBank)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  isPrimaryBank ? 'bg-[#7C3AED]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    isPrimaryBank ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Go to Dashboard */}
            <button
              onClick={handleFinalConfirmation}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#6222BD] to-[#7C3AED] text-white font-extrabold text-sm shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to SmartPay Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            RETURNING USER EXPERIENCE (Screen 2 Returning Flow)
        ======================================================== */}
        {currentStep === 'RETURNING_USER' && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-300">
            {/* User Avatar with verified ring */}
            <div className="relative inline-block mx-auto">
              <img
                src={returningUserData?.avatarUrl || googleUser.avatar}
                alt={returningUserData?.fullName}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#8B5CF6]/40 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#8B5CF6] text-white shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#1E1B4B]">
                Welcome Back, {returningUserData?.fullName?.split(' ')[0] || 'Avijit'}!
              </h2>
              <p className="text-xs text-[#718096]">
                Your verified bank account is active and ready to pay.
              </p>
            </div>

            {/* Ready Bank Account Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F5F3FF] via-[#F5F3FF] to-[#F5F3FF] border border-[#EDE9FE] text-left space-y-2">
              <span className="text-[10px] font-bold text-[#6222BD] uppercase tracking-wider block">
                Existing Verified Bank Account
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004C8F] text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                    {returningUserData?.verifiedBanks?.[0]?.bankCode || 'HDFC'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1B4B]">
                      {returningUserData?.verifiedBanks?.[0]?.bankName || 'HDFC Bank'}
                    </h4>
                    <p className="text-xs font-mono text-[#718096]">
                      {returningUserData?.verifiedBanks?.[0]?.accountNumberMasked || '•••• 5432'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Case B: New Device Verification (if pending) */}
            {deviceTrustPending && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Laptop className="w-4 h-4 text-amber-700" />
                  <span>New Device Detected (Security Check)</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Please enter the 6-digit security code sent to your registered phone to trust this
                  device.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={deviceOtpInput}
                    onChange={(e) => setDeviceOtpInput(e.target.value)}
                    placeholder="Enter 482910"
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-950 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setDeviceOtpInput('482910')}
                    className="px-3 py-2 rounded-xl bg-amber-700 text-white font-bold text-xs flex-shrink-0"
                  >
                    Demo Fill
                  </button>
                </div>
              </div>
            )}

            {/* Direct 1-Click Access to Dashboard */}
            <button
              onClick={handleReturningUserContinue}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#6222BD] to-[#7C3AED] text-white font-extrabold text-sm shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to SmartPay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* ========================================================
          SIMULATED GOOGLE ACCOUNT SELECTOR MODAL / SHEET
      ======================================================== */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#EDE9FE] p-5 space-y-4 text-[#1E1B4B]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.7 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9z"/>
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.9-2.2-6.8-5.1H1.1v3.2C3.1 21.1 7.2 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.2 14c-.2-.7-.4-1.5-.4-2s.2-1.3.4-2V6.8H1.1C.4 8.2 0 9.8 0 12s.4 3.8 1.1 5.2l4.1-3.2z"/>
                  <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.2 0 3.1 2.9 1.1 6.8l4.1 3.2c.9-2.9 3.6-5.2 6.8-5.2z"/>
                </svg>
                <h3 className="text-sm font-bold text-[#1E1B4B]">Choose an account</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-[#718096] hover:text-[#1E1B4B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#718096]">to continue to SmartPay</p>

            <div className="space-y-2">
              {/* Account 1 */}
              <button
                type="button"
                onClick={() =>
                  handleGoogleSelect({
                    name: 'Avijit Roy',
                    email: 'avijit.roy@gmail.com',
                    sub: 'google_oauth_sub_1092830192',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                  })
                }
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Avijit Roy"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1E1B4B] truncate">Avijit Roy</h4>
                  <p className="text-[11px] text-[#718096] truncate">avijit.roy@gmail.com</p>
                </div>
              </button>

              {/* Account 2 */}
              <button
                type="button"
                onClick={() =>
                  handleGoogleSelect({
                    name: 'Avijit Roy (Work)',
                    email: 'avijit.corp@smartpay.in',
                    sub: 'google_oauth_sub_corp_99482',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                  })
                }
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Avijit Roy Work"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1E1B4B] truncate">Avijit Roy (Work)</h4>
                  <p className="text-[11px] text-[#718096] truncate">avijit.corp@smartpay.in</p>
                </div>
              </button>
            </div>

            {/* Google Consent Note */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-[#718096] leading-relaxed">
              To continue, Google will share your name, email address, language preference, and
              profile picture with SmartPay.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
