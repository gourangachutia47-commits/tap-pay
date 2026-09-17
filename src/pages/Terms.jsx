import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto hide-scrollbar pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-3 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-8">Terms of Service</h1>
      </div>

      <div className="p-4 space-y-4 text-xs text-gray-600 leading-relaxed">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
          <h2 className="font-bold text-sm text-gray-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Tap Pay platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
          </p>

          <h2 className="font-bold text-sm text-gray-900">2. Account Responsibility</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their account credentials, login passwords, and 6-digit fund passwords. Any actions taken under your account remain your sole responsibility.
          </p>

          <h2 className="font-bold text-sm text-gray-900">3. Platform Rules & Conversion Rates</h2>
          <p>
            All digital point recharges, reward point exchanges, and USDT top-ups operate in accordance with designated exchange ratios (including 1 USDT = 110 INR). Processing timelines and blockchain confirmations may vary depending on network traffic.
          </p>

          <h2 className="font-bold text-sm text-gray-900">4. Risk Disclosure</h2>
          <p>
            Participation in digital assets, point exchanges, and online recharges involves market and operational volatility. Engaging in transactions entails inherent financial exposure, including the potential risk of loss of money. Users must evaluate their personal financial circumstances and participate at their own risk and discretion.
          </p>

          <h2 className="font-bold text-sm text-gray-900">5. Limitation of Liability</h2>
          <p>
            Tap Pay and its affiliates shall not be held liable for losses arising from unauthorized access, incorrect payment destination details provided by users, third-party wallet downtime, or unforeseen market circumstances.
          </p>
        </div>
      </div>
    </div>
  );
}
