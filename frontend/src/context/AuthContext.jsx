import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../instant/axios';
import { AuthContext } from './AuthContextObject';

const AUTH_SESSION_HINT_KEY = 'aviyukt_auth_session';

const getAuthSessionHint = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(AUTH_SESSION_HINT_KEY) === '1';
  } catch {
    return false;
  }
};

const setAuthSessionHint = (hasSession) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (hasSession) {
      window.localStorage.setItem(AUTH_SESSION_HINT_KEY, '1');
    } else {
      window.localStorage.removeItem(AUTH_SESSION_HINT_KEY);
    }
  } catch {
    // Ignore storage write failures (private mode / blocked storage).
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');

  const refreshUser = useCallback(async (force = false) => {
    const shouldProbeFromPath = typeof window !== 'undefined' &&
      window.location.pathname.startsWith('/profile');
    const shouldProbeSession = force || getAuthSessionHint() || shouldProbeFromPath;

    if (!shouldProbeSession) {
      setUser(null);
      setIsAuthLoading(false);
      return;
    }

    setIsAuthLoading(true);
    setAuthError('');

    try {
      const response = await axiosInstance.get('/api/auth/me');
      const nextUser = response.data.user || null;
      setUser(nextUser);
      setAuthSessionHint(Boolean(nextUser));
    } catch {
      setUser(null);
      setAuthSessionHint(false);
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
      setAuthSessionHint(Boolean(nextUser));
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
      setAuthSessionHint(false);
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
