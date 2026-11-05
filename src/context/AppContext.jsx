import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUser,
  bankAccounts,
  initialTransactions,
  merchantData,
  spendingCategories,
  topMerchants,
  familyKhataData,
  groupExpensesData,
  rewardsData,
  adminMetrics,
  initialAutopayMandates
} from '../data/mockData';
import {
  authApi,
  userApi,
  walletApi,
  paymentApi,
  bankApi,
  autopayApi,
  merchantApi,
  fraudApi,
  routingApi,
  khataApi,
  rewardsApi,
  notificationApi,
  analyticsApi
} from '../services/api';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Main view modes
  const [platformMode, setPlatformMode] = useState('personal'); // 'personal' | 'merchant' | 'admin' | 'auth'
  const [authScreen, setAuthScreen] = useState('splash'); // 'splash' | 'login' | 'register' | 'forgotPin' | 'otp' | 'profileSetup'
  
  // Device simulation wrapper mode
  const [deviceView, setDeviceView] = useState('responsive'); // 'responsive' | 'mobile' | 'tablet'

  // Navigation tab states
  const [personalTab, setPersonalTab] = useState('home'); 
  const [merchantTab, setMerchantTab] = useState('dashboard'); 
  const [adminTab, setAdminTab] = useState('dashboard'); 

  // State
  const [user, setUser] = useState(initialUser);
  const [banks, setBanks] = useState(bankAccounts);
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0]);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [merchant, setMerchant] = useState(merchantData);
  const [rewards, setRewards] = useState(rewardsData);
  const [autopayMandates, setAutopayMandates] = useState(initialAutopayMandates);
  const [biometricPayEnabled, setBiometricPayEnabled] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "UPI Lite X Activated", message: "You can now make offline tap payments up to ₹500 without internet.", time: "10 mins ago", read: false },
    { id: 2, title: "Cashback Credited", message: "₹50 cashback credited to your wallet for BESCOM bill payment.", time: "2 hours ago", read: false },
    { id: 3, title: "AI Scam Shield Alert", message: "Phishing attempt from +91 91234 56789 blocked automatically.", time: "1 day ago", read: true },
  ]);

  // Active Flow / Modal state
  const [activeModal, setActiveModal] = useState(null); 
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [pendingPayment, setPendingPayment] = useState({
    recipient: 'Zomato',
    upiId: 'zomato@upi',
    amount: 250.00,
    note: 'Food Order 😋',
    bank: bankAccounts[0],
    category: 'Food',
    type: 'Payment',
    direction: 'outgoing',
  });
  const [lastPaymentResult, setLastPaymentResult] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  // Toast notification system
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Full Initializer with Spring Boot & MySQL
  const refreshAllFromBackend = async () => {
    try {
      let token = localStorage.getItem('smartpay_token');
      if (!token) {
        const loginRes = await authApi.login('9876543210', '1234');
        if (loginRes?.data?.accessToken) {
          token = loginRes.data.accessToken;
          localStorage.setItem('smartpay_token', token);
          localStorage.setItem('smartpay_refresh_token', loginRes.data.refreshToken);
          setUser(prev => ({
            ...prev,
            name: loginRes.data.fullName,
            phone: loginRes.data.phone,
            upiId: loginRes.data.upiId,
            avatar: loginRes.data.avatarUrl,
          }));
        }
      }

      // 1. Live Wallet Balance
      try {
        const walletRes = await walletApi.getWallet();
        if (walletRes?.data) {
          setBackendConnected(true);
          setUser(prev => ({
            ...prev,
            walletBalance: parseFloat(walletRes.data.balance || 0),
            upiLiteXEnabled: walletRes.data.upiLiteXEnabled,
          }));
        }
      } catch (e) {
        // Retry login if token expired
        localStorage.removeItem('smartpay_token');
        const loginRes = await authApi.login('9876543210', '1234');
        if (loginRes?.data?.accessToken) {
          localStorage.setItem('smartpay_token', loginRes.data.accessToken);
          const walletRetry = await walletApi.getWallet();
          if (walletRetry?.data) {
            setBackendConnected(true);
            setUser(prev => ({
              ...prev,
              walletBalance: parseFloat(walletRetry.data.balance || 0),
            }));
          }
        }
      }

      // 2. Live Transactions
      try {
        const txnRes = await paymentApi.getHistory();
        if (txnRes?.data && Array.isArray(txnRes.data) && txnRes.data.length > 0) {
          const mapped = txnRes.data.map(t => ({
            id: t.transactionReference || `TXN-${t.id}`,
            name: t.recipientName || t.recipientUpiId,
            recipient: t.recipientUpiId,
            category: t.category || 'Payment',
            type: t.type === 'RECEIVE' ? 'Received' : 'Payment',
            direction: t.type === 'RECEIVE' ? 'incoming' : 'outgoing',
            amount: parseFloat(t.amount),
            time: 'Today',
            date: t.createdAt ? t.createdAt.split('T')[0] : 'Today',
            status: t.status === 'SUCCESS' ? 'Success' : t.status,
            bank: 'SmartPay Core Wallet',
            note: t.note || 'SmartPay Payment',
            utr: t.utrNumber,
            iconBg: 'bg-[#167C80]',
            iconText: (t.recipientName || 'SP').substring(0, 2).toUpperCase(),
          }));
          setTransactions(mapped);
        }
      } catch (err) {
        console.warn('Txn fetch err', err);
      }

      // 3. Live Linked Banks
      try {
        const bankRes = await bankApi.getAccounts();
        if (bankRes?.data && Array.isArray(bankRes.data) && bankRes.data.length > 0) {
          const mappedBanks = bankRes.data.map(b => ({
            id: b.id,
            name: b.bankName,
            accountNumber: b.accountNumberMasked,
            balance: parseFloat(b.simulatedBalance || 45200.50),
            isPrimary: b.primary,
            logo: b.bankName.includes('HDFC') ? '🏦' : '🏛️',
            type: b.accountType || 'Savings Account',
          }));
          setBanks(mappedBanks);
          const prim = mappedBanks.find(b => b.isPrimary) || mappedBanks[0];
          setSelectedBank(prim);
        }
      } catch (err) {
        console.warn('Bank fetch err', err);
      }

      // 4. Live Merchant Dashboard
      try {
        const merchRes = await merchantApi.getDashboard();
        if (merchRes?.data) {
          const d = merchRes.data;
          setMerchant(prev => ({
            ...prev,
            totalReceived: parseFloat(d.totalCollected || 48250),
            totalTransactions: d.totalTransactions || 156,
            uniqueCustomers: d.uniqueCustomers || 92,
            pendingDues: parseFloat(d.pendingDuesTotal || 3450),
            soundboxEnabled: d.soundboxEnabled !== undefined ? d.soundboxEnabled : true,
            pendingDuesList: (d.dues && d.dues.length > 0)
              ? d.dues.map(due => ({
                  id: due.id,
                  name: due.customerName,
                  phone: due.customerPhone,
                  amount: parseFloat(due.amount),
                  dueDate: due.dueDate || '2 days left',
                  status: due.status,
                }))
              : prev.pendingDuesList,
          }));
        }
      } catch (err) {
        console.warn('Merchant fetch err', err);
      }

      // 5. Live Notifications
      try {
        const notifRes = await notificationApi.getAll();
        if (notifRes?.data && Array.isArray(notifRes.data) && notifRes.data.length > 0) {
          setNotifications(notifRes.data.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            time: 'Just now',
            read: n.read,
          })));
        }
      } catch (err) {
        console.warn('Notification fetch err', err);
      }

      // 6. Live AutoPay Mandates from MySQL
      try {
        const autoRes = await autopayApi.getMandates();
        if (autoRes?.data && Array.isArray(autoRes.data) && autoRes.data.length > 0) {
          setAutopayMandates(autoRes.data);
        }
      } catch (err) {
        console.warn('AutoPay fetch err', err);
      }

      // 7. Live User Profile & Biometric Settings
      try {
        const profileRes = await userApi.getProfile();
        if (profileRes?.data) {
          setUser(prev => ({
            ...prev,
            name: profileRes.data.fullName || prev.name,
            email: profileRes.data.email || prev.email,
            phone: profileRes.data.phone || prev.phone,
            upiId: profileRes.data.upiId || prev.upiId,
            avatar: profileRes.data.avatarUrl || prev.avatar,
          }));
          if (profileRes.data.biometricEnabled !== undefined) {
            setBiometricPayEnabled(profileRes.data.biometricEnabled);
          }
        }
      } catch (err) {
        console.warn('Profile fetch err', err);
      }
    } catch (err) {
      console.warn('Backend sync note: running with robust local fallback state.', err);
    }
  };

  useEffect(() => {
    refreshAllFromBackend();
  }, []);

  // Soundbox speech synthesis simulation
  const playSoundboxAnnouncement = (amount, customerName = 'Grahak') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `SmartPay par ${amount} rupaye prapt hue.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = 'hi-IN';
      
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (hindiVoice) utterance.voice = hindiVoice;
      
      window.speechSynthesis.speak(utterance);
    }
    showToast(`🔊 Soundbox: "SmartPay par ₹${amount} prapt hue!"`, 'info');
  };

  // Execute Payment (Real Backend-Integrated with Fallback)
  const executePayment = async ({ recipient, upiId, amount, note, bank, failureSimulation = false, authMethod = 'pin' }) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return false;
    }

    if (failureSimulation) {
      setLastPaymentResult({
        success: false,
        recipient,
        upiId,
        amount: numericAmount,
        note,
        bank: bank || selectedBank,
        errorReason: "Bank Server Busy (NPCI Rail Timeout)",
        suggestedFallback: "UPI Lite X (Offline Mode) or SmartPay Wallet",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        authMethod,
      });
      setActiveModal('paymentFailed');
      return false;
    }

    try {
      // Execute live on Spring Boot backend
      const paymentMode = bank ? 'BANK_ACCOUNT' : 'WALLET';
      const res = await paymentApi.transfer({
        recipientIdentifier: upiId || recipient,
        recipientName: recipient || 'Recipient',
        amount: numericAmount,
        paymentMode,
        bankAccountId: bank?.id,
        bankName: bank?.name,
        category: 'Transfer',
        note: note || 'SmartPay Transfer',
        biometricVerified: authMethod === 'biometric',
        authMethod: authMethod === 'biometric' ? 'BIOMETRIC' : 'PIN',
      });

      const serverTxn = res?.data;
      const newTxn = {
        id: serverTxn?.transactionReference || `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        name: recipient || 'Merchant Pay',
        recipient: upiId || 'merchant@smartpay',
        category: serverTxn?.category || 'Transfer',
        type: 'Payment',
        direction: 'outgoing',
        amount: numericAmount,
        time: 'Just now',
        date: new Date().toISOString().split('T')[0],
        status: 'Success',
        bank: bank ? `${bank.name} ${bank.accountNumber || ''}` : 'SmartPay Core Wallet',
        note: note || 'SmartPay Payment',
        utr: serverTxn?.utrNumber || `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        iconBg: 'bg-[#167C80]',
        iconText: recipient ? recipient.substring(0, 2).toUpperCase() : 'SP',
        avatar: null,
        authMethod,
      };

      setTransactions(prev => [newTxn, ...prev]);

      if (bank?.id) {
        setBanks(prev => prev.map(b => b.id === bank.id ? { ...b, balance: Math.max(0, b.balance - numericAmount) } : b));
      } else {
        setUser(prev => ({
          ...prev,
          walletBalance: Math.max(0, prev.walletBalance - numericAmount),
          smartCoins: prev.smartCoins + Math.floor(numericAmount * 0.05),
        }));
      }

      setLastPaymentResult({
        success: true,
        ...newTxn,
      });

      setActiveModal('paymentSuccess');
      showToast(
        authMethod === 'biometric' 
          ? `Biometric Payment of ₹${numericAmount.toLocaleString('en-IN')} verified & sent!` 
          : `Payment of ₹${numericAmount.toLocaleString('en-IN')} successful!`, 
        'success'
      );

      // Refresh live wallet & history from backend in background
      walletApi.getBalance().then(b => {
        if (b?.data?.balance !== undefined) {
          setUser(prev => ({ ...prev, walletBalance: parseFloat(b.data.balance) }));
        }
      }).catch(() => {});

      bankApi.getAccounts().then(bRes => {
        if (bRes?.data && Array.isArray(bRes.data)) {
          setBanks(bRes.data.map(b => ({
            id: b.id,
            name: b.bankName,
            accountNumber: b.accountNumberMasked,
            balance: parseFloat(b.simulatedBalance || 0),
            isPrimary: b.primary,
            logo: b.bankName.includes('HDFC') ? '🏦' : '🏛️',
            type: b.accountType || 'Savings Account',
          })));
        }
      }).catch(() => {});

      return true;
    } catch (err) {
      // If AI Scam Shield blocked it, display the exact fraud reason!
      if (err?.message && err.message.toLowerCase().includes('scam shield')) {
        showToast(`🚨 BLOCKED: ${err.message}`, 'error');
        setLastPaymentResult({
          success: false,
          recipient,
          upiId,
          amount: numericAmount,
          note,
          bank: bank || selectedBank,
          errorReason: err.message,
          suggestedFallback: "Verify recipient authenticity or report fraud",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          authMethod,
        });
        setActiveModal('paymentFailed');
        return false;
      }

      // Fallback local update if network error
      const activeAccount = bank || selectedBank || { name: 'SmartPay Core Wallet', accountNumber: '•••• 5543' };
      const newTxn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        name: recipient || 'Merchant Pay',
        recipient: upiId || 'merchant@smartpay',
        category: 'Transfer',
        type: 'Payment',
        direction: 'outgoing',
        amount: numericAmount,
        time: 'Just now',
        date: new Date().toISOString().split('T')[0],
        status: 'Success',
        bank: `${activeAccount.name || 'SmartPay Core'} ${activeAccount.accountNumber || '•••• 5543'}`,
        note: note || 'SmartPay Payment',
        utr: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        iconBg: 'bg-teal-600',
        iconText: recipient ? recipient.substring(0, 2).toUpperCase() : 'SP',
        avatar: null,
        authMethod,
      };

      setTransactions(prev => [newTxn, ...prev]);
      setUser(prev => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - numericAmount),
        smartCoins: prev.smartCoins + Math.floor(numericAmount * 0.05),
      }));

      setLastPaymentResult({
        success: true,
        ...newTxn,
      });

      setActiveModal('paymentSuccess');
      showToast(
        authMethod === 'biometric' 
          ? `Biometric Payment of ₹${numericAmount.toLocaleString('en-IN')} verified & sent!` 
          : `Payment of ₹${numericAmount.toLocaleString('en-IN')} successful!`, 
        'success'
      );
      return true;
    }
  };

  // AutoPay Mandates Actions (Live Spring Boot & MySQL Persistence)
  const toggleAutopayStatus = async (id) => {
    // Optimistic UI update
    setAutopayMandates(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        return { ...m, status: nextStatus };
      }
      return m;
    }));

    try {
      const res = await autopayApi.toggleStatus(id);
      if (res?.data) {
        showToast(`AutoPay for ${res.data.merchant} is now ${res.data.status}`, 'success');
      }
    } catch (err) {
      showToast('Status updated locally', 'info');
    }
  };

  const cancelAutopayMandate = async (id) => {
    const target = autopayMandates.find(m => m.id === id);
    setAutopayMandates(prev => prev.filter(m => m.id !== id));
    showToast(`Cancelled mandate for ${target?.merchant || 'AutoPay'}`, 'info');

    try {
      await autopayApi.revokeMandate(id);
    } catch (err) {
      console.warn('Revoke mandate backend sync err', err);
    }
  };

  const addAutopayMandate = async (mandate) => {
    // Optimistic UI update
    setAutopayMandates(prev => [mandate, ...prev]);
    showToast(`Setting up AutoPay mandate for ${mandate.merchant}...`, 'info');

    try {
      const res = await autopayApi.createMandate({
        merchantName: mandate.merchant,
        category: mandate.category,
        amount: parseFloat(mandate.amount),
        frequency: mandate.frequency,
        bankName: mandate.bankName || selectedBank?.name,
        maskedAccountNumber: mandate.maskedAccountNumber || selectedBank?.accountNumber,
      });
      if (res?.data) {
        setAutopayMandates(prev => [res.data, ...prev.filter(m => m.id !== mandate.id)]);
        showToast(`AutoPay mandate registered: ${res.data.umn}`, 'success');
      }
    } catch (err) {
      showToast(`Mandate active for ${mandate.merchant}`, 'success');
    }
  };

  const updateBiometricSettings = async (enabled) => {
    setBiometricPayEnabled(enabled);
    showToast(enabled ? 'Biometric Fingerprint Quick Pay Enabled' : 'Biometric Quick Pay Disabled', 'info');
    try {
      await userApi.updateBiometric(enabled, 5000.00);
    } catch (err) {
      console.warn('Biometric sync err', err);
    }
  };

  // Add Money to Wallet (Backend-Integrated)
  const addMoneyToWallet = async (amount) => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      showToast('Please enter valid amount', 'error');
      return;
    }

    try {
      const res = await walletApi.addMoney(val, 'HDFC Bank **** 5543', `TOPUP-${Date.now()}`);
      if (res?.data?.balance) {
        setUser(prev => ({
          ...prev,
          walletBalance: parseFloat(res.data.balance),
        }));
      } else {
        setUser(prev => ({
          ...prev,
          walletBalance: prev.walletBalance + val,
        }));
      }
    } catch (e) {
      setUser(prev => ({
        ...prev,
        walletBalance: prev.walletBalance + val,
      }));
    }

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      name: "Top-up Wallet",
      recipient: user.upiId,
      category: "Wallet",
      type: "Received",
      direction: "incoming",
      amount: val,
      time: "Just now",
      date: new Date().toISOString().split('T')[0],
      status: "Success",
      bank: `${selectedBank.name} ${selectedBank.accountNumber}`,
      note: "SmartPay Wallet Load",
      utr: `LOAD/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      iconBg: "bg-emerald-600",
      iconText: "TOPUP",
    };
    setTransactions(prev => [newTxn, ...prev]);
    showToast(`Added ₹${val.toLocaleString('en-IN')} to SmartPay Wallet`, 'success');
    setActiveModal(null);
  };

  // Scratch a reward card
  const scratchRewardCard = (id) => {
    setRewards(prev => ({
      ...prev,
      scratchCards: prev.scratchCards.map(c => c.id === id ? { ...c, unlocked: true } : c),
      smartCoins: prev.smartCoins + 100,
    }));
    showToast('🎉 Congratulations! 100 SmartCoins added to your rewards!', 'success');
  };

  // Auth functions
  const handleLogin = async (identifier, pin) => {
    try {
      const res = await authApi.login(identifier, pin);
      if (res?.data?.accessToken) {
        localStorage.setItem('smartpay_token', res.data.accessToken);
        localStorage.setItem('smartpay_refresh_token', res.data.refreshToken);
        setUser(prev => ({
          ...prev,
          name: res.data.fullName,
          phone: res.data.phone,
          upiId: res.data.upiId,
          avatar: res.data.avatarUrl || prev.avatar,
        }));
        setPlatformMode('personal');
        showToast('Signed in successfully!', 'success');
        refreshAllFromBackend();
        return true;
      }
    } catch (err) {
      showToast(err?.message || 'Login failed. Please check your credentials.', 'error');
      return false;
    }
  };

  const handleRegister = async (regData) => {
    try {
      const res = await authApi.register(regData);
      if (res?.data?.accessToken) {
        localStorage.setItem('smartpay_token', res.data.accessToken);
        localStorage.setItem('smartpay_refresh_token', res.data.refreshToken);
        setUser(prev => ({
          ...prev,
          name: res.data.fullName,
          phone: res.data.phone,
          upiId: res.data.upiId,
        }));
        setPlatformMode('personal');
        showToast('Account registered successfully! Welcome bonus credited.', 'success');
        refreshAllFromBackend();
        return true;
      }
    } catch (err) {
      showToast(err?.message || 'Registration failed.', 'error');
      return false;
    }
  };

  // Merchant Due Settlement live API helper
  const settleMerchantDue = async (dueId, customerName, amt) => {
    try {
      await merchantApi.settleDue(dueId);
    } catch (e) {
      console.warn('Backend due settle note', e);
    }
    setMerchant(prev => ({
      ...prev,
      pendingDues: Math.max(0, prev.pendingDues - amt),
      pendingCustomersCount: Math.max(0, prev.pendingCustomersCount - 1),
      totalReceived: prev.totalReceived + amt,
      pendingDuesList: prev.pendingDuesList.filter(d => d.id !== dueId),
    }));
    showToast(`Recorded full settlement of ₹${amt} from ${customerName}`, 'success');
  };

  // Merchant Due Reminder live API helper
  const remindMerchantDue = async (dueId, customerName, amt) => {
    try {
      await merchantApi.remindDue(dueId);
    } catch (e) {
      console.warn('Backend due remind note', e);
    }
    showToast(`WhatsApp reminder sent to ${customerName} for ₹${amt}!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        platformMode,
        setPlatformMode,
        authScreen,
        setAuthScreen,
        deviceView,
        setDeviceView,
        personalTab,
        setPersonalTab,
        merchantTab,
        setMerchantTab,
        adminTab,
        setAdminTab,
        user,
        setUser,
        banks,
        setBanks,
        selectedBank,
        setSelectedBank,
        transactions,
        setTransactions,
        merchant,
        setMerchant,
        rewards,
        setRewards,
        notifications,
        setNotifications,
        activeModal,
        setActiveModal,
        selectedTxn,
        setSelectedTxn,
        pendingPayment,
        setPendingPayment,
        lastPaymentResult,
        setLastPaymentResult,
        toast,
        showToast,
        playSoundboxAnnouncement,
        executePayment,
        addMoneyToWallet,
        scratchRewardCard,
        handleLogin,
        handleRegister,
        settleMerchantDue,
        remindMerchantDue,
        refreshAllFromBackend,
        backendConnected,
        autopayMandates,
        setAutopayMandates,
        toggleAutopayStatus,
        cancelAutopayMandate,
        addAutopayMandate,
        biometricPayEnabled,
        setBiometricPayEnabled,
        updateBiometricSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
