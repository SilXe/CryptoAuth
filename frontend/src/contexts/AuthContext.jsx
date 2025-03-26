import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [address, setAddress] = useState(null);      // Wallet address
  const [role, setRole] = useState(null);            // NFT role (member, intern, manager)

  const login = async (walletAddress, userRole) => {
    setAddress(walletAddress);
    setRole(userRole);
  };

  const logout = () => {
    setAddress(null);
    setRole(null);
  };

  const isAuthenticated = !!address;

  return (
    <AuthContext.Provider value={{ address, role, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
