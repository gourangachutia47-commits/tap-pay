import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Mine() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: '💸', label: 'RP Withdrawal', desc: 'Withdraw RP to UPI / Bank (1 RP = ₹1)', action: () => navigate('/withdraw') },
    { icon: '👥', label: 'Referral Program', desc: 'Earn 3-Tier team commissions', action: () => navigate('/referral') },
    { icon: '💎', label: 'USDT Top-up', desc: '1 USDT = ₹110 INR credited to balance', action: () => navigate('/deposit') },
    { icon: '📋', label: 'Transaction History', desc: 'All orders, deposits & withdrawals', action: () => navigate('/history') },
    { icon: '💳', label: 'Manage Wallets', desc: 'Paytm, MobiKwik, GPay Business', action: () => navigate('/link-wallet') },
    { icon: '📜', label: 'Terms of Service', desc: 'User agreement & policies', action: () => navigate('/terms') },
    { icon: '📞', label: 'Customer Support', desc: 'Telegram @is00z (24/7)', action: () => window.open('https://t.me/is00z', '_blank') },
  ];

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 pb-8">
      {/* Profile Header */}
      <div className="bg-gradient-primary pt-8 pb-12 px-4 shadow-md">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/40 shadow-inner">
            {(profile?.phone || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-lg tracking-wide">
              {profile?.phone ? `+91 ${profile.phone.substring(0, 4)}****${profile.phone.substring(8)}` : 'User'}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="bg-yellow-400 text-yellow-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                {profile?.level || 'L1'} Tier
              </span>
              <span className="text-white/80 text-xs font-mono">Commission: 7%</span>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors" title="Logout">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-gray-100">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Wallet INR</p>
              <p className="text-gray-900 font-black text-base mt-1">₹{(Number(profile?.wallet_balance) || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-primary text-[10px] font-bold uppercase tracking-wider">RP Points</p>
              <p className="text-primary font-black text-base mt-1">{(Number(profile?.rp_balance) || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">USDT</p>
              <p className="text-emerald-600 font-black text-base mt-1">{(Number(profile?.usdt_balance) || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/deposit')}
          className="bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-all active:scale-95 shadow-md shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span>💎</span> Deposit USDT
        </button>
        <button
          onClick={() => navigate('/withdraw')}
          className="bg-white text-primary font-bold text-sm py-3.5 rounded-xl border-2 border-primary hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>💸</span> Withdraw RP
        </button>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-gray-50 transition-colors press-effect text-left"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-gray-900 font-bold text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 py-3 text-red-600 font-bold text-sm bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-all shadow-sm"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
