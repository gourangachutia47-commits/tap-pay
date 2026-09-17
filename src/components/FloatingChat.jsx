import { useState } from 'react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button — Exact replica from screenshot (Dark navy/blue circle with white headset) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-4 w-12 h-12 bg-[#1C3FAA] hover:bg-[#15328A] rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-95 transition-transform border border-white/20"
        aria-label="Customer Support"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a9 9 0 0 0-9 9c0 1.9.58 3.67 1.58 5.15L3.5 21.5l5.65-1.03A8.96 8.96 0 0 0 12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9zm-4 13.5c-.83 0-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5zm8 0c-.83 0-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5z"/>
        </svg>
      </button>

      {/* Customer Support Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 border border-gray-100 slide-in text-left">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#1C3FAA] flex items-center justify-center text-white text-base font-bold shadow-sm">
                  🎧
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 leading-none">Customer Support</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Online 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <a
                href="https://t.me/is00z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-sky-50 border border-sky-200 rounded-2xl hover:bg-sky-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm">
                    ✈️
                  </div>
                  <div>
                    <p className="font-bold text-xs text-sky-950">Telegram Support</p>
                    <p className="text-xs text-sky-700 font-mono font-bold">@is00z</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-sky-700 bg-white px-3 py-1.5 rounded-lg border border-sky-200">
                  Open Chat ›
                </span>
              </a>

              <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600 space-y-1">
                <p className="font-bold text-gray-800">Support Availability:</p>
                <p>• 24/7 Dedicated Support Representative</p>
                <p>• Fast response for order verifications & top-up issues</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
