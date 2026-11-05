import React, { useState } from 'react';
import {
  Bell,
  Search,
  Smartphone,
  Tablet,
  Monitor,
  Building2,
  ShieldAlert,
  User,
  X,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartPayLogo } from './SmartPayLogo';

export const TopNavbar = ({ onOpenNotifications }) => {
  const {
    user,
    platformMode,
    setPlatformMode,
    merchant,
    deviceView,
    setDeviceView,
    notifications,
    personalTab,
    setPersonalTab,
    merchantTab,
    setMerchantTab,
    adminTab,
    setAdminTab,
    setAuthScreen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="hidden md:block sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-purple-100/80 px-4 md:px-6 py-3 transition-all shadow-sm text-[#1E1B4B]">
        <div className="flex items-center justify-between gap-3">
          {/* Left Greeting / Mobile Logo */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <SmartPayLogo variant="dark" size="sm" />
            </div>

            <div 
              onClick={() => { setPlatformMode('personal'); setPersonalTab('profile'); }}
              className="hidden md:flex items-center gap-3 cursor-pointer p-1.5 -ml-1.5 rounded-2xl hover:bg-purple-50 transition-colors group"
              title="View Google Account & Profile Settings"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 shadow-sm group-hover:ring-2 group-hover:ring-[#7C3AED]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#7C3AED] border-2 border-white" title="Online" />
              </div>
              <div>
                <h1 className="text-sm lg:text-base font-extrabold text-[#1E1B4B] tracking-tight leading-none group-hover:text-[#7C3AED] transition-colors">
                  {platformMode === 'personal' && user.greeting}
                  {platformMode === 'merchant' && `Business Dashboard • ${merchant.storeName}`}
                  {platformMode === 'admin' && 'SmartPay Core Administration'}
                </h1>
                <p className="text-xs text-purple-600/80 font-medium mt-1">
                  Pay Smart. Live Secure.
                </p>
              </div>
            </div>
          </div>

          {/* Center Search (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pay anyone on UPI or search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-full bg-purple-50/70 border border-purple-200/80 text-[#1E1B4B] placeholder-purple-400 focus:border-[#7C3AED] focus:bg-white focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Right Controls: Device Preview Switcher + Mode Switcher + Notifications + Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Device Mode View Switcher (Desktop Preview Pill) */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-full bg-purple-50/80 border border-purple-200/80 text-xs shadow-xs">
              <button
                onClick={() => setDeviceView('responsive')}
                title="Fluid Responsive Desktop"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
                  deviceView === 'responsive'
                    ? 'bg-[#7C3AED] text-white shadow-sm font-bold'
                    : 'text-purple-600/70 hover:text-[#7C3AED]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                title="Tablet Dual-Pane Mode"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
                  deviceView === 'tablet'
                    ? 'bg-[#7C3AED] text-white shadow-sm font-bold'
                    : 'text-purple-600/70 hover:text-[#7C3AED]'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                title="Smartphone Device Simulator"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-[#7C3AED] text-white shadow-sm font-bold'
                    : 'text-purple-600/70 hover:text-[#7C3AED]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Mobile</span>
              </button>
            </div>

            {/* Onboarding & Bank Verification Test Button */}
            <button
              onClick={() => {
                setPlatformMode('auth');
                setAuthScreen('onboarding');
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-100/70 text-[#7C3AED] border border-purple-200 hover:bg-purple-200/70 transition-all shadow-xs"
              title="Launch SmartPay Onboarding & Bank Verification System"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Onboarding Flow</span>
            </button>

            {/* Platform Role Switcher */}
            <div className="relative">
              <select
                value={platformMode}
                onChange={(e) => setPlatformMode(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-full bg-white hover:bg-purple-50 text-xs font-bold text-[#1E1B4B] cursor-pointer focus:outline-none border border-purple-200 focus:border-[#7C3AED] shadow-xs"
              >
                <option value="personal">👤 Personal View</option>
                <option value="merchant">🏪 Merchant (ACME)</option>
                <option value="admin">🛡️ Admin Console</option>
                <option value="auth">🔐 Auth Flow</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-purple-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotificationDrawer(true)}
              className="relative p-2 rounded-full hover:bg-purple-50 active:scale-95 text-[#1E1B4B] transition-all border border-purple-100"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[#7C3AED]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#7C3AED] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Mobile/Compact Avatar */}
            <button
              onClick={() => setPersonalTab('profile')}
              className="md:hidden relative flex-shrink-0"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-purple-300 shadow-sm"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Notification Drawer in Clean Purple Glass */}
      {showNotificationDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowNotificationDrawer(false)}
          />
          <div className="relative w-full max-w-sm bg-white text-[#1E1B4B] shadow-2xl h-full flex flex-col z-10 border-l border-purple-100 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#7C3AED]" />
                <h3 className="font-bold text-sm text-[#1E1B4B]">Notifications</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#7C3AED] border border-purple-200">
                  {unreadCount} New
                </span>
              </div>
              <button
                onClick={() => setShowNotificationDrawer(false)}
                className="p-1 rounded-full hover:bg-purple-50 text-purple-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition-colors ${
                    item.read
                      ? 'bg-purple-50/40 border-purple-100 text-slate-500'
                      : 'bg-purple-50 border-purple-200 text-[#1E1B4B]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#1E1B4B] leading-snug">{item.title}</h4>
                    <span className="text-[10px] text-purple-500 flex-shrink-0 font-medium">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
