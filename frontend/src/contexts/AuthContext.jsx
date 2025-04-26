import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contractInfo';
import { ethers } from 'ethers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { walletAddress, role, provider }
  const [hasNFT, setHasNFT] = useState(null); // null = not checked yet

  const isAuthenticated = !!user;

  // ✅ Login stores user info and provider
  const login = (userData, connectedProvider) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setHasNFT(null);
  };

  // ✅ Use saved provider to check NFT
  const checkNFT = async (walletAddress) => {
    try {
      if (!user.provider) {
        console.warn('⚠️ No provider available for NFT check');
        return;
      }

      const network = await user.provider.getNetwork();
      console.log('🔍 NFT Check - Current network:', network);

      if (network.chainId !== 44787n) {
        console.warn('⛔ Not on Celo Alfajores, skipping NFT check');
        setHasNFT(false);
        return;
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, user.provider);
      const balance = await contract.balanceOf(walletAddress);
      console.log('🎯 NFT balance:', balance.toString());

      setHasNFT(balance > 0n);
      console.log('✅ hasNFT set to:', balance > 0n);

    } catch (err) {
      console.error('❌ Error checking NFT:', err);
      setHasNFT(false);
    }
  };

  // ✅ Automatically check NFT after login
  useEffect(() => {
    if (user?.walletAddress && isAuthenticated) {
      checkNFT(user.walletAddress);
    }
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasNFT
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
