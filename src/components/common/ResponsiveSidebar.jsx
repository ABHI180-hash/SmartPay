import React from 'react';
import {
  Home,
  Send,
  QrCode,
  Users,
  Receipt,
  BookOpen,
  Gift,
  BarChart3,
  User,
  Settings,
  LogOut,
  ShieldAlert,
  Sparkles,
  Zap,
  LayoutDashboard,
  ArrowDownToLine,
  Tag,
  TrendingUp,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { SmartPayLogo } from './SmartPayLogo';
import { useApp } from '../../context/AppContext';

export const ResponsiveSidebar = () => {
  const {
    platformMode,
    setPlatformMode,
    personalTab,
    setPersonalTab,
    merchantTab,
    setMerchantTab,
    adminTab,
    setAdminTab,
    setActiveModal,
    setAuthScreen,
  } = useApp();

  const handleLogout = () => {
    setPlatformMode('auth');
    setAuthScreen('login');
  };

  // Personal Menu Items
  const personalNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'payments', label: 'Cards & Bills', icon: Send },
    { id: 'scan', label: 'Scan & Pay', icon: QrCode, action: () => setActiveModal('scanPay') },
    { id: 'contacts', label: 'Contact Lists', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'khata', label: 'Khata', icon: BookOpen },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'analytics', label: 'Insights', icon: BarChart3 },
    { id: 'scamShield', label: 'AI Scam Shield', icon: ShieldAlert, badge: 'AI' },
    { id: 'aiAssistant', label: 'AI Assistant', icon: Sparkles, badge: 'Pro' },
    { id: 'upilite', label: 'UPI Lite X', icon: Zap },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Merchant Menu Items
  const merchantNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'receive', label: 'Receive Payments', icon: ArrowDownToLine },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'khata', label: 'Khata (Ledger)', icon: BookOpen },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'rewards', label: 'Offers & Rewards', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'qrCode', label: 'QR Code', icon: QrCode },
    { id: 'soundbox', label: 'Soundbox Audio', icon: Zap, badge: 'Voice' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Admin Menu Items
  const adminNav = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'monitoring', label: 'Live Monitoring', icon: TrendingUp },
    { id: 'merchants', label: 'Merchants & KYC', icon: Building2 },
    { id: 'fraud', label: 'AI Fraud Radar', icon: ShieldAlert, badge: 'Live' },
    { id: 'tickets', label: 'Grievance Desk', icon: BookOpen },
    { id: 'system', label: 'System Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white/90 backdrop-blur-xl text-[#1E1B4B] flex flex-col justify-between h-full border-r border-purple-100/80 select-none shadow-sm">
      {/* Top Header / Branding */}
      <div>
        <div className="p-5 pb-3">
          <SmartPayLogo variant="dark" size="md" showTagline={true} />

          {/* Mode Pill Indicator */}
          {platformMode === 'merchant' && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/60 border border-purple-200 text-purple-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
              <span>Merchant Mode</span>
            </div>
          )}

          {platformMode === 'admin' && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Admin Console</span>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="mt-2 px-3 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
          {platformMode === 'personal' &&
            personalNav.map((item) => {
              const active = personalTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setPersonalTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all group ${
                    active
                      ? 'bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 font-bold'
                      : 'text-[#64748B] hover:bg-purple-50/80 hover:text-[#7C3AED]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        active ? 'text-white stroke-[2.5]' : 'text-purple-400 group-hover:text-[#7C3AED]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

          {platformMode === 'merchant' &&
            merchantNav.map((item) => {
              const active = merchantTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setMerchantTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all group ${
                    active
                      ? 'bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 font-bold'
                      : 'text-[#64748B] hover:bg-purple-50/80 hover:text-[#7C3AED]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        active ? 'text-white stroke-[2.5]' : 'text-purple-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

          {platformMode === 'admin' &&
            adminNav.map((item) => {
              const active = adminTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all group ${
                    active
                      ? 'bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 font-bold'
                      : 'text-[#64748B] hover:bg-purple-50/80 hover:text-[#7C3AED]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        active ? 'text-white' : 'text-purple-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
        </nav>
      </div>

      {/* Bottom Switcher & Settings/Logout */}
      <div className="p-3 border-t border-purple-100 space-y-2">
        {/* Switch Mode Button */}
        {platformMode === 'merchant' ? (
          <button
            onClick={() => setPlatformMode('personal')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-purple-50 hover:bg-purple-100/70 text-[#7C3AED] text-xs font-bold transition-all border border-purple-200/80 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch to Personal</span>
          </button>
        ) : platformMode === 'personal' ? (
          <button
            onClick={() => setPlatformMode('merchant')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-purple-50 hover:bg-purple-100/70 text-[#7C3AED] text-xs font-bold transition-all border border-purple-200/80 shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Switch to Merchant</span>
          </button>
        ) : (
          <button
            onClick={() => setPlatformMode('personal')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-purple-50 hover:bg-purple-100/70 text-[#7C3AED] text-xs font-bold transition-all border border-purple-200/80 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </button>
        )}

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setPersonalTab('profile')}
            className="flex items-center gap-2 px-2 py-1.5 text-xs text-[#64748B] hover:text-[#7C3AED] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-1.5 text-xs text-rose-500 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
