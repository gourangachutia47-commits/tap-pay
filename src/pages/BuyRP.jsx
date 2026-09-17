import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import LevelTabs from '../components/LevelTabs';
import OrderCard from '../components/OrderCard';
import { getOrdersForLevel, sortOrders } from '../data/orders';
import { getNextUpi, createPaytmIntentUrl, createGenericUpiIntentUrl, createStandardUpiUrl, safelyOpenUpiLink } from '../data/upi';

export default function BuyRP() {
  const [activeLevel, setActiveLevel] = useState('L1');
  const [sortDir, setSortDir] = useState('asc');
  const [refreshKey, setRefreshKey] = useState(0);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [activeUpiAccount, setActiveUpiAccount] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
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
    // Select rotating UPI account for this order
    const upi = getNextUpi();
    setActiveUpiAccount(upi);

    // Record order in pending state
    await addRP(order.amount, order.reward, order.bonus, order.id);
    setPendingPaymentOrder(order);
    setTxnRef('');
    setCopiedUpi(false);
    setShowQr(false);
  };

  const copyUpiId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handlePaytmIntent = () => {
    if (!pendingPaymentOrder || !activeUpiAccount) return;
    const url = createPaytmIntentUrl(activeUpiAccount.id, pendingPaymentOrder.amount, `Order #${pendingPaymentOrder.id}`);
    safelyOpenUpiLink(url);
  };

  const handleGenericUpiIntent = () => {
    if (!pendingPaymentOrder || !activeUpiAccount) return;
    const url = createGenericUpiIntentUrl(activeUpiAccount.id, pendingPaymentOrder.amount, `Order #${pendingPaymentOrder.id}`);
    safelyOpenUpiLink(url);
  };

  const handleConfirmDone = async (e) => {
    e.preventDefault();
    if (!pendingPaymentOrder) return;
    setConfirming(true);
    await confirmPayment(pendingPaymentOrder.id, pendingPaymentOrder.amount, pendingPaymentOrder.reward, pendingPaymentOrder.bonus);
    setConfirming(false);
    setSuccessToast(`Payment Confirmed! Added ${pendingPaymentOrder.finalRP.toFixed(2)} RP to your balance.`);
    setPendingPaymentOrder(null);
    setTimeout(() => setSuccessToast(''), 4500);
  };

  const standardUpiString = pendingPaymentOrder && activeUpiAccount
    ? createStandardUpiUrl(activeUpiAccount.id, pendingPaymentOrder.amount, `Order #${pendingPaymentOrder.id}`)
    : '';

  const qrCodeUrl = standardUpiString
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(standardUpiString)}`
    : '';

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-gray-50">
      {/* Toast Alert */}
      {successToast && (
        <div className="absolute top-14 left-4 right-4 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg animate-bounce text-center">
          ✓ {successToast}
        </div>
      )}

      {/* Level Tabs */}
      <LevelTabs activeLevel={activeLevel} onLevelChange={setActiveLevel} />

      {/* Sort & Filter Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100 shadow-sm">
        <button
          onClick={toggleSort}
          className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform"
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
      <div className="bg-amber-50/80 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
        <span className="text-[11px] font-black text-amber-900">⚡ Tier Commission: 7.0%</span>
        <span className="text-[10px] text-amber-700 font-bold">Instant RP Credit on UTR Confirm</span>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto custom-scroll divide-y divide-gray-100">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            mode="buy"
            onReceive={handleReceive}
          />
        ))}
      </div>

      {/* Payment Checkout Modal (Android WebView Safe — Zero ERR_UNKNOWN_URL_SCHEME) */}
      {pendingPaymentOrder && activeUpiAccount && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 slide-in border border-gray-100 max-h-[90vh] overflow-y-auto hide-scrollbar text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-base font-bold">
                  💳
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 leading-none">Complete Payment</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Order #{pendingPaymentOrder.id}</p>
                </div>
              </div>
              <button
                onClick={() => setPendingPaymentOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Order Value Highlight */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[10px] text-blue-200 font-bold uppercase">Pay Exact Amount</p>
                <p className="text-2xl font-black mt-0.5">₹{pendingPaymentOrder.amount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-yellow-200 font-bold">You Receive</p>
                <p className="text-base font-black text-yellow-300">+{pendingPaymentOrder.finalRP.toFixed(2)} RP</p>
              </div>
            </div>

            {/* UPI ID Copy Box */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-700">
                Pay to Paytm UPI ID
              </label>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <span className="font-mono text-xs font-bold text-gray-800 select-all">
                  {activeUpiAccount.id}
                </span>
                <button
                  type="button"
                  onClick={() => copyUpiId(activeUpiAccount.id)}
                  className="bg-primary hover:bg-primary-dark text-white font-bold text-[11px] px-3 py-1 rounded-lg active:scale-95 transition-transform"
                >
                  {copiedUpi ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Payment App Launch Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePaytmIntent}
                className="py-2.5 px-3 bg-[#002E6E] hover:bg-[#001D47] text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>💙</span> Open Paytm
              </button>
              <button
                type="button"
                onClick={handleGenericUpiIntent}
                className="py-2.5 px-3 bg-[#107C41] hover:bg-[#0A532B] text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>📱</span> Any UPI App
              </button>
            </div>

            {/* QR Code Toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="text-[11px] text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                {showQr ? 'Hide Payment QR' : '📷 Show QR Code to Scan & Pay'}
              </button>

              {showQr && qrCodeUrl && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-2xl inline-block shadow-inner">
                  <img src={qrCodeUrl} alt="UPI QR Code" className="w-36 h-36 mx-auto rounded-lg" />
                  <p className="text-[10px] text-gray-500 font-semibold mt-1">Scan using any UPI app</p>
                </div>
              )}
            </div>

            {/* Confirmation Form */}
            <form onSubmit={handleConfirmDone} className="pt-2 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Enter 12-Digit UPI Reference / UTR (from payment receipt)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value.trim())}
                  placeholder="e.g. 423871928312"
                  className="w-full text-xs font-mono font-bold border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-primary bg-gray-50"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPendingPaymentOrder(null)}
                  className="flex-1 py-3 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={confirming}
                  className="flex-1 py-3 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-md shadow-primary/20 disabled:opacity-60"
                >
                  {confirming ? 'Verifying...' : 'Confirm Paid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
