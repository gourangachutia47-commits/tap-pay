import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-100 px-2 pb-2 pt-1.5 safe-area-bottom shadow-lg z-30">
      <div className="flex justify-around items-center">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-0.5 px-3 min-w-[60px] ${
              isActive ? 'text-black font-extrabold' : 'text-gray-400 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg className="w-6 h-6" fill={isActive ? '#000000' : '#8E8E93'} viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="text-[10px] tracking-tight">Home</span>
            </>
          )}
        </NavLink>

        {/* Buy RP */}
        <NavLink
          to="/buy-rp"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-0.5 px-3 min-w-[60px] ${
              isActive ? 'text-black font-extrabold' : 'text-gray-400 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-black tracking-tighter ${
                  isActive ? 'border-black text-black' : 'border-[#8E8E93] text-[#8E8E93]'
                }`}
              >
                RP
              </div>
              <span className="text-[10px] tracking-tight">Buy RP</span>
            </>
          )}
        </NavLink>

        {/* Withdraw / Sell RP */}
        <NavLink
          to="/withdraw"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-0.5 px-3 min-w-[60px] ${
              isActive ? 'text-black font-extrabold' : 'text-gray-400 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-black tracking-tighter ${
                  isActive ? 'border-black text-black' : 'border-[#8E8E93] text-[#8E8E93]'
                }`}
              >
                RP
              </div>
              <span className="text-[10px] tracking-tight">Sell RP</span>
            </>
          )}
        </NavLink>

        {/* Mine */}
        <NavLink
          to="/mine"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-0.5 px-3 min-w-[60px] ${
              isActive ? 'text-black font-extrabold' : 'text-gray-400 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg className="w-6 h-6" fill="none" stroke={isActive ? '#000000' : '#8E8E93'} strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] tracking-tight">Mine</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
