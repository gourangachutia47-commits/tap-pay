import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TapPayLogo from '../components/TapPayLogo';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (phone.length !== 10) {
      setError('Please enter your 10-digit mobile number');
      return;
    }
    if (!password) {
      setError('Please enter your login password');
      return;
    }

    setLoading(true);
    const result = await login(phone, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white px-6 pt-10 pb-8 overflow-y-auto hide-scrollbar">
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-8">
        <TapPayLogo size="md" />
        <span className="text-xs bg-blue-50 text-primary font-bold px-2.5 py-1 rounded-full">v1.0</span>
      </div>

      {/* Greeting */}
      <h1 className="text-3xl font-black text-gray-900 leading-tight">
        Hello,<br />Welcome to <span className="text-primary">Tap Pay</span>
      </h1>
      <p className="text-xs text-gray-400 mt-1 font-medium">Linking wealth, Unlocking growth!</p>

      {/* Form */}
      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        {/* Phone Input */}
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
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

        {/* Password */}
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-primary">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400 font-medium"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex-shrink-0 text-gray-400">
            {showPassword ? (
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
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs text-center font-bold">{error}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-base py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/30 mt-2 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      {/* Forgot Password */}
      <p className="text-center mt-4">
        <button className="text-primary text-xs font-semibold underline underline-offset-2">
          forget the password?
        </button>
      </p>

      {/* Register Link */}
      <p className="text-center mt-4 text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary font-bold">
          Register
        </Link>
      </p>

      {/* Logo Display Bottom */}
      <div className="flex-1" />
      <div className="text-center mt-8 flex flex-col items-center">
        <img
          src="/tap-pay-logo.png"
          alt="Tap Pay Logo"
          className="w-16 h-16 rounded-2xl shadow-md object-cover mb-2 border border-gray-100"
        />
        <p className="text-gray-900 font-black text-sm tracking-tight">Tap Pay</p>
        <p className="text-gray-400 text-xs font-medium">Linking wealth, Unlocking growth!</p>
      </div>
    </div>
  );
}
