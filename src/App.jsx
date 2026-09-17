import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import BottomNav from './components/BottomNav';
import FloatingChat from './components/FloatingChat';
import Home from './pages/Home';
import BuyRP from './pages/BuyRP';
import RPWithdrawal from './pages/RPWithdrawal';
import Referral from './pages/Referral';
import Mine from './pages/Mine';
import Login from './pages/Login';
import Register from './pages/Register';
import Deposit from './pages/Deposit';
import OrderConfirmation from './pages/OrderConfirmation';
import LinkWallet from './pages/LinkWallet';
import TransactionHistory from './pages/TransactionHistory';
import Terms from './pages/Terms';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full relative">
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/buy-rp" element={<ProtectedRoute><BuyRP /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><RPWithdrawal /></ProtectedRoute>} />
        <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
        <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
        <Route path="/mine" element={<ProtectedRoute><Mine /></ProtectedRoute>} />
        <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/link-wallet" element={<ProtectedRoute><LinkWallet /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Show navigation when authenticated */}
      {user && (
        <>
          <FloatingChat />
          <BottomNav />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
