import React from 'react';
import { useApp } from './context/AppContext';
import { ResponsiveSidebar } from './components/common/ResponsiveSidebar';
import { TopNavbar } from './components/common/TopNavbar';
import { MobileBottomNavigation } from './components/common/MobileBottomNavigation';
import { ModalContainer } from './components/modals/ModalContainer';
import { DeviceSimulatorFrame } from './components/common/DeviceSimulatorFrame';

// Auth & Onboarding Pages
import { SplashScreen } from './pages/auth/SplashScreen';
import { LoginScreen } from './pages/auth/LoginScreen';
import { RegisterScreen } from './pages/auth/RegisterScreen';
import { OtpVerifyScreen } from './pages/auth/OtpVerifyScreen';
import { ForgotPinScreen } from './pages/auth/ForgotPinScreen';
import { ProfileSetupScreen } from './pages/auth/ProfileSetupScreen';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';

// Personal Pages
import { PersonalDashboard } from './pages/personal/PersonalDashboard';
import { UnifiedOnePageDashboard } from './components/unified/UnifiedOnePageDashboard';
import { MobileHomeScreen } from './components/mobile/MobileHomeScreen';
import { TabletDualPaneLayout } from './components/tablet/TabletDualPaneLayout';
import { TransactionHistoryPage } from './pages/personal/TransactionHistoryPage';
import { KhataPage } from './pages/personal/KhataPage';
import { RewardsPage } from './pages/personal/RewardsPage';
import { AnalyticsPage } from './pages/personal/AnalyticsPage';
import { UpiLiteXPage } from './pages/personal/UpiLiteXPage';
import { ProfilePage } from './pages/personal/ProfilePage';
import { PaymentsAndBillsPage } from './pages/personal/PaymentsAndBillsPage';
import { ContactsPage } from './pages/personal/ContactsPage';

// Merchant Pages
import { MerchantDashboard } from './pages/merchant/MerchantDashboard';
import { DigitalKhataPage } from './pages/merchant/DigitalKhataPage';
import { MerchantQrCode } from './pages/merchant/MerchantQrCode';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

export function App() {
  const {
    platformMode,
    authScreen,
    personalTab,
    merchantTab,
    adminTab,
    deviceView,
    toast,
    setActiveModal,
  } = useApp();

  // If in Auth Mode, render appropriate auth screen
  if (platformMode === 'auth') {
    return (
      <DeviceSimulatorFrame>
        {authScreen === 'splash' && <SplashScreen />}
        {authScreen === 'login' && <LoginScreen />}
        {authScreen === 'register' && <OnboardingWizard />}
        {authScreen === 'onboarding' && <OnboardingWizard />}
        {authScreen === 'otp' && <OtpVerifyScreen />}
        {authScreen === 'forgotPin' && <ForgotPinScreen />}
        {authScreen === 'profileSetup' && <ProfileSetupScreen />}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold shadow-xl border border-white/20 animate-in slide-in-from-bottom duration-200">
            {toast.message}
          </div>
        )}
      </DeviceSimulatorFrame>
    );
  }

  // Render appropriate Personal tab
  const renderPersonalContent = () => {
    // If mobile simulator frame is chosen or on a small screen and on 'home' tab
    if (deviceView === 'mobile') {
      if (personalTab === 'home') return <MobileHomeScreen />;
      if (personalTab === 'payments') return <PaymentsAndBillsPage />;
      if (personalTab === 'contacts') return <ContactsPage />;
      if (personalTab === 'transactions') return <TransactionHistoryPage />;
      if (personalTab === 'khata') return <KhataPage />;
      if (personalTab === 'rewards') return <RewardsPage />;
      if (personalTab === 'analytics') return <AnalyticsPage />;
      if (personalTab === 'upilite') return <UpiLiteXPage />;
      if (personalTab === 'profile' || personalTab === 'settings') return <ProfilePage />;
      return <MobileHomeScreen />;
    }

    if (deviceView === 'tablet') {
      if (personalTab === 'home') return <TabletDualPaneLayout />;
      if (personalTab === 'payments') return <PaymentsAndBillsPage />;
      if (personalTab === 'contacts') return <ContactsPage />;
      if (personalTab === 'transactions') return <TransactionHistoryPage />;
      if (personalTab === 'khata') return <KhataPage />;
      if (personalTab === 'rewards') return <RewardsPage />;
      if (personalTab === 'analytics') return <AnalyticsPage />;
      if (personalTab === 'upilite') return <UpiLiteXPage />;
      if (personalTab === 'profile' || personalTab === 'settings') return <ProfilePage />;
      return <TabletDualPaneLayout />;
    }

    switch (personalTab) {
      case 'home':
        return <UnifiedOnePageDashboard />;
      case 'payments':
        return <PaymentsAndBillsPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'transactions':
        return <TransactionHistoryPage />;
      case 'khata':
        return <KhataPage />;
      case 'rewards':
        return <RewardsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'upilite':
        return <UpiLiteXPage />;
      case 'scamShield':
        return (
          <div className="p-4 bg-white rounded-2xl border border-[#E3E9ED] text-center py-12">
            <h3 className="text-base font-bold text-[#172B3A]">AI Scam Shield Workspace</h3>
            <p className="text-xs text-[#718096] mt-1 mb-4">Click below to open the Real-time Risk Radar</p>
            <button
              onClick={() => setActiveModal('scamCheck')}
              className="px-6 py-2.5 rounded-full bg-[#167C80] text-white text-xs font-bold shadow-md"
            >
              Open Scam Shield Analyzer
            </button>
          </div>
        );
      case 'aiAssistant':
        return (
          <div className="p-4 bg-white rounded-2xl border border-[#E3E9ED] text-center py-12">
            <h3 className="text-base font-bold text-[#172B3A]">SmartPay AI Assistant</h3>
            <p className="text-xs text-[#718096] mt-1 mb-4">Click below to chat with your personal financial AI</p>
            <button
              onClick={() => setActiveModal('aiChat')}
              className="px-6 py-2.5 rounded-full bg-[#167C80] text-white text-xs font-bold shadow-md"
            >
              Launch AI Chat
            </button>
          </div>
        );
      case 'profile':
      case 'settings':
        return <ProfilePage />;
      default:
        return <PersonalDashboard />;
    }
  };

  // Render appropriate Merchant tab
  const renderMerchantContent = () => {
    switch (merchantTab) {
      case 'dashboard':
        return <MerchantDashboard />;
      case 'receive':
      case 'qrCode':
        return <MerchantQrCode />;
      case 'khata':
        return <DigitalKhataPage />;
      case 'transactions':
        return <MerchantDashboard />;
      case 'soundbox':
        return (
          <div className="p-4 bg-white rounded-2xl border border-[#E3E9ED] text-center py-12">
            <h3 className="text-base font-bold text-[#172B3A]">Voice Payment Soundbox</h3>
            <p className="text-xs text-[#718096] mt-1 mb-4">Click below to test audio announcements</p>
            <button
              onClick={() => setActiveModal('soundbox')}
              className="px-6 py-2.5 rounded-full bg-[#167C80] text-white text-xs font-bold shadow-md"
            >
              Open Soundbox Terminal
            </button>
          </div>
        );
      default:
        return <MerchantDashboard />;
    }
  };

  // Render Admin tab
  const renderAdminContent = () => {
    return <AdminDashboard />;
  };

  return (
    <DeviceSimulatorFrame>
      <div className="flex h-screen bg-gradient-to-br from-[#F5F2FD] via-[#ECE6FD] to-[#F8F6FF] overflow-hidden text-[#1E1B4B]">
        {/* Cashly Purple / Lavender Sidebar (Desktop & Tablet) */}
        {deviceView === 'responsive' && (
          <div className="hidden md:block h-full">
            <ResponsiveSidebar />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Navbar (Desktop & Tablet only) */}
          {deviceView === 'responsive' && (
            <div className="hidden md:block">
              <TopNavbar />
            </div>
          )}

          {/* Body Scrollable Area */}
          <main className="flex-1 overflow-y-auto p-0 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pb-20 md:pb-6">
              {platformMode === 'personal' && renderPersonalContent()}
              {platformMode === 'merchant' && renderMerchantContent()}
              {platformMode === 'admin' && renderAdminContent()}
            </div>
          </main>

          {/* Mobile Bottom Navigation (only on smartphone width or mobile view) */}
          {(deviceView === 'mobile' || (deviceView === 'responsive')) && (
            <div className="block md:hidden">
              <MobileBottomNavigation />
            </div>
          )}
        </div>
      </div>

      {/* Global Modals Manager */}
      <ModalContainer />

      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-[#2A1054] text-white text-xs font-bold shadow-2xl border border-purple-500/40 animate-in slide-in-from-bottom duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-ping" />
          <span>{toast.message}</span>
        </div>
      )}
    </DeviceSimulatorFrame>
  );
}
