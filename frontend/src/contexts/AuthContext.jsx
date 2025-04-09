import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store user data (address)

  // Login function
  const login = (userData) => {
    setUser(userData);  // Set user data when logging in
  };

  // Logout function
  const logout = () => {
    setUser(null);  // Reset user data when logging out
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
