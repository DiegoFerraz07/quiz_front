import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/modules/hooks';

export default function PrivateRoute({ children, roles = [] }) {
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  const userRole = useAppSelector(state => state.user.user.role);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
