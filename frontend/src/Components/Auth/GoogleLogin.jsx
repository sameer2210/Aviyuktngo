import React, { useState } from 'react';
import { GoogleLogin as GoogleOAuthButton } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, isSigningIn, authError, setAuthError } = useAuth();
  const [localError, setLocalError] = useState('');

  const fallbackPath = '/';
  const redirectPath = location.state?.from?.pathname || fallbackPath;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || window.__GOOGLE_CLIENT_ID__;

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError('');

    const idToken = credentialResponse?.credential;
    if (!idToken) {
      setLocalError('Google did not return a valid credential.');
      return;
    }

    const result = await signInWithGoogle(idToken);
    if (result.success) {
      navigate(redirectPath, { replace: true });
    }
  };

  const handleGoogleError = () => {
    setAuthError('');
    setLocalError('Google sign-in was cancelled or failed.');
  };

  return (
    <div className="w-full max-w-md ml-8 bg-white rounded-2xl shadow-lg border border-[#d7deee] p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-serif text-[#335288] text-center mb-3">Welcome to Aviyukt NGO</h1>
      <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
        Continue with your Google account to access your profile and services.
      </p>

      {!googleClientId ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
          Missing Google Client ID. Please set `GOOGLE_CLIENT_ID` in backend and restart backend + frontend.
        </p>
      ) : (
        <div className="flex justify-center">
          <GoogleOAuthButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="continue_with"
            shape="pill"
            theme="outline"
            size="large"
            width="300"
          />
        </div>
      )}

      {isSigningIn && (
        <p className="mt-4 text-sm text-[#335288] text-center">Signing you in, please wait...</p>
      )}
      {(localError || authError) && (
        <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3 text-center">
          {localError || authError}
        </p>
      )}
    </div>
  );
};

export default GoogleLogin;
