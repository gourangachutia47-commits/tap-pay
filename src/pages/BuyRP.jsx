import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import LevelTabs from '../components/LevelTabs';
import OrderCard from '../components/OrderCard';
import { getOrdersForLevel, sortOrders } from '../data/orders';

export default function BuyRP() {
  const [activeLevel, setActiveLevel] = useState('L1');
  const [sortDir, setSortDir] = useState('asc');
  const [refreshKey, setRefreshKey] = useState(0);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [txnRef, setTxnRef] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const { addRP, confirmPayment } = useAuth();

  const orders = useMemo(() => {
    const raw = getOrdersForLevel(activeLevel, 'buy');
    return sortOrders(raw, sortDir);
  }, [activeLevel, sortDir, refreshKey]);

  const toggleSort = () => {
    setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleReceive = async (order) => {
    // Record pending order first. RP is NOT credited yet.
    await addRP(order.amount, order.reward, order.bonus, order.id);
    setPendingPaymentOrder(order);
    setTxnRef('');
  };

  const handleConfirmDone = async (e) => {
    e.preventDefault();
    if (!pendingPaymentOrder) return;
    setConfirming(true);
    await confirmPayment(pendingPaymentOrder.id);
    setConfirming(false);
    setSuccessToast(`Payment Confirmed! Added ${pendingPaymentOrder.finalRP.toFixed(2)} RP to your balance.`);
    setPendingPaymentOrder(null);
    setTimeout(() => setSuccessToast(''), 4500);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Toast */}
      {successToast && (
        <div className="absolute top-14 left-4 right-4 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg animate-bounce text-center">
          ✓ {successToast}
        </div>
      )}

      {/* Level Tabs */}
      <LevelTabs activeLevel={activeLevel} onLevelChange={setActiveLevel} />

      {/* Sort Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <button
          onClick={toggleSort}
          className="flex items-center gap-1.5 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
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

      {/* Commission Rate Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-amber-800">⚡ Special Tier Commission: 7.0%</span>
        <span className="text-[10px] text-amber-700 font-semibold">Credited upon payment verification</span>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto custom-scroll bg-blue-50/30">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              mode="buy"
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

      {/* Payment Confirmation Modal */}
      {pendingPaymentOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 slide-in border border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl font-bold">
                💳
              </div>
              <h3 className="text-base font-extrabold text-gray-900">Confirm Payment Completion</h3>
              <p className="text-xs text-gray-500 mt-1">
                We redirected you to Paytm for ₹{pendingPaymentOrder.amount.toFixed(2)}. Did you complete the transaction?
              </p>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Amount:</span>
                <span className="font-bold text-gray-800">₹{pendingPaymentOrder.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reward (7%):</span>
                <span className="font-bold text-emerald-600">+{pendingPaymentOrder.reward.toFixed(2)} RP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tier Bonus:</span>
                <span className="font-bold text-emerald-600">+{pendingPaymentOrder.bonus.toFixed(2)} RP</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200 font-bold">
                <span className="text-gray-800">RP to be Credited:</span>
                <span className="text-primary">{pendingPaymentOrder.finalRP.toFixed(2)} RP</span>
              </div>
            </div>

            <form onSubmit={handleConfirmDone} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  UPI Ref / UTR Number (from Paytm receipt)
                </label>
                <input
                  type="text"
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  placeholder="e.g. 423871928312"
                  className="w-full text-xs font-mono border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPendingPaymentOrder(null)}
                  className="flex-1 py-3 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  Cancel / Later
                </button>
                <button
                  type="submit"
                  disabled={confirming}
                  className="flex-1 py-3 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-md shadow-primary/20 disabled:opacity-60"
                >
                  {confirming ? 'Checking...' : 'Yes, I Paid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
