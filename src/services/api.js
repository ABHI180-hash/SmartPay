import axios from 'axios';

// Dynamic Base API URL for SmartPay Spring Boot Backend (handles localhost, LAN IP 192.168.x.x for mobile testing)
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname;
    return `http://${host}:8080/api/v1`;
  }
  return 'http://localhost:8080/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: Attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smartpay_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Graceful error extraction
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('smartpay_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          if (res.data?.data?.accessToken) {
            localStorage.setItem('smartpay_token', res.data.data.accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshErr) {
          localStorage.removeItem('smartpay_token');
          localStorage.removeItem('smartpay_refresh_token');
        }
      }
    }
    return Promise.reject(error.response?.data || error.message || error);
  }
);

export const authApi = {
  login: (identifier, password) => api.post('/auth/login', { identifier, password }),
  register: (userData) => api.post('/auth/register', userData),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  logout: (refreshToken) => api.post('/auth/logout', { refreshToken }),
  forgotPin: (data) => api.post('/auth/forgot-pin', data),
};

export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  updateBiometric: (enabled, quickPayLimit) => api.put('/user/biometric', null, { params: { enabled, quickPayLimit } }),
  verifyBiometric: (payload) => api.post('/user/verify-biometric', payload),
};

export const autopayApi = {
  getMandates: (userId) => api.get('/autopay', { params: { userId } }),
  createMandate: (data) => api.post('/autopay', data),
  toggleStatus: (id) => api.put(`/autopay/${id}/toggle`),
  revokeMandate: (id) => api.delete(`/autopay/${id}`),
  executeDebit: (id) => api.post(`/autopay/${id}/execute`),
};

export const walletApi = {
  getWallet: () => api.get('/wallet'),
  getBalance: () => api.get('/wallet/balance'),
  addMoney: (amount, source, reference) => api.post('/wallet/add-money', { amount, source, reference }),
  toggleUpiLite: (enabled) => api.post(`/wallet/toggle-upi-lite?enabled=${enabled}`),
  getLedger: () => api.get('/wallet/ledger'),
};

export const paymentApi = {
  transfer: (data) => api.post('/payments/transfer', data, {
    headers: data.idempotencyKey ? { 'Idempotency-Key': data.idempotencyKey } : {},
  }),
  getHistory: () => api.get('/payments'),
  getDetails: (reference) => api.get(`/payments/${reference}`),
};

export const bankApi = {
  getAccounts: (userId) => api.get('/bank-accounts', { params: { userId } }),
  getSupportedBanks: () => api.get('/banks'),
  searchBanks: (query) => api.get('/banks/search', { params: { query } }),
  discoverAccounts: (bankCode, mobileNumber) => api.post('/bank-accounts/discover', null, { params: { bankCode, mobileNumber } }),
  verifyAccount: (data) => api.post('/bank-accounts/verify', data),
  getVerificationStatus: (ref) => api.get(`/bank-accounts/verification-status/${ref}`),
  getPrimaryAccount: (userId) => api.get('/bank-accounts/primary', { params: { userId } }),
  setPrimary: (id) => api.put(`/bank-accounts/${id}/primary`),
  unlinkAccount: (id) => api.delete(`/bank-accounts/${id}`),
  getVerifiedAccounts: (userId) => api.get('/users/me/verified-bank-accounts', { params: { userId } }),
  linkAccount: (data) => api.post('/bank-accounts/verify', data),
  checkBalance: (id) => api.get(`/bank-accounts/${id}/balance`),
};

export const onboardingApi = {
  googleAuth: (data) => api.post('/auth/google', data),
  sendMobileOtp: (data) => api.post('/onboarding/mobile/send-otp', data),
  verifyMobileOtp: (data) => api.post('/onboarding/mobile/verify-otp', data),
  verifyDevice: (data) => api.post('/auth/device-verification', data),
  getStatus: (userId) => api.get('/users/me/onboarding-status', { params: { userId } }),
  complete: (userId) => api.post('/onboarding/complete', null, { params: { userId } }),
};

export const qrApi = {
  generate: (data) => api.post('/qr/generate', data),
  validate: (payload) => api.post('/qr/validate', { payload }),
};

export const fraudApi = {
  analyze: (data) => api.post('/fraud/analyze', data),
  getAlerts: () => api.get('/fraud/alerts'),
  report: (data) => api.post('/fraud/report', data),
};

export const routingApi = {
  getHealth: () => api.get('/routing/health'),
};

export const offlineApi = {
  sync: (data) => api.post('/offline/sync', data),
  getHistory: () => api.get('/offline/history'),
};

export const khataApi = {
  getGroups: () => api.get('/khata/groups'),
  createGroup: (data) => api.post('/khata/groups', data),
  getGroupDetails: (id) => api.get(`/khata/groups/${id}`),
  addExpense: (groupId, data) => api.post(`/khata/groups/${groupId}/expenses`, data),
  settle: (groupId, data) => api.post(`/khata/groups/${groupId}/settle`, data),
};

export const merchantApi = {
  getDashboard: () => api.get('/merchant/dashboard'),
  addDue: (data) => api.post('/merchant/dues', data),
  settleDue: (id) => api.patch(`/merchant/dues/${id}/settle`),
  remindDue: (id) => api.post(`/merchant/dues/${id}/remind`),
  toggleSoundbox: (enabled) => api.post(`/merchant/soundbox/toggle?enabled=${enabled}`),
};

export const rewardsApi = {
  getRewards: () => api.get('/rewards'),
  claimCoupon: (id) => api.post(`/rewards/claim/${id}`),
};

export const analyticsApi = {
  getMonthlySpending: () => api.get('/analytics/monthly-spending'),
};

export const notificationApi = {
  getAll: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
};

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  toggleUserStatus: (id) => api.patch(`/admin/users/${id}/toggle-status`),
};

export default api;
