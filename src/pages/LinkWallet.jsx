import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WALLET_PROVIDERS = [
  { id: 'paytm', name: 'Paytm Wallet', icon: '💙', color: 'bg-sky-50 text-sky-600 border-sky-200' },
  { id: 'mobikwik', name: 'MobiKwik', icon: '⚡', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { id: 'paytm_business', name: 'Paytm for Business', icon: '🏢', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'gpay_business', name: 'Google Pay Business', icon: '🌐', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 'freecharge', name: 'Freecharge', icon: '🟠', color: 'bg-orange-50 text-orange-600 border-orange-200' },
];

export default function LinkWallet() {
  const navigate = useNavigate();
  const { linkWallet, verifyWalletOTP, getWallets } = useAuth();

  const [wallets, setWallets] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [step, setStep] = useState('list'); // 'list' | 'input' | 'otp'
  const [pendingWalletId, setPendingWalletId] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadWallets = async () => {
    const list = await getWallets();
    setWallets(list);
  };

  useEffect(() => {
    loadWallets();
  }, []);

  const handleStartLink = (provider) => {
    setSelectedProvider(provider);
    setPhoneNumber('');
    setUpiId('');
    setError('');
    setStep('input');
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    const res = await linkWallet(selectedProvider.id, phoneNumber, upiId);
    setLoading(false);

    if (res.success) {
      setPendingWalletId(res.walletId);
      setGeneratedOtp(res.otp);
      setStep('otp');
    } else {
      setError(res.error || 'Failed to request OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!enteredOtp || enteredOtp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    const res = await verifyWalletOTP(pendingWalletId, enteredOtp);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(`${selectedProvider.name} linked successfully!`);
      setStep('list');
      setEnteredOtp('');
      await loadWallets();
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setError(res.error || 'Verification failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto hide-scrollbar">
      {/* Top Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => step === 'list' ? navigate(-1) : setStep('list')} className="text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">
          {step === 'list' ? 'Link Wallets' : step === 'input' ? `Link ${selectedProvider?.name}` : 'Verify OTP'}
        </h1>
        <div className="w-6" />
      </div>

      <div className="p-4 flex-1">
        {successMsg && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
            ✓ {successMsg}
          </div>
        )}

        {/* STEP 1: WALLET LIST */}
        {step === 'list' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-600 mb-3">Linked Accounts</h2>
              {wallets.filter(w => w.verified).length === 0 ? (
                <p className="text-xs text-gray-400 py-2">No wallets linked yet. Select one below to link.</p>
              ) : (
                <div className="space-y-2">
                  {wallets.filter(w => w.verified).map(w => {
                    const provider = WALLET_PROVIDERS.find(p => p.id === w.wallet_type);
                    return (
                      <div key={w.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{provider?.icon || '💳'}</span>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{provider?.name || w.wallet_type}</p>
                            <p className="text-xs text-gray-500 font-mono">+91 {w.phone_number}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-600 mb-3">Available Wallets to Connect</h2>
              <div className="grid grid-cols-1 gap-2.5">
                {WALLET_PROVIDERS.map(provider => {
                  const isLinked = wallets.some(w => w.wallet_type === provider.id && w.verified);
                  return (
                    <button
                      key={provider.id}
                      onClick={() => handleStartLink(provider)}
                      className="flex items-center justify-between p-3.5 border rounded-xl hover:bg-gray-50 transition-all text-left press-effect"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{provider.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{provider.name}</p>
                          <p className="text-xs text-gray-400">Instant OTP Authentication</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                        isLinked ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-primary text-white border-primary'
                      }`}>
                        {isLinked ? 'Relink' : 'Connect'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PHONE & DETAILS */}
        {step === 'input' && (
          <form onSubmit={handleRequestOtp} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl mb-2">
              <span className="text-3xl">{selectedProvider?.icon}</span>
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedProvider?.name}</h3>
                <p className="text-xs text-blue-600">Enter linked phone number to receive OTP</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number (Linked to Wallet)</label>
              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 bg-gray-50">
                <span className="text-sm text-gray-500 font-semibold mr-2">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10 digit number"
                  className="bg-transparent flex-1 text-sm outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">UPI ID / VPA (Optional)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. 8099386968@paytm"
                className="w-full border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 text-sm outline-none text-gray-800"
              />
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-primary/20"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* STEP 3: OTP VERIFY */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                📱
              </div>
              <h3 className="text-base font-bold text-gray-900">Verify Verification Code</h3>
              <p className="text-xs text-gray-500 mt-1">
                OTP sent to +91 {phoneNumber} for {selectedProvider?.name}
              </p>
              {generatedOtp && (
                <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg inline-block">
                  <span className="text-xs text-amber-800 font-semibold">Demo Simulation OTP: </span>
                  <span className="text-sm font-black text-amber-900 tracking-widest">{generatedOtp}</span>
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                className="w-full text-center tracking-widest text-2xl font-bold border-2 border-primary/40 rounded-xl py-3 outline-none focus:border-primary"
                required
              />
            </div>

            {error && <p className="text-xs text-red-500 text-center font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20"
            >
              {loading ? 'Verifying...' : 'Verify & Link Wallet'}
            </button>

            <button
              type="button"
              onClick={() => setStep('input')}
              className="w-full text-xs text-gray-500 py-1 hover:underline"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
