import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // seconds

        if (decoded.exp < now) {
          logout(); // token expired
        } else {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
