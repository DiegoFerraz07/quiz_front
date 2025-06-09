import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Games from '../pages/Games';
import RegisterGame from '../pages/RegisterGame';
import Game from '../pages/Game';
import Ranking from '../pages/Ranking';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/games"
        element={
          <PrivateRoute>
            <Games />
          </PrivateRoute>
        }
      />
      <Route
        path="/registerGame"
        element={
          <PrivateRoute roles={['Professor']}>
            <RegisterGame />
          </PrivateRoute>
        }
      />
      <Route
        path="/editGame/:gameId"
        element={
          <PrivateRoute roles={['Professor']}>
            <RegisterGame />
          </PrivateRoute>
        }
      />
      <Route
        path="/game/:gameId"
        element={
          <PrivateRoute roles={['Estudante']}>
            <Game />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
