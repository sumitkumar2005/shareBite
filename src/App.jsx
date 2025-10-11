import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import BuyerHome from './components/BuyerHome'
import SellerHome from './components/SellerHome'

// Wrapper components to handle navigation
const LandingPageWrapper = () => {
  const navigate = useNavigate()

  const handleNavigation = (page) => {
    if (page === 'login') {
      navigate('/login')
    } else if (page === 'signup') {
      navigate('/register')
    }
  }

  return <LandingPage onNavigate={handleNavigation} />
}

const LoginWrapper = ({ onLogin }) => {
  const navigate = useNavigate()

  const handleToggleForm = () => {
    navigate('/register')
  }

  return <Login onToggleForm={handleToggleForm} onLogin={onLogin} />
}

const SignupWrapper = ({ onSignup }) => {
  const navigate = useNavigate()

  const handleToggleForm = () => {
    navigate('/login')
  }

  return <Signup onToggleForm={handleToggleForm} onSignup={onSignup} />
}

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    // Mock login logic - in real app, this would validate credentials
    console.log('Login data:', userData)
    setUser({
      id: 1,
      email: userData.email,
      userType: 'buyer', // This would come from your authentication system
      name: 'John Doe'
    })
  }

  const handleSignup = (userData) => {
    // The signup logic is now handled directly in the Signup component
    // This function can be removed or used for additional post-signup logic
    console.log('Signup completed:', userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" replace />
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/login" element={<LoginWrapper onLogin={handleLogin} />} />
        <Route path="/register" element={<SignupWrapper onSignup={handleSignup} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.userType === 'buyer'
                ? <BuyerHome userInfo={user} onLogout={handleLogout} />
                : <SellerHome userInfo={user} onLogout={handleLogout} />
              }
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
