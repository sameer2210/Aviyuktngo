import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ebebeb]">
        <p className="text-[#335288] text-lg">Checking your session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


