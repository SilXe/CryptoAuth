import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login Page</h2>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
