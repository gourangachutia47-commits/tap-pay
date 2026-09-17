import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const deposit = state?.deposit;

  if (!deposit) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400">No order data found</p>
      </div>
    );
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Simple feedback
      const el = document.createElement('div');
      el.textContent = 'Copied!';
      el.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full z-50 animate-bounce';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    }).catch(() => {});
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toISOString().replace('T', ' ').substring(0, 19);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate('/')} className="mr-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-emerald-600 flex-1 text-center pr-10">Order</h1>
      </div>

      <div className="px-4 py-6">
        {/* Order Card */}
        <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
          {/* USDT Amount Header */}
          <div className="bg-emerald-50 py-5 text-center">
            <h2 className="text-emerald-600 font-black text-3xl">
              USDT {deposit.usdtAmount.toFixed(2)}
            </h2>
          </div>

          {/* Details */}
          <div className="divide-y divide-gray-100">
            {/* Address */}
            <div className="px-4 py-3.5 flex items-start justify-between">
              <div className="flex-1 mr-2">
                <p className="text-gray-500 text-xs font-medium">Address:</p>
                <p className="text-gray-800 text-sm font-mono mt-1 break-all">{deposit.address}</p>
              </div>
              <button
                onClick={() => copyToClipboard(deposit.address)}
                className="flex-shrink-0 mt-1 text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              </button>
            </div>

            {/* Type */}
            <div className="px-4 py-3.5 flex items-center justify-between">
              <p className="text-gray-500 text-xs font-medium">Type:</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  🟢 {deposit.chainType === 'TRC20' ? 'TRC20-USDT' : 'BEP20-USDT'}
                </span>
                <button onClick={() => copyToClipboard(deposit.chainType)} className="text-gray-400 hover:text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="px-4 py-3.5 flex items-center justify-between">
              <p className="text-gray-500 text-xs font-medium">Status:</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600 font-semibold text-sm">{deposit.status}</span>
                <button onClick={() => copyToClipboard(deposit.status)} className="text-gray-400 hover:text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Created At */}
            <div className="px-4 py-3.5 flex items-center justify-between">
              <p className="text-gray-500 text-xs font-medium">CreatedAt:</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-800 text-sm font-medium">{formatDate(deposit.createdAt)}</span>
                <button onClick={() => copyToClipboard(formatDate(deposit.createdAt))} className="text-gray-400 hover:text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Order Number */}
            <div className="px-4 py-3.5 flex items-center justify-between">
              <p className="text-gray-500 text-xs font-medium">NO:</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-800 text-sm font-mono">{deposit.id}</span>
                <button onClick={() => copyToClipboard(deposit.id)} className="text-gray-400 hover:text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
