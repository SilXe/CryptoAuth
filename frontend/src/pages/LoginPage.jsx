import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { BrowserProvider, ethers } from 'ethers';

const LoginPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { user, login, logout, isAuthenticated, hasNFT } = useAuth();
  const navigate = useNavigate();

  const handleGoToLanding = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated && hasNFT === false) {
      navigate('/signup');
    } else if (isAuthenticated && hasNFT === true) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, hasNFT, navigate]);

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
      login({ walletAddress: address, role: 'Member' }, provider);

      // Navigate to Dashboard automatically
      // navigate('/dashboard'); ** Now needs to wait for the nft check **
    } catch (error) {
      console.error('❌ Wallet connection error:', error);
      alert('Failed to connect wallet. Check console for error.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleMetaMaskLogin = async () => {
    try {
      setIsConnecting(true);
  
      let ethereum = window.ethereum;
  
      if (window.ethereum?.providers?.length) {
        ethereum = window.ethereum.providers.find(p => p.isMetaMask);
      }
  
      if (!ethereum || !ethereum.isMetaMask) {
        alert('MetaMask not detected');
        return;
      }
  
      try {
        // Try to switch first
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaef3' }]
        });
      } catch (switchError) {
        // If not added, try to add it
        if (switchError.code === 4902) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaef3',
              chainName: 'Celo Alfajores Testnet',
              nativeCurrency: {
                name: 'Celo',
                symbol: 'CELO',
                decimals: 18
              },
              rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
              blockExplorerUrls: ['https://explorer.celo.org/alfajores']
            }]
          });
        } else {
          throw switchError;
        }
      }
  
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const network = await provider.getNetwork();
      console.log('🧠 Connected network:', network);
  
      login({ walletAddress: address, role: 'Member'}, provider);
  
    } catch (err) {
      console.error('❌ MetaMask connection error:', err);
      alert('MetaMask connect failed. See console for details.');
    } finally {
      setIsConnecting(false);
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
