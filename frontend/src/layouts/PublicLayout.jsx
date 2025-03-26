import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <header>Landing Page Header</header>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
