import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/CryptoAuth_Logo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '1.5rem',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>

      {/* Header Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        {/* Left - CryptoAuth button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#4f46e5',
            cursor: 'pointer'
          }}
        >
          CryptoAuth
        </button>

        {/* Center - Logo */}
        <img
          src={logo}
          alt="CryptoAuth Logo"
          onClick={() => navigate('/')}
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            cursor: 'pointer',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Right - Login */}
        <Link to="/login">
          <button style={{
            backgroundColor: '#e0f0ff',
            color: '#333',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Login
          </button>
        </Link>
      </div>

      {/* Title */}
      <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Welcome to</h2>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#111'
        }}>
          CryptoAuth
        </h1>
      </div>

      <div style={{
        marginTop: '0.5rem',
        fontSize: '1rem',
        lineHeight: '1.8',
        color: '#444',
        textAlign: 'center'
      }}>
        <p>Verifying identity and user roles through</p>
        <p><strong>cryptographic hashing</strong></p>
        <p>and</p>
        <p><strong>NFT-based authorization</strong></p>
        <p>fully decentralized, database-free,</p>
        <p>and secure by design.</p>
      </div>

      {/* NFT Role Placeholders */}
      <div style={{ marginTop: '3rem', textAlign: 'left' }}>
        {['Admin', 'Manager', 'Member'].map((role, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.75rem'
          }}>
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
