import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const USDT_RATE = 110; // 1 USDT = 110 INR
const BONUS_RATE = 0.02; // 2% bonus

const chains = [
  { id: 'TRC20', name: 'TRC20', network: 'USDT-TRON Network', icon: '🟢', address: 'TKXPTD9A4FFtLKQhZeJpoWv9UPC8Ts6gYf' },
  { id: 'BSC', name: 'BSC(BEP20)', network: 'USDT-BNB Smart Chain', icon: '🟡', address: '0x123178e57ccaabf00a183354c38a96bd0e473d70' },
];

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState('TRC20');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addDeposit } = useAuth();
  const navigate = useNavigate();

  const numAmount = parseFloat(amount) || 0;
  const inrCredited = (numAmount * USDT_RATE).toFixed(2);
  const estimatedBonus = parseFloat((numAmount * BONUS_RATE).toFixed(2));
  const youReceive = parseFloat((numAmount + estimatedBonus).toFixed(2));

  const handleDeposit = async () => {
    setError('');
    if (numAmount <= 0) {
      setError('Please enter a valid USDT amount');
      return;
    }
    if (!selectedChain) {
      setError('Please select a chain type');
      return;
    }

    setLoading(true);
    const deposit = await addDeposit(numAmount, selectedChain);
    setLoading(false);

    if (deposit) {
      navigate('/order-confirmation', { state: { deposit } });
    } else {
      setError('Could not initiate deposit. Please try again.');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto hide-scrollbar pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-emerald-600 flex-1 text-center pr-10">Deposit USDT</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Rate Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-emerald-100 font-medium">Guaranteed Conversion Rate</p>
              <h2 className="text-2xl font-black mt-0.5">1 USDT = ₹{USDT_RATE} INR</h2>
            </div>
            <span className="text-3xl">🪙</span>
          </div>
          <p className="text-[11px] text-emerald-100 mt-2">
            Add USDT to your account. Your wallet balance will directly reflect ₹{USDT_RATE} INR per dollar.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-50 text-xs text-gray-700 space-y-1.5">
          <p><span className="text-emerald-600 font-bold">1.</span> Enter the USDT amount you want to deposit.</p>
          <p><span className="text-emerald-600 font-bold">2.</span> Choose your preferred network (TRC20 or BEP20).</p>
          <p><span className="text-emerald-600 font-bold">3.</span> Send USDT to the specified address to receive your INR balance.</p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Deposit Amount</p>
            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              Fixed: 1 USDT = ₹{USDT_RATE} INR
            </p>
          </div>

          {/* Input */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-emerald-500">
            <div className="bg-emerald-600 text-white font-black text-sm px-4 py-3.5">
              USDT
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter USDT Amount"
              className="flex-1 px-3 py-3.5 outline-none text-base text-gray-900 font-black placeholder-gray-300"
              min="1"
              step="any"
              required
            />
          </div>

          {/* Dynamic INR Reflection Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-emerald-800 font-bold uppercase">Credited INR to Account</p>
              <p className="text-xl font-black text-emerald-700">₹{inrCredited} INR</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-semibold">Bonus Score</p>
              <p className="text-xs font-bold text-emerald-600">+{estimatedBonus.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Chain Type */}
        <div>
          <p className="text-sm font-bold text-gray-800 mb-2">Select Chain Type</p>
          <div className="space-y-2.5">
            {chains.map((chain) => (
              <button
                key={chain.id}
                type="button"
                onClick={() => setSelectedChain(chain.id)}
                className={`w-full flex items-center gap-3 bg-white rounded-xl p-4 border-2 transition-all text-left ${
                  selectedChain === chain.id
                    ? 'border-emerald-500 shadow-sm bg-emerald-50/20'
                    : 'border-gray-200'
                }`}
              >
                <span className="text-2xl">{chain.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-900 font-bold text-sm">{chain.name}</p>
                  <p className="text-gray-500 text-xs">{chain.network}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedChain === chain.id ? 'border-emerald-500' : 'border-gray-300'
                }`}>
                  {selectedChain === chain.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
          <span className="text-amber-600">⚠️</span>
          <p className="text-amber-800 text-xs font-medium">
            After the transfer is completed, please wait 3-5 minutes for the blockchain deposit to confirm and reflect.
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center font-bold">{error}</p>
        )}

        {/* Deposit Button */}
        <button
          onClick={handleDeposit}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/30 disabled:opacity-60"
        >
          {loading ? 'Generating Deposit Order...' : `Proceed with USDT Deposit (₹${inrCredited})`}
        </button>
      </div>
    </div>
  );
}
