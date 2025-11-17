import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

const LOCAL_KEY = 'mern-social-user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
  }, [user]);

  const signup = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', payload);
      setUser(res.data.user);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', payload);
      setUser(res.data.user);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    signup,
    login,
    forgotPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

