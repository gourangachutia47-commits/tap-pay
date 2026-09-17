import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TapPayLogo from '../components/TapPayLogo';

export default function Register() {
  const [phone, setPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [confirmLoginPassword, setConfirmLoginPassword] = useState('');
  const [fundPassword, setFundPassword] = useState('');
  const [confirmFundPassword, setConfirmFundPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [showFields, setShowFields] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const toggleShow = (field) => {
    setShowFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const EyeIcon = ({ field }) => (
    <button type="button" onClick={() => toggleShow(field)} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
      {showFields[field] ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      )}
    </button>
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (loginPassword.length < 6) {
      setError('Login password must be at least 6 characters');
      return;
    }
    if (loginPassword !== confirmLoginPassword) {
      setError('Login passwords do not match');
      return;
    }
    if (fundPassword.length !== 6) {
      setError('Fund password must be exactly 6 digits');
      return;
    }
    if (fundPassword !== confirmFundPassword) {
      setError('Fund passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(phone, loginPassword, fundPassword, invitationCode);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white px-6 pt-10 pb-8 overflow-y-auto hide-scrollbar">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/login')} className="text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <TapPayLogo size="sm" showText={false} />
      </div>

      {/* Header */}
      <h1 className="text-3xl font-black text-gray-900 mb-1">Register</h1>
      <p className="text-xs text-gray-400 mb-6">Create your Tap Pay account in seconds</p>

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-3">
        {/* Phone */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Please enter your phone number"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
            required
          />
          <span className="text-xs text-gray-400 flex-shrink-0">{phone.length}/10</span>
        </div>

        {/* Login Password */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          <input
            type={showFields.loginPw ? 'text' : 'password'}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Enter your login password"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
            required
          />
          <EyeIcon field="loginPw" />
        </div>

        {/* Confirm Login Password */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          <input
            type={showFields.confirmLoginPw ? 'text' : 'password'}
            value={confirmLoginPassword}
            onChange={(e) => setConfirmLoginPassword(e.target.value)}
            placeholder="Confirm your login password"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
            required
          />
          <EyeIcon field="confirmLoginPw" />
        </div>

        {/* Fund Password */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <div className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center flex-shrink-0">
            <span className="text-[8px] text-gray-400 font-bold">123</span>
          </div>
          <input
            type={showFields.fundPw ? 'text' : 'password'}
            maxLength={6}
            value={fundPassword}
            onChange={(e) => setFundPassword(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter your fund password"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
            required
          />
          <span className="text-xs text-gray-400 mr-1">{fundPassword.length}/6</span>
          <EyeIcon field="fundPw" />
        </div>

        {/* Confirm Fund Password */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <div className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center flex-shrink-0">
            <span className="text-[8px] text-gray-400 font-bold">123</span>
          </div>
          <input
            type={showFields.confirmFundPw ? 'text' : 'password'}
            maxLength={6}
            value={confirmFundPassword}
            onChange={(e) => setConfirmFundPassword(e.target.value.replace(/\D/g, ''))}
            placeholder="Confirm your fund password"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
            required
          />
          <span className="text-xs text-gray-400 mr-1">{confirmFundPassword.length}/6</span>
          <EyeIcon field="confirmFundPw" />
        </div>

        {/* Invitation Code */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <input
            type="text"
            maxLength={8}
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter a 6,8 digit invitation code"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
          />
          <span className="text-xs text-gray-400 flex-shrink-0">{invitationCode.length}/8</span>
        </div>

        {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-base py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/30 mt-4 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-bold">Login</Link>
      </p>
      <p className="text-center mt-6 text-gray-300 text-xs">Tap Pay • Secured System</p>
    </div>
  );
}
