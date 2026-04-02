import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../instant/axios';
import { AuthContext } from './AuthContextObject';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');

  const refreshUser = useCallback(async () => {
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const response = await axiosInstance.get('/api/auth/me');
      setUser(response.data.user || null);
    } catch {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const signInWithGoogle = async (googleToken) => {
    setIsSigningIn(true);
    setAuthError('');

    try {
      const response = await axiosInstance.post('/api/auth/google', { token: googleToken });
      const nextUser = response.data.user || null;
      setUser(nextUser);
      return { success: true, user: nextUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Google sign-in failed. Please try again.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setAuthError('');
    }
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isAuthLoading,
    isSigningIn,
    authError,
    setAuthError,
    signInWithGoogle,
    logout,
    refreshUser,
  }), [user, isAuthLoading, isSigningIn, authError, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
