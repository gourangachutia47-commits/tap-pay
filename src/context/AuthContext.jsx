import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);
const STORAGE_SESSION_KEY = 'rp_auth_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or sync user profile with Supabase profiles table
  const fetchProfileByPhone = async (phone) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phone)
        .maybeSingle();

      if (data) {
        setProfile(data);
        setUser({ id: data.id, phone: data.phone });
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch notice:', e);
    }
    return null;
  };

  // Restore session on initial load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_SESSION_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.phone) {
            const dbData = await fetchProfileByPhone(parsed.phone);
            if (!dbData) {
              setUser(parsed);
              setProfile(parsed);
            }
          }
        }
      } catch (err) {
        console.error('Session init error', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Update profile in state, localStorage, and Supabase
  const updateProfile = async (updates) => {
    const currentPhone = profile?.phone || user?.phone;
    if (!currentPhone) return;

    const merged = { ...profile, ...updates };
    setProfile(merged);
    setUser({ id: merged.id, phone: merged.phone });
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(merged));

    try {
      await supabase
        .from('profiles')
        .update(updates)
        .eq('phone', currentPhone);
    } catch (e) {
      console.warn('Supabase profile sync notice:', e);
    }
  };

  // Direct Phone + Password Registration with multi-tier referral tracking
  const register = async (phone, loginPassword, fundPassword, invitationCode) => {
    try {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phone)
        .maybeSingle();

      if (existing) {
        return { success: false, error: 'Mobile number already registered. Please login.' };
      }

      const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
        ? crypto.randomUUID() 
        : 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);

      const userReferralCode = 'RP' + phone.slice(-4) + Math.floor(100 + Math.random() * 900);

      // Find Level A parent if valid referral code entered
      let parentId = null;
      let grandParentId = null;
      let greatGrandParentId = null;

      if (invitationCode) {
        try {
          const { data: parent } = await supabase
            .from('profiles')
            .select('id, parent_id, grand_parent_id')
            .eq('referral_code', invitationCode)
            .maybeSingle();

          if (parent) {
            parentId = parent.id;
            grandParentId = parent.parent_id || null;
            greatGrandParentId = parent.grand_parent_id || null;
          }
        } catch (_) {}
      }

      const newProfile = {
        id: newId,
        phone,
        fund_password: fundPassword,
        invitation_code: invitationCode || '',
        referral_code: userReferralCode,
        referred_by: invitationCode || null,
        parent_id: parentId,
        grand_parent_id: grandParentId,
        great_grand_parent_id: greatGrandParentId,
        referral_level_a_count: 0,
        referral_level_b_count: 0,
        referral_level_c_count: 0,
        referral_level_a_earnings: 0,
        referral_level_b_earnings: 0,
        referral_level_c_earnings: 0,
        referral_earnings: 0,
        level: 'L1',
        rp_balance: 0,
        wallet_balance: 0,
        usdt_balance: 0,
        buy_quantity: 0,
        buy_amount: 0,
        total_revenue: 0,
        created_at: new Date().toISOString()
      };

      await supabase.from('profiles').insert(newProfile);

      // Increment parent team counters
      if (parentId) {
        try {
          const { data: p } = await supabase.from('profiles').select('referral_level_a_count').eq('id', parentId).single();
          if (p) {
            await supabase.from('profiles').update({
              referral_level_a_count: (p.referral_level_a_count || 0) + 1
            }).eq('id', parentId);
          }
        } catch (_) {}
      }

      if (grandParentId) {
        try {
          const { data: gp } = await supabase.from('profiles').select('referral_level_b_count').eq('id', grandParentId).single();
          if (gp) {
            await supabase.from('profiles').update({
              referral_level_b_count: (gp.referral_level_b_count || 0) + 1
            }).eq('id', grandParentId);
          }
        } catch (_) {}
      }

      if (greatGrandParentId) {
        try {
          const { data: ggp } = await supabase.from('profiles').select('referral_level_c_count').eq('id', greatGrandParentId).single();
          if (ggp) {
            await supabase.from('profiles').update({
              referral_level_c_count: (ggp.referral_level_c_count || 0) + 1
            }).eq('id', greatGrandParentId);
          }
        } catch (_) {}
      }

      const registry = JSON.parse(localStorage.getItem('rp_local_registry') || '{}');
      registry[phone] = { password: loginPassword, profile: newProfile };
      localStorage.setItem('rp_local_registry', JSON.stringify(registry));

      setUser({ id: newId, phone });
      setProfile(newProfile);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newProfile));

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  // Direct Phone + Password Login
  const login = async (phone, password) => {
    try {
      const registry = JSON.parse(localStorage.getItem('rp_local_registry') || '{}');
      const localRecord = registry[phone];

      const { data: dbProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phone)
        .maybeSingle();

      if (!dbProfile && !localRecord) {
        return { success: false, error: 'Mobile number not found. Please register first.' };
      }

      if (localRecord && localRecord.password && localRecord.password !== password) {
        return { success: false, error: 'Incorrect password' };
      }

      const activeProfile = dbProfile || localRecord.profile;
      setUser({ id: activeProfile.id, phone: activeProfile.phone });
      setProfile(activeProfile);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(activeProfile));

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    setUser(null);
    setProfile(null);
  };

  // Add RP order as pending
  const addRP = async (amount, reward, bonus, orderId) => {
    const finalRP = parseFloat((reward + bonus).toFixed(2));
    try {
      if (user?.id) {
        await supabase.from('orders').insert({
          id: orderId,
          user_id: user.id,
          type: 'buy',
          amount,
          reward,
          bonus,
          final_rp: amount + finalRP,
          payment_status: 'pending',
        });
      }
    } catch (e) {
      console.warn('Supabase order insert notice:', e);
    }
    return orderId;
  };

  // Confirm payment and distribute 3-level referral commissions:
  // Level A: 3% of purchase amount
  // Level B: 0.5% of purchase amount
  // Level C: 0.3% of purchase amount
  const confirmPayment = async (orderId, amount = 200, reward = 14, bonus = 2) => {
    if (!profile) return;
    const finalRP = parseFloat((amount + reward + bonus).toFixed(2));

    const newRPBalance = parseFloat(((Number(profile.rp_balance) || 0) + finalRP).toFixed(2));
    const newBuyQty = (Number(profile.buy_quantity) || 0) + 1;
    const newBuyAmount = parseFloat(((Number(profile.buy_amount) || 0) + amount).toFixed(2));
    const newRevenue = parseFloat(((Number(profile.total_revenue) || 0) + reward + bonus).toFixed(2));

    await updateProfile({
      rp_balance: newRPBalance,
      buy_quantity: newBuyQty,
      buy_amount: newBuyAmount,
      total_revenue: newRevenue,
    });

    try {
      await supabase.from('orders').update({ payment_status: 'completed' }).eq('id', orderId);
    } catch (_) {}

    // Distribute Multi-tier Referral Commissions on Purchase
    const purchaseAmount = Number(amount) || 0;
    if (purchaseAmount > 0) {
      // 1. Level A Parent (3%)
      if (profile.parent_id) {
        try {
          const commissionA = parseFloat((purchaseAmount * 0.03).toFixed(2));
          const { data: pA } = await supabase.from('profiles').select('wallet_balance, referral_earnings, referral_level_a_earnings').eq('id', profile.parent_id).single();
          if (pA) {
            await supabase.from('profiles').update({
              wallet_balance: parseFloat(((Number(pA.wallet_balance) || 0) + commissionA).toFixed(2)),
              referral_earnings: parseFloat(((Number(pA.referral_earnings) || 0) + commissionA).toFixed(2)),
              referral_level_a_earnings: parseFloat(((Number(pA.referral_level_a_earnings) || 0) + commissionA).toFixed(2)),
            }).eq('id', profile.parent_id);
          }
        } catch (_) {}
      }

      // 2. Level B Grandparent (0.5%)
      if (profile.grand_parent_id) {
        try {
          const commissionB = parseFloat((purchaseAmount * 0.005).toFixed(2));
          const { data: pB } = await supabase.from('profiles').select('wallet_balance, referral_earnings, referral_level_b_earnings').eq('id', profile.grand_parent_id).single();
          if (pB) {
            await supabase.from('profiles').update({
              wallet_balance: parseFloat(((Number(pB.wallet_balance) || 0) + commissionB).toFixed(2)),
              referral_earnings: parseFloat(((Number(pB.referral_earnings) || 0) + commissionB).toFixed(2)),
              referral_level_b_earnings: parseFloat(((Number(pB.referral_level_b_earnings) || 0) + commissionB).toFixed(2)),
            }).eq('id', profile.grand_parent_id);
          }
        } catch (_) {}
      }

      // 3. Level C Great-Grandparent (0.3%)
      if (profile.great_grand_parent_id) {
        try {
          const commissionC = parseFloat((purchaseAmount * 0.003).toFixed(2));
          const { data: pC } = await supabase.from('profiles').select('wallet_balance, referral_earnings, referral_level_c_earnings').eq('id', profile.great_grand_parent_id).single();
          if (pC) {
            await supabase.from('profiles').update({
              wallet_balance: parseFloat(((Number(pC.wallet_balance) || 0) + commissionC).toFixed(2)),
              referral_earnings: parseFloat(((Number(pC.referral_earnings) || 0) + commissionC).toFixed(2)),
              referral_level_c_earnings: parseFloat(((Number(pC.referral_level_c_earnings) || 0) + commissionC).toFixed(2)),
            }).eq('id', profile.great_grand_parent_id);
          }
        } catch (_) {}
      }
    }
  };

  // RP Withdrawal request
  const requestWithdrawal = async (rpAmount, payoutType, payoutDetail) => {
    if (!profile) return { success: false, error: 'Not logged in' };
    const numRp = parseFloat(rpAmount);

    if (isNaN(numRp) || numRp <= 0) {
      return { success: false, error: 'Enter a valid RP amount' };
    }
    if ((Number(profile.rp_balance) || 0) < numRp) {
      return { success: false, error: 'Insufficient RP balance' };
    }

    const inrValue = numRp;
    const newRPBalance = parseFloat(((Number(profile.rp_balance) || 0) - numRp).toFixed(2));

    await updateProfile({
      rp_balance: newRPBalance,
    });

    const withdrawalId = 'WD' + Date.now();
    try {
      await supabase.from('transactions').insert({
        user_id: user?.id,
        type: 'withdrawal',
        amount: inrValue,
        description: `RP Withdrawal of ${numRp} RP to ${payoutType}: ${payoutDetail}`,
        status: 'pending',
        reference_id: withdrawalId,
      });
    } catch (_) {}

    return { success: true, withdrawalId, amount: inrValue };
  };

  // Deposit USDT (1 USDT = 110 INR)
  const addDeposit = async (usdtAmount, chainType) => {
    if (!profile) return null;

    const inrAmount = parseFloat((usdtAmount * 110).toFixed(2));
    const bonusScore = parseFloat((usdtAmount * 0.02).toFixed(2));
    const orderNo = 'U' + Date.now() + Math.floor(Math.random() * 10000);

    const address = chainType === 'TRC20'
      ? 'TKXPTD9A4FFtLKQhZeJpoWv9UPC8Ts6gYf'
      : '0x123178e57ccaabf00a183354c38a96bd0e473d70';

    const deposit = {
      id: orderNo,
      user_id: user?.id,
      usdt_amount: usdtAmount,
      inr_amount: inrAmount,
      bonus: bonusScore,
      score: parseFloat((usdtAmount + bonusScore).toFixed(2)),
      chain_type: chainType,
      address,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      await supabase.from('deposits').insert(deposit);
    } catch (_) {}

    await updateProfile({
      usdt_balance: parseFloat(((Number(profile.usdt_balance) || 0) + usdtAmount).toFixed(2)),
      wallet_balance: parseFloat(((Number(profile.wallet_balance) || 0) + inrAmount).toFixed(2)),
    });

    return deposit;
  };

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
    updateProfile,
    addRP,
    confirmPayment,
    requestWithdrawal,
    addDeposit,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
