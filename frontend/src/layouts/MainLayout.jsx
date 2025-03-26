import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>Navbar (logged in)</header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
