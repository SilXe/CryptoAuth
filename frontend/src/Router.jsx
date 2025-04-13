import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';     // Dashboard
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';

const Router = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
      />
      
      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
