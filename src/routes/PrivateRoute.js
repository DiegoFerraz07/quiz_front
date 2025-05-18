import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  isClosed,
  roles = [],
}) {
  const isLoggedIn = false;
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}
