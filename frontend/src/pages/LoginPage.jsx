import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    alert('Wallet connection logic coming soon!');
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      {/* Logo */}
      <button style={{ background: '#ddd', padding: '0.5rem 1.25rem', border: 'none', marginBottom: '2rem' }}>
        CryptoAuth
      </button>

      {/* Title */}
      <h2 style={{ marginBottom: '1rem' }}>Sign in to CryptoAuth</h2>

      {/* Only the login button works for now */}
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '0.75rem',
          margin: '1rem 0',
          backgroundColor: '#4f46e5',
          color: 'white',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default LoginPage;
