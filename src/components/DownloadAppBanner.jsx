import { useState } from 'react';

export default function DownloadAppBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-[#0F172A] text-white px-3 py-2 flex items-center justify-between border-b border-white/10 relative z-30 shadow-sm">
      <div className="flex items-center gap-2.5">
        <img
          src="/tap-pay-logo.png"
          alt="Tap Pay"
          className="w-7 h-7 rounded-lg object-contain bg-white p-0.5"
        />
        <div>
          <p className="text-xs font-black leading-none text-white tracking-tight">Tap Pay App</p>
          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Download Android APK (v1.0)</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/tappay.apk"
          download="TapPay.apk"
          className="bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all flex items-center gap-1"
        >
          <span>📥</span> Download
        </a>
        <button
          onClick={() => setClosed(true)}
          className="text-gray-400 hover:text-white p-1 text-xs"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
