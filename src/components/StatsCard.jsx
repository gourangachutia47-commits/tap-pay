import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StatsCard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const buyQty = profile?.buy_quantity || 0;
  const buyAmt = Number(profile?.buy_amount) || 0.0;
  const sellToday = Number(profile?.sell_today) || 0.0;
  const totalRev = Number(profile?.total_revenue) || 0.0;

  return (
    <div className="mx-4 mt-2.5 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
        {/* Item 1: Buy quantity */}
        <div>
          <div className="flex items-center gap-1.5 text-gray-800">
            {/* Calendar icon with rupee */}
            <svg className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-bold text-xs leading-none">Buy quantity</span>
          </div>
          <p className="text-gray-900 text-base font-bold mt-2 pl-0.5 leading-none">
            {buyQty}
          </p>
        </div>

        {/* Item 2: Buy Amount */}
        <div>
          <div className="flex items-center gap-1.5 text-gray-800">
            {/* Banknote icon with rupee */}
            <svg className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-bold text-xs leading-none">Buy Amount</span>
          </div>
          <p className="text-gray-900 text-base font-bold mt-2 pl-0.5 leading-none">
            {buyAmt.toFixed(1)}
          </p>
        </div>

        {/* Item 3: Sell today */}
        <div>
          <div className="flex items-center gap-1.5 text-gray-800">
            {/* Sync circular arrows icon */}
            <svg className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-bold text-xs leading-none">Sell today</span>
          </div>
          <p className="text-gray-900 text-base font-bold mt-2 pl-0.5 leading-none">
            {sellToday.toFixed(1)}
          </p>
        </div>

        {/* Item 4: Total revenue */}
        <div>
          <div className="flex items-center gap-1.5 text-gray-800">
            {/* Pie chart / revenue icon */}
            <svg className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span className="font-bold text-xs leading-none">Total revenue</span>
          </div>
          <p className="text-gray-900 text-base font-bold mt-2 pl-0.5 leading-none">
            {totalRev.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Centered 'More >' link */}
      <div className="text-center mt-3 pt-2.5 border-t border-gray-100">
        <button
          onClick={() => navigate('/history')}
          className="text-gray-400 hover:text-gray-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
        >
          More <span className="text-[10px]">›</span>
        </button>
      </div>
    </div>
  );
}
