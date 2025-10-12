import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(JSON.parse(storedToken));
  }, []);

  // Persist token whenever it changes
  useEffect(() => {
    if (token) localStorage.setItem('token', JSON.stringify(token));
    else localStorage.removeItem('token');
  }, [token]);

  // Save token after login
  const login = (tokenValue) => {
    setToken(tokenValue);
    // console.log(tokenValue.token);
  };

  // Clear token on logout
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
