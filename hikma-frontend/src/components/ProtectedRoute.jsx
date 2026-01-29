import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { token, isAdmin } = useAuth();

  // if not logged in, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if logged in but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // admin user can access protected route - render nested routes
  return <Outlet />;
};
