import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import LevelTabs from '../components/LevelTabs';
import OrderCard from '../components/OrderCard';
import { getOrdersForLevel, sortOrders } from '../data/orders';

export default function SellRP() {
  const [activeLevel, setActiveLevel] = useState('L1');
  const [sortDir, setSortDir] = useState('asc');
  const [refreshKey, setRefreshKey] = useState(0);
  const { sellRP, user } = useAuth();

  const orders = useMemo(() => {
    const raw = getOrdersForLevel(activeLevel, 'sell');
    return sortOrders(raw, sortDir);
  }, [activeLevel, sortDir, refreshKey]);

  const toggleSort = () => {
    setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleReceive = (order) => {
    const result = sellRP(order.amount, order.reward, order.bonus, order.id);
    if (result && !result.success) {
      alert(result.error || 'Sell failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* RP Balance indicator */}
      <div className="bg-primary px-4 py-2 flex items-center justify-between">
        <span className="text-white/70 text-xs">Your RP Balance:</span>
        <span className="text-white font-bold text-sm">{(user?.rpBalance || 0).toFixed(2)} RP</span>
      </div>

      {/* Level Tabs */}
      <LevelTabs activeLevel={activeLevel} onLevelChange={setActiveLevel} />

      {/* Sort Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <button
          onClick={toggleSort}
          className="flex items-center gap-1.5 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full"
        >
          {sortDir === 'asc' ? 'From low to high' : 'From high to low'}
          <svg className={`w-3 h-3 transition-transform ${sortDir === 'desc' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 text-gray-600 text-xs font-medium hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto custom-scroll bg-blue-50/30">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              mode="sell"
              onReceive={handleReceive}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm font-medium">No orders available</p>
            <p className="text-xs mt-1">Check back later for new orders</p>
          </div>
        )}
      </div>
    </div>
  );
}
