import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import BuyerHome from './components/BuyerHome';
import SellerHome from './pages/seller/SellerHome';
import { useAuth } from './context/AuthContext';

function App() {
  const { token, user, login, logout } = useAuth();

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Signup />} />

        {/* Role-based routes */}
        <Route
          path="/seller-home"
          element={
            <ProtectedRoute>
              <SellerHome userInfo={user || token} onLogout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer-home"
          element={
            <ProtectedRoute>
              <BuyerHome userInfo={user || token} onLogout={logout} />
            </ProtectedRoute>
          }
        />

        {/* Legacy dashboard route - redirect based on user role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === 'sender' || token?.userType === 'seller'
                ? <Navigate to="/seller-home" replace />
                : <Navigate to="/buyer-home" replace />}
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
