import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { uploadToPinata } from '../lib/pinataUploader';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contractInfo';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isMinting, setIsMinting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      setIsMinting(true);

      // Request backend to hash name and email with private salt
      const response = await fetch("http://localhost:5000/api/hash-metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const { hashedName, hashedEmail } = await response.json();

      console.log("hashedName: ", hashedName);
      console.log("hashedEmail: ", hashedEmail);

      // Upload metadata with hashed values
      const metadataUrl = await uploadToPinata({
        name: hashedName,
        email: hashedEmail,
        role: user.role
      });

      const provider = user.provider;
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.mint(metadataUrl);
      await tx.wait();

      alert('✅ NFT minted and sign-up complete!');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Sign-up failed:', err);
      alert('Something went wrong. Check the console.');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <button
        onClick={() => window.location.href = '/'}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#4f46e5',
          marginBottom: '2rem'
        }}
      >
        CryptoAuth
      </button>

      <h2 style={{ marginBottom: '1rem' }}>Sign Up</h2>

      <p style={{ marginBottom: '1.5rem' }}>
        Connected Wallet: <strong>{user?.walletAddress}</strong>
      </p>

      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        style={{
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '80%',
          maxWidth: '300px',
          marginBottom: '1rem'
        }}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        style={{
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '80%',
          maxWidth: '300px',
          marginBottom: '1.5rem'
        }}
      />
      <br />

      <button
        onClick={handleSignUp}
        disabled={isMinting || !formData.name || !formData.email}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {isMinting ? 'Minting...' : 'Mint Your NFT'}
      </button>
    </div>
  );
};

export default SignUpPage;
