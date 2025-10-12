import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import BuyerHome from './components/BuyerHome';
import SellerHome from './components/SellerHome';
import { useAuth } from './context/AuthContext';

function App() {
  const { token, login, logout } = useAuth();

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {token?.userType === 'buyer'
                ? <BuyerHome userInfo={token} onLogout={logout} />
                : <SellerHome userInfo={token} onLogout={logout} />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
