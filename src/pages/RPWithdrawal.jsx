import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RPWithdrawal() {
  const { profile, requestWithdrawal } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState('upi'); // 'upi' | 'bank'
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [fundPassword, setFundPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const rpBalance = Number(profile?.rp_balance) || 0;
  const numAmount = parseFloat(amount) || 0;
  const inrReceive = numAmount;

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (numAmount < 100) {
      setError('Minimum withdrawal amount is 100 RP');
      return;
    }
    if (numAmount > rpBalance) {
      setError('Insufficient RP balance');
      return;
    }

    if (method === 'upi' && !upiId.trim()) {
      setError('Please enter your valid UPI ID / VPA');
      return;
    }

    if (method === 'bank') {
      if (!accountNumber || !ifsc || !accountHolder) {
        setError('Please fill in all bank account details');
        return;
      }
    }

    // Fund Password Verification
    if (!fundPassword || fundPassword.length !== 6) {
      setError('Please enter your 6-digit fund password');
      return;
    }

    if (profile?.fund_password && profile.fund_password !== fundPassword) {
      setError('Incorrect fund password. Please enter the PIN you set during registration.');
      return;
    }

    const payoutDetail = method === 'upi' ? upiId : `${accountHolder} - A/C: ${accountNumber} (${ifsc})`;
    setLoading(true);
    const res = await requestWithdrawal(numAmount, method.toUpperCase(), payoutDetail);
    setLoading(false);

    if (res.success) {
      setSuccess({
        id: res.withdrawalId,
        amount: res.amount,
        target: payoutDetail,
      });
      setAmount('');
      setUpiId('');
      setAccountNumber('');
      setIfsc('');
      setAccountHolder('');
      setFundPassword('');
    } else {
      setError(res.error || 'Withdrawal failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto hide-scrollbar pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-3 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-8">RP Withdrawal</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-primary rounded-2xl p-5 text-white shadow-md">
          <p className="text-xs text-white/80 font-medium">Available RP Balance</p>
          <div className="flex items-baseline justify-between mt-1">
            <h2 className="text-3xl font-black">{rpBalance.toFixed(2)} <span className="text-lg font-bold">RP</span></h2>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">1 RP = ₹1.00 INR</span>
          </div>
          <p className="text-[11px] text-white/70 mt-2">
            Withdrawals are processed directly to your registered UPI or Bank.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <h3 className="font-bold text-sm">Withdrawal Request Submitted</h3>
            </div>
            <p className="text-xs text-emerald-800">
              Reference ID: <span className="font-mono font-bold">{success.id}</span>
            </p>
            <p className="text-xs text-emerald-800">
              Amount: <span className="font-bold">₹{success.amount.toFixed(2)}</span> to {success.target}
            </p>
            <p className="text-[10px] text-emerald-600">Expected credit time: 5-15 minutes.</p>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleWithdrawal} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Withdrawal Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition-all ${
                  method === 'upi' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 text-gray-600'
                }`}
              >
                <span>⚡</span> UPI Payout
              </button>
              <button
                type="button"
                onClick={() => setMethod('bank')}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition-all ${
                  method === 'bank' ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 text-gray-600'
                }`}
              >
                <span>🏦</span> Bank Transfer
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700">Withdraw RP Amount</label>
              <button
                type="button"
                onClick={() => setAmount(String(rpBalance))}
                className="text-xs text-primary font-bold hover:underline"
              >
                Max All
              </button>
            </div>
            <div className="relative flex items-center border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus-within:border-primary">
              <span className="text-sm font-bold text-gray-400 mr-2">RP</span>
              <input
                type="number"
                min="100"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Minimum 100 RP"
                className="bg-transparent flex-1 text-sm font-bold text-gray-900 outline-none"
                required
              />
            </div>
            {numAmount > 0 && (
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                You will receive in account: ₹{inrReceive.toFixed(2)} INR
              </p>
            )}
          </div>

          {/* UPI DETAILS */}
          {method === 'upi' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">UPI ID (Paytm / GPay / PhonePe)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. 9876543210@paytm"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-xs bg-gray-50 outline-none focus:border-primary font-medium"
                required
              />
            </div>
          )}

          {/* BANK DETAILS */}
          {method === 'bank' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="Full name as in bank"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-xs bg-gray-50 outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bank Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter account number"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-xs bg-gray-50 outline-none focus:border-primary font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  placeholder="e.g. PYTM0123456"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-xs bg-gray-50 outline-none focus:border-primary font-mono uppercase"
                  required
                />
              </div>
            </div>
          )}

          {/* FUND PASSWORD (SECURITY PIN) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              6-Digit Fund Password (Security PIN)
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 focus-within:border-primary">
              <span className="text-sm text-gray-400 mr-2">🔒</span>
              <input
                type="password"
                maxLength={6}
                value={fundPassword}
                onChange={(e) => setFundPassword(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit fund password"
                className="bg-transparent flex-1 text-sm font-mono tracking-widest text-gray-900 outline-none"
                required
              />
              <span className="text-xs text-gray-400">{fundPassword.length}/6</span>
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-bold text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-primary/20 active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Verifying & Submitting...' : 'Confirm Withdrawal'}
          </button>
        </form>

        {/* Withdrawal Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-900 text-xs space-y-1">
          <p className="font-bold flex items-center gap-1"><span>⚠️</span> Withdrawal Policy:</p>
          <p>• Minimum withdrawal: 100 RP</p>
          <p>• Payout ratio: 1 RP = ₹1.00 INR</p>
          <p>• Fund password verification is strictly required for payout security.</p>
        </div>
      </div>
    </div>
  );
}
