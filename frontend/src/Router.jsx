import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';     // Dashboard
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';

const Router = () => {
  const { isAuthenticated, hasNFT } = useAuth();

  if (isAuthenticated && hasNFT === null) {
    return <div>Loading...</div>; // or a spinner
  }

  console.log('🧭 Router check:', {
    isAuthenticated,
    hasNFT
  });

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={
          isAuthenticated && hasNFT === false ? <SignUpPage /> : <Navigate to="/" />
        } />
      
      <Route
        path="/dashboard"
        element={isAuthenticated && hasNFT ? <HomePage /> : <Navigate to="/" />}
      />
      
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
