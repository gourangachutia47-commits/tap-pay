import { useState, useEffect } from 'react';

export default function WelcomeNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show on initial visit per session
    const seen = sessionStorage.getItem('seen_welcome_notice');
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('seen_welcome_notice', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 border border-gray-100 slide-in text-left">
        {/* Banner Graphic */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📢</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Platform Notice
            </span>
          </div>
          <h3 className="text-lg font-black leading-tight">Welcome to Tap Pay</h3>
          <p className="text-xs text-blue-100 mt-1">Official terms of use & platform disclosure</p>
        </div>

        {/* Content & Clear Risk Notice */}
        <div className="max-h-60 overflow-y-auto custom-scroll space-y-3 pr-1 text-xs text-gray-700">
          <p className="font-semibold text-gray-900">
            Welcome to the Tap Pay digital asset & reward platform. Please review the terms of service below prior to participating:
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-xs text-amber-950">
              <span>⚠️</span> Financial Risk Disclosure:
            </p>
            <p className="text-[11px] leading-relaxed">
              Trading and participating in point recharge involves financial market volatility. Digital recharges and conversions may contain risk of loss of money. Please evaluate your personal risk tolerance and participate responsibly at your own discretion.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="font-bold text-gray-800">Platform Policies:</p>
            <p>• All withdrawals require 6-digit Fund Password authentication.</p>
            <p>• USDT deposits are converted at 1 USDT = ₹110 INR guaranteed rate.</p>
            <p>• Customer support is available 24/7 via official Telegram: @is00z.</p>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleAccept}
          className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-primary/20 active:scale-95"
        >
          I Understand & Agree
        </button>
      </div>
    </div>
  );
}
