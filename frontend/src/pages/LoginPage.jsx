import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { BrowserProvider } from 'ethers';

const LoginPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGoToLanding = () => {
    navigate('/');
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const APP_NAME = 'CryptoAuth';
      const RPC_URL = 'https://mainnet.infura.io/v3/151ac0015300430ca8ec9b62f8002589'; // Your Infura URL
      const CHAIN_ID = 1;

      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: APP_NAME,
        darkMode: false,
        theme: 'light',
        appChainId: CHAIN_ID,
      });

      const ethereum = coinbaseWallet.makeWeb3Provider(RPC_URL, CHAIN_ID);
      const provider = new BrowserProvider(ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];

      // Set the logged-in user
      login(address);

      // Navigate to Dashboard automatically
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Wallet connection error:', error);
      alert('Failed to connect wallet. Check console for error.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleMetaMaskLogin = async () => {
    try {
      let ethereum;
  
      // Use MetaMask explicitly if multiple providers are injected
      if (window.ethereum?.providers) {
        ethereum = window.ethereum.providers.find((p) => p.isMetaMask);
      } else if (window.ethereum?.isMetaMask) {
        ethereum = window.ethereum;
      } else {
        alert('MetaMask is not available.');
        return;
      }
  
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
  
      login({ address, role: 'Member' });
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ MetaMask connection error:', error);
      alert('Failed to connect MetaMask. Check console for error.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');  // Redirect to Landing page
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Center: CryptoAuth Logo/Button */}
      <div style={{ textAlign: 'center', padding: '2rem 1rem 0.5rem' }}>
        <button
          onClick={handleGoToLanding}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#4f46e5',
          }}
        >
          CryptoAuth
        </button>
      </div>

      {/* Center Section: Login Buttons */}
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>{isAuthenticated ? `Welcome, ${user}` : 'Login'}</h2>

          {/* Group Coinbase and MetaMask buttons in a vertical stack */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* 🔵 Coinbase Wallet */}
            <button
              onClick={isAuthenticated ? handleLogout : handleConnect}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '1.5rem', // spacing between the two buttons
              }}
            >
              {isAuthenticated ? 'Log Out' : isConnecting ? 'Connecting...' : 'Connect Coinbase Wallet'}
            </button>

            {/* 🟠 MetaMask Wallet */}
            {!isAuthenticated && (
              <button
                onClick={handleMetaMaskLogin}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f6851b',
                  color: 'white',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Connect to MetaMask
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
