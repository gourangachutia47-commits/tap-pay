import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BannerCarousel from '../components/BannerCarousel';
import StatsCard from '../components/StatsCard';

export default function Home() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [activeTutorial, setActiveTutorial] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-6 bg-[#FAFAFA]">
      {/* Curved Royal Blue Top Gradient Background matching screenshot */}
      <div className="relative bg-gradient-to-b from-[#2244E8] via-[#2F52FF] to-[#FAFAFA] pt-3 pb-2 px-0">
        {/* Carousel */}
        <BannerCarousel />
      </div>

      {/* Fixed Banner 1: USDT Top-up with Ornate Gold Frame & Treasure Chest of Tether Coins */}
      <div className="px-4 mt-2">
        <div
          onClick={() => navigate('/deposit')}
          className="relative rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform active:scale-[0.99] border-2 border-[#E5B54F] bg-gradient-to-r from-[#170535] via-[#2E0B5E] to-[#45108A] p-3 text-white flex items-center justify-between"
          style={{
            boxShadow: '0 4px 12px rgba(69, 16, 138, 0.25), inset 0 0 10px rgba(229, 181, 79, 0.3)'
          }}
        >
          {/* Left Text */}
          <div className="relative z-10 flex-1 pr-2">
            <h3 className="text-sm sm:text-base font-black tracking-tight text-white leading-none">
              USDT Top-up
            </h3>
            <p className="text-[10px] text-[#C4B5FD] font-medium mt-1">
              Safe • Fast • Convenient
            </p>
            <p className="text-xs font-black text-[#FDE047] mt-0.5">
              High Returns + Rebates
            </p>

            <div className="mt-1.5 inline-flex items-center gap-1 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-yellow-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow border border-yellow-200">
              <span>Top up</span>
              <span className="text-[9px]">›</span>
            </div>
          </div>

          {/* Right Treasure Chest filled with Gold Tether coins */}
          <div className="relative z-10 flex items-center justify-center flex-shrink-0">
            {/* Glowing Aura */}
            <div className="absolute w-20 h-20 bg-yellow-400/25 rounded-full blur-xl pointer-events-none" />

            {/* Chest Graphic */}
            <div className="relative flex flex-col items-center">
              {/* Stacked 3D Golden Tether Coins */}
              <div className="flex -space-x-2 -mb-2 z-10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-600 p-0.5 shadow-md flex items-center justify-center border border-yellow-100">
                  <div className="w-full h-full rounded-full bg-[#1e4e46] flex items-center justify-center font-black text-xs text-emerald-300">
                    ₮
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-600 p-0.5 shadow-md flex items-center justify-center border border-yellow-100">
                  <div className="w-full h-full rounded-full bg-[#1e4e46] flex items-center justify-center font-black text-xs text-emerald-300">
                    ₮
                  </div>
                </div>
              </div>

              {/* Wooden & Gold Chest Base */}
              <div className="w-16 h-10 rounded-lg bg-gradient-to-b from-[#b45309] to-[#78350f] border-2 border-[#fde047] shadow-lg flex items-center justify-center relative">
                <div className="w-2.5 h-2.5 rounded-full bg-[#fde047] border border-black/30 shadow-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Banner 2: DEPOSIT USDT & GET EXTRA BONUS (Cyber Green Style from Screenshot) */}
      <div className="px-4 mt-2">
        <div
          onClick={() => navigate('/deposit')}
          className="relative rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform active:scale-[0.99] border-2 border-[#00B4D8] bg-gradient-to-r from-[#021B2B] via-[#052840] to-[#0A3D62] p-2.5 px-3.5 flex items-center justify-between text-white"
        >
          <div>
            <h3 className="text-xs sm:text-sm font-black tracking-tight text-white leading-tight uppercase font-sans">
              DEPOSIT USDT
            </h3>
            <p className="text-sm sm:text-base font-black tracking-wide text-[#00E5FF] leading-tight">
              & GET EXTRA BONUS
            </p>
          </div>

          <button className="bg-gradient-to-r from-[#00D09C] to-[#00F5A0] text-[#013220] font-black text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full shadow-md tracking-wider uppercase border border-white/40 flex-shrink-0">
            ENTER EVENT
          </button>
        </div>
      </div>

      {/* Fixed Banner 3: New users 7-Day Daily bonus Get 1800 (from Screenshot media_1789663785662.jpg) */}
      <div className="px-4 mt-2">
        <div
          onClick={() => navigate('/referral')}
          className="relative rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform active:scale-[0.99] border border-blue-400/40 bg-gradient-to-r from-[#0047FF] via-[#0066FF] to-[#0088FF] p-2.5 px-3.5 flex items-center justify-between text-white"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🪙</span>
            <div>
              <p className="text-xs font-black leading-tight text-white">
                New users
              </p>
              <h4 className="text-xs sm:text-sm font-black text-[#FACC15] leading-tight">
                7-Day Daily bonus
              </h4>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-md border-2 border-[#FDE047] flex items-center gap-1">
            <span className="text-yellow-300 text-[10px]">★</span>
            <span>Get 1800</span>
          </div>
        </div>
      </div>

      {/* Stats Card (Pixel-perfect replica from screenshot) */}
      <StatsCard />

      {/* Tutorial Section (Exact replica of screenshot) */}
      <div className="mt-5 mb-2">
        <h2 className="text-gray-900 font-extrabold text-xl px-4 mb-3 tracking-tight">
          Tutorial
        </h2>

        {/* Purchase Introduction Card */}
        <div className="mx-4 mb-3 bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex-1 pr-2">
            <h4 className="text-gray-900 font-extrabold text-sm mb-3 tracking-tight">
              Purchase Introduction
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTutorial({ name: 'Purchase Introduction', lang: 'en' })}
                className="flex items-center gap-1 bg-[#EEF5FF] hover:bg-[#E0EDFF] border border-[#D0E2FF] rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
              >
                watch video <span className="text-gray-400 text-[11px]">›</span>
              </button>
              <button
                onClick={() => setActiveTutorial({ name: 'Purchase Introduction', lang: 'hi' })}
                className="flex items-center gap-1 bg-[#EEF5FF] hover:bg-[#E0EDFF] border border-[#D0E2FF] rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
              >
                वीडियो देखें <span className="text-gray-400 text-[11px]">›</span>
              </button>
            </div>
          </div>

          {/* Screenshot Smartphone / Order illustration */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 border border-blue-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
            <div className="w-full h-full bg-white rounded-xl shadow-inner flex flex-col items-center justify-center p-1">
              <div className="w-6 h-1 bg-primary/40 rounded-full mb-1" />
              <div className="w-8 h-5 bg-blue-50 rounded border border-blue-200 flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Tutorial Card */}
        <div className="mx-4 mb-3 bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex-1 pr-2">
            <h4 className="text-gray-900 font-extrabold text-sm mb-3 tracking-tight">
              Purchase Tutorial
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTutorial({ name: 'Purchase Tutorial', lang: 'en' })}
                className="flex items-center gap-1 bg-[#EEF5FF] hover:bg-[#E0EDFF] border border-[#D0E2FF] rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
              >
                watch video <span className="text-gray-400 text-[11px]">›</span>
              </button>
              <button
                onClick={() => setActiveTutorial({ name: 'Purchase Tutorial', lang: 'hi' })}
                className="flex items-center gap-1 bg-[#EEF5FF] hover:bg-[#E0EDFF] border border-[#D0E2FF] rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
              >
                वीडियो देखें <span className="text-gray-400 text-[11px]">›</span>
              </button>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-100 to-yellow-100 border border-amber-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
            <div className="w-full h-full bg-white rounded-xl shadow-inner flex flex-col items-center justify-center p-1">
              <span className="text-xl">👛</span>
            </div>
          </div>
        </div>

        {/* Solution to offline sales failure Card */}
        <div className="mx-4 mb-3 bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex-1 pr-2">
            <h4 className="text-gray-900 font-extrabold text-sm mb-3 tracking-tight">
              Solution to offline sales failure
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTutorial({ name: 'Solution to offline sales failure', lang: 'en' })}
                className="flex items-center gap-1 bg-[#EEF5FF] hover:bg-[#E0EDFF] border border-[#D0E2FF] rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
              >
                watch video <span className="text-gray-400 text-[11px]">›</span>
              </button>
              <button
                onClick={() => setActiveTutorial({ name: 'Solution to offline sales failure', lang: 'hi' })}
                className="flex items-center gap-1 bg-[#EEF5FF] hover:bg-[#E0EDFF] border border-[#D0E2FF] rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
              >
                वीडियो देखें <span className="text-gray-400 text-[11px]">›</span>
              </button>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-100 to-orange-100 border border-rose-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
            <div className="w-full h-full bg-white rounded-xl shadow-inner flex flex-col items-center justify-center p-1">
              <span className="text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Video Modal */}
      {activeTutorial && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 border border-gray-100 slide-in">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">{activeTutorial.name}</h3>
              <button onClick={() => setActiveTutorial(null)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>

            <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center text-center text-white p-4">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center mx-auto mb-2 text-xl shadow-lg">
                  ▶
                </div>
                <p className="text-xs font-bold text-gray-200">
                  {activeTutorial.lang === 'hi' ? 'वीडियो गाइड (हिंदी में)' : 'Interactive Guide'}
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl space-y-1">
              <p className="font-bold text-gray-800">Instructions:</p>
              <p>1. Go to <strong>Buy RP</strong> and select any level order (L1–L7).</p>
              <p>2. Tap Receive to trigger the Paytm payment link.</p>
              <p>3. Submit the payment UTR to receive RP + 7% commission bonus.</p>
            </div>

            <button
              onClick={() => setActiveTutorial(null)}
              className="w-full py-3 bg-[#0066FF] text-white font-bold text-xs rounded-xl shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
