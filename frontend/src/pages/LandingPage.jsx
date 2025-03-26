import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '1.5rem',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button style={{ background: '#ddd', padding: '0.5rem 1rem', border: 'none' }}>CryptoAuth</button>
        <Link to="/login">
          <button style={{ background: '#ddd', padding: '0.5rem 1rem', border: 'none' }}>Login</button>
        </Link>
      </div>

      {/* Main Text */}
      <h2>Welcome to <strong>CryptoAuth</strong></h2>
      <p style={{ marginTop: '1rem' }}>Empowering secure user authorization through NFT ownership.</p>
      <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#555' }}>We accept custom designs as well</p>

      {/* NFT Role Placeholders */}
      <div style={{ marginTop: '2rem', textAlign: 'left' }}>
        {['Admin', 'Manager', 'Member'].map((role, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#ccc',
              marginRight: '1rem',
              borderRadius: '8px'
            }}></div>
            <span>NFT for {role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
