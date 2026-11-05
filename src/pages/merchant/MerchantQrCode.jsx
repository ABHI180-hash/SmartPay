import React from 'react';
import { QrCode, Download, Printer, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartPayLogo } from '../../components/common/SmartPayLogo';

export const MerchantQrCode = () => {
  const { merchant, showToast } = useApp();

  const handleDownload = () => {
    showToast('High-resolution printable Standee downloaded (PDF)', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-[#1E1B4B] tracking-tight">
          Merchant QR Code & Standee
        </h2>
        <p className="text-xs text-[#718096]">
          All-in-one universal UPI QR code accepted by PhonePe, Google Pay, Paytm, CRED & BHIM
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Printable Standee Mockup */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0B1F3A] bg-white flex flex-col text-center">
            {/* Top Navy Branding Header */}
            <div className="bg-[#0B1F3A] text-white p-5 flex flex-col items-center">
              <SmartPayLogo variant="light" size="md" />
              <div className="mt-2 text-xs font-semibold text-emerald-300 uppercase tracking-widest">
                Accepted Here • All UPI Apps
              </div>
            </div>

            {/* Standee Body */}
            <div className="p-6 flex flex-col items-center bg-gradient-to-b from-white to-slate-50">
              <h3 className="text-lg font-extrabold text-[#1E1B4B]">{merchant.storeName}</h3>
              <p className="text-xs font-mono font-bold text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full mt-1">
                acmestore@smartpay
              </p>

              {/* QR Code Container */}
              <div className="my-5 p-4 rounded-2xl bg-white border-2 border-[#7C3AED] shadow-md inline-block">
                <img
                  src={merchant.qrCodeUrl}
                  alt="Merchant QR"
                  className="w-48 h-48 object-contain"
                />
              </div>

              {/* Supported payment badges */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100">GPay</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">PhonePe</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Paytm</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">BHIM</span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Transaction Fee (0% MDR)</span>
              </div>
            </div>

            {/* Bottom Standee footer */}
            <div className="bg-[#1E1B4B] text-white py-2.5 px-4 text-[11px] font-bold">
              SmartPay • Pay Smart. Live Secure.
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#EDE9FE] shadow-card space-y-4">
            <h3 className="text-base font-bold text-[#1E1B4B]">QR Actions & Print</h3>
            <p className="text-xs text-[#718096] leading-relaxed">
              Order or print free tabletop counter standees for your billing cash register. Every payment made here automatically triggers the SmartPay Audio Soundbox alert!
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleDownload}
                className="w-full py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6222BD] text-white text-xs font-bold transition-all shadow-md shadow-[#7C3AED]/20 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Printable Acrylic Standee (A5 PDF)</span>
              </button>

              <button
                onClick={() => showToast('Printing sent to local printer...', 'info')}
                className="w-full py-3 rounded-xl border border-[#EDE9FE] hover:bg-slate-50 text-[#1E1B4B] text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#718096]" />
                <span>Print QR Sticker</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#EDE9FE] text-[#6222BD] border border-[#8B5CF6]/30 text-xs">
            <h4 className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              Smart Dynamic QR Available
            </h4>
            <p className="mt-1 leading-relaxed text-[#7C3AED]">
              You can also integrate this QR with your POS billing software to automatically embed bill amounts into the customer QR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
