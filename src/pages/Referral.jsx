import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Referral() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'teams'

  const referralCode = profile?.referral_code || ('RP' + (profile?.phone?.slice(-4) || '8888'));
  const shareLink = `${window.location.origin}/register?ref=${referralCode}`;

  const levelACount = Number(profile?.referral_level_a_count) || 0;
  const levelBCount = Number(profile?.referral_level_b_count) || 0;
  const levelCCount = Number(profile?.referral_level_c_count) || 0;
  const totalTeamCount = levelACount + levelBCount + levelCCount;

  const levelAEarnings = Number(profile?.referral_level_a_earnings) || 0;
  const levelBEarnings = Number(profile?.referral_level_b_earnings) || 0;
  const levelCEarnings = Number(profile?.referral_level_c_earnings) || 0;
  const totalCommission = (Number(profile?.referral_earnings) || (levelAEarnings + levelBEarnings + levelCEarnings)).toFixed(2);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto hide-scrollbar pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-3 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-8">3-Tier Referral System</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner Promo */}
        <div className="banner-referral rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-black/20 text-yellow-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              3-Level Team Commission
            </span>
            <h2 className="text-2xl font-black mt-2 leading-tight">REFERRAL REWARDS</h2>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between bg-black/15 p-2 rounded-xl">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-yellow-950 font-black text-[10px] flex items-center justify-center">A</span>
                  Level A (Direct Referral):
                </span>
                <strong className="text-yellow-200 text-sm font-black">3.0%</strong>
              </div>
              <div className="flex items-center justify-between bg-black/15 p-2 rounded-xl">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-300 text-blue-950 font-black text-[10px] flex items-center justify-center">B</span>
                  Level B (Secondary):
                </span>
                <strong className="text-yellow-200 text-sm font-black">0.5%</strong>
              </div>
              <div className="flex items-center justify-between bg-black/15 p-2 rounded-xl">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-300 text-emerald-950 font-black text-[10px] flex items-center justify-center">C</span>
                  Level C (Tertiary):
                </span>
                <strong className="text-yellow-200 text-sm font-black">0.3%</strong>
              </div>
            </div>
            <p className="text-[11px] text-white/80 mt-3">
              Earn lifetime commissions on every RP purchase your network completes!
            </p>
          </div>
        </div>

        {/* Global Commission Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Total Team Members</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{totalTeamCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Total Commission</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">₹{totalCommission}</p>
          </div>
        </div>

        {/* 3-Tier Breakdown Cards */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Team Tiers</h3>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Level A */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <div className="inline-block w-6 h-6 rounded-full bg-yellow-400 text-yellow-950 font-black text-xs leading-6 mb-1">
                A
              </div>
              <p className="text-[10px] font-bold text-yellow-900 uppercase">3.0% Rate</p>
              <p className="text-sm font-black text-gray-900 mt-1">{levelACount} Users</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">₹{levelAEarnings.toFixed(2)}</p>
            </div>

            {/* Level B */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <div className="inline-block w-6 h-6 rounded-full bg-blue-500 text-white font-black text-xs leading-6 mb-1">
                B
              </div>
              <p className="text-[10px] font-bold text-blue-900 uppercase">0.5% Rate</p>
              <p className="text-sm font-black text-gray-900 mt-1">{levelBCount} Users</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">₹{levelBEarnings.toFixed(2)}</p>
            </div>

            {/* Level C */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <div className="inline-block w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs leading-6 mb-1">
                C
              </div>
              <p className="text-[10px] font-bold text-emerald-900 uppercase">0.3% Rate</p>
              <p className="text-sm font-black text-gray-900 mt-1">{levelCCount} Users</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">₹{levelCEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Invitation Code & Link */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-800">Your Invitation Code</h3>
          
          <div className="flex items-center justify-between bg-gray-50 border-2 border-dashed border-primary/40 rounded-xl p-3">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Referral Code</p>
              <p className="text-xl font-black text-primary tracking-widest">{referralCode}</p>
            </div>
            <button
              onClick={() => copyToClipboard(referralCode)}
              className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm active:scale-95"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Share Referral Link</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="bg-transparent text-xs text-gray-700 flex-1 outline-none font-mono"
              />
              <button
                onClick={() => copyToClipboard(shareLink)}
                className="text-xs font-bold text-primary hover:underline flex-shrink-0"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* 3-Level Commission Explanation */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
          <h3 className="text-sm font-bold text-gray-900">Commission Structure Rules</h3>
          <div className="space-y-2.5 text-xs text-gray-600">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-800 text-xs">Level A (Direct Invite): 3.0%</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                When someone registers directly with your code and buys RP, you receive 3% of their purchase value in your wallet.
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-800 text-xs">Level B (Secondary Invite): 0.5%</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                When your Level A members invite their friends, you automatically receive 0.5% of all their RP purchases.
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-800 text-xs">Level C (Tertiary Invite): 0.3%</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                When your Level B members invite other users, you receive 0.3% of their RP purchases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
