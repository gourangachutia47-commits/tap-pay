import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const slides = [
    // SLIDE 1: REFERRAL BONUS (Exact replica of media_1789663785705.jpg)
    {
      id: 'referral',
      route: '/referral',
      render: () => (
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#990000] via-[#D10000] to-[#E63900] p-3 flex items-center justify-between text-white select-none shadow-md border border-red-400/30">
          {/* Sparkle background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          <div className="absolute -right-6 -top-6 w-36 h-36 bg-yellow-400/30 rounded-full blur-xl pointer-events-none" />

          {/* Left Column */}
          <div className="relative z-10 flex-1 pr-1">
            <h3 className="text-sm sm:text-base font-black tracking-tight text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">
              REFERRAL BONUS
            </h3>

            <div className="mt-1.5 space-y-1">
              <div className="bg-[#5C0000]/80 border border-yellow-400/40 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5">
                <span className="text-[9px]">👤</span>
                <span className="text-[9px] font-bold text-yellow-100 uppercase">
                  Refer a new user: <strong className="text-yellow-300">Earn ₹200</strong>
                </span>
              </div>
              <div className="bg-[#5C0000]/80 border border-yellow-400/40 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5">
                <span className="text-[9px]">📅</span>
                <span className="text-[9px] font-bold text-yellow-100 uppercase">
                  Complete 7 days: <strong className="text-yellow-300">Earn extra ₹300</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Equals sign */}
          <div className="relative z-10 text-yellow-300 font-black text-xl px-1 drop-shadow">
            =
          </div>

          {/* Right Column (GET ₹500 Plaque) */}
          <div className="relative z-10 text-right flex flex-col items-center justify-center pl-1">
            <span className="text-yellow-300 font-black text-xs uppercase tracking-widest drop-shadow leading-none">
              GET
            </span>
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-300 to-amber-500 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] leading-none mt-0.5 tracking-tight">
              ₹500
            </div>
            <div className="mt-1 flex items-center gap-0.5">
              <span className="text-xs">🎁</span>
              <span className="text-[9px] font-extrabold text-yellow-200 bg-black/40 px-1.5 py-0.2 rounded-full">
                Claim ›
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 2: TOP 10 USDT & TRX LEADERBOARD (Exact replica of media_1789663785662.jpg)
    {
      id: 'leaderboard-crypto',
      route: '/deposit',
      render: () => (
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a0a0a] via-[#1a1405] to-[#120800] p-3 flex items-center justify-between text-white select-none shadow-md border border-amber-500/30">
          <div className="absolute inset-0 bg-[radial-gradient(#e6b800_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
          <div className="absolute left-1/2 -top-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Left: 3D Tether USDT + Tron TRX coins */}
          <div className="relative z-10 flex items-center -space-x-2 flex-shrink-0">
            {/* USDT Coin */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-emerald-300 p-0.5 shadow-xl flex items-center justify-center z-10 border border-white/40">
              <div className="w-full h-full rounded-full bg-[#0d3b36] flex items-center justify-center font-black text-xl text-emerald-300">
                ₮
              </div>
            </div>
            {/* TRX Coin */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-orange-400 p-0.5 shadow-lg flex items-center justify-center z-0 border border-white/40">
              <div className="w-full h-full rounded-full bg-[#3d0800] flex items-center justify-center font-black text-xs text-red-400">
                ▲
              </div>
            </div>
          </div>

          {/* Center/Right: Trophy & Title */}
          <div className="relative z-10 flex-1 pl-3 text-right flex flex-col items-end">
            <div className="flex items-center gap-2">
              <div className="text-2xl drop-shadow-[0_2px_4px_rgba(255,215,0,0.6)]">🏆</div>
              <div className="text-left">
                <h3 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 leading-tight font-serif drop-shadow">
                  Top 10 USDT&TRX
                </h3>
                <p className="text-xs font-serif font-black text-yellow-300 tracking-wider">
                  Leaderboard
                </p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-amber-200 mt-1 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
              Live Ranking ›
            </span>
          </div>
        </div>
      ),
    },

    // SLIDE 3: SUBORDINATE USER GROWTH TOP 10 (Exact replica of media_1789663785666.jpg)
    {
      id: 'growth-top10',
      route: '/referral',
      render: () => (
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#941b0c] via-[#bd1f07] to-[#e63900] p-3 flex items-center justify-between text-white select-none shadow-md border border-amber-300/40">
          <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:14px_14px] opacity-30" />
          <div className="absolute right-6 -bottom-6 w-36 h-36 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />

          {/* Left: Growth bars & arrow */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex items-end gap-1 h-10 pb-0.5">
              <div className="w-2 h-4 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-sm shadow" />
              <div className="w-2 h-6 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-sm shadow" />
              <div className="w-2 h-8 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-sm shadow" />
              <div className="w-2.5 h-10 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-sm shadow flex items-start justify-center">
                <span className="text-[8px] text-red-900 font-black">▲</span>
              </div>
            </div>

            <div className="text-left">
              <p className="text-[11px] font-serif font-black text-amber-200 drop-shadow">
                Subordinate User Growth
              </p>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none mt-0.5">
                Top 10
              </h3>
            </div>
          </div>

          {/* Right: Golden Trophy */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-3xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">🏆</div>
            <span className="text-[9px] font-black text-yellow-950 bg-gradient-to-r from-yellow-300 to-amber-400 px-2 py-0.5 rounded-full shadow mt-1">
              View Team ›
            </span>
          </div>
        </div>
      ),
    },

    // SLIDE 4: COMPLETE FOR 10 CONSECUTIVE DAYS / GET ₹1000 (Exact replica of media_1789663785670.jpg)
    {
      id: 'consecutive-task',
      route: '/buy-rp',
      render: () => (
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#120800] via-[#241300] to-[#120800] p-3 flex flex-col justify-between text-white select-none shadow-md border border-amber-500/50">
          <div className="absolute inset-0 bg-[radial-gradient(#e6b800_1px,transparent_1px)] [background-size:18px_18px] opacity-25" />

          {/* Top Logo & Title Ribbon */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-amber-500/30">
              <img src="/tap-pay-logo.png" alt="Tap Pay" className="w-4 h-4 rounded-md object-contain" />
              <span className="text-[10px] font-black text-white tracking-tight">Tap Pay Task</span>
            </div>
            <span className="text-[9px] font-bold text-amber-300">Daily Trading Challenge</span>
          </div>

          {/* Golden Ribbon Banner Text */}
          <div className="relative z-10 text-center my-0.5">
            <p className="text-[10px] font-black text-amber-200 tracking-wider uppercase">
              COMPLETE FOR 10 CONSECUTIVE DAYS
            </p>
            <p className="text-[9px] text-gray-300 font-semibold">BUY 30 ORDERS DAILY</p>
          </div>

          {/* Big Golden Plaque: Get ₹1000 */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-yellow-950 font-black text-base sm:text-lg px-6 py-1 rounded-full shadow-lg border border-yellow-100 flex items-center gap-1">
              <span>Get</span>
              <span className="text-xl sm:text-2xl font-black">₹1000</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 3800);
    return () => clearInterval(timer);
  }, [next]);

  const activeSlide = slides[current];

  return (
    <div className="relative px-4">
      {/* Clickable Banner Box */}
      <div
        onClick={() => navigate(activeSlide.route)}
        className="h-[125px] cursor-pointer transition-all duration-300 active:scale-[0.99]"
      >
        {activeSlide.render()}
      </div>

      {/* 8 Dot Indicators from the screenshot */}
      <div className="flex justify-center items-center gap-1.5 mt-2.5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((dotIndex) => {
          const isActive = dotIndex === current % 8;
          return (
            <span
              key={dotIndex}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2 h-2 bg-white shadow-sm ring-1 ring-blue-500'
                  : 'w-1.5 h-1.5 bg-white/40'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
