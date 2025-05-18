import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute isClosed={false}>
            <Login />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
