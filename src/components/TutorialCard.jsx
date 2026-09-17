export default function TutorialCard({ title, type, onWatch }) {
  // Vector graphics matching realistic native fintech apps instead of emoji
  const illustrations = {
    intro: (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    ),
    tutorial: (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
      </div>
    ),
    solution: (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
          <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
    ),
  };

  return (
    <div className="mx-4 mb-3 bg-white border border-gray-100/90 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
      <div className="flex-1 pr-2">
        <h4 className="text-gray-900 font-extrabold text-sm mb-2.5 tracking-tight">{title}</h4>
        <div className="flex gap-2">
          <button
            onClick={() => onWatch && onWatch('en', title)}
            className="flex items-center gap-1 bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] rounded-full px-3 py-1.5 text-xs text-primary font-bold transition-all active:scale-95"
          >
            watch video <span className="text-[10px] text-primary/70">›</span>
          </button>
          <button
            onClick={() => onWatch && onWatch('hi', title)}
            className="flex items-center gap-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium transition-all active:scale-95"
          >
            वीडियो देखें <span className="text-[10px] text-gray-400">›</span>
          </button>
        </div>
      </div>

      {illustrations[type] || illustrations.intro}
    </div>
  );
}
