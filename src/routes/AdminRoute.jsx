/* eslint-disable react/prop-types */
import React from 'react';
import useAuth from '../hooks/useAuth';
import useIsAdmin from '../hooks/useIsAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useIsAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (user && isAdmin) return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
