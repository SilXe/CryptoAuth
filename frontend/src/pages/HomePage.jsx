import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../HomePage.css';


const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname === '/dashboard') {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (!user) return <div>Loading...</div>;

  const userRole = user.role;

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <div className="home-page-container">
      <header className="home-page-header">
        <div className="logo">CryptoAuth</div>
        <div className="wallet-address">{user.walletAddress}</div>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="home-page-main">
        <aside className="home-page-sidebar">
          <ul>
            <li>Dashboard</li>
            {userRole === 'Admin' && <li>Manage Users</li>}
            {userRole === 'Manager' && <li>View Requests</li>}
            {userRole === 'Member' && <li>My Tasks</li>}
          </ul>
        </aside>

        <section className="home-page-content">
          {userRole === 'Admin' && (
            <div className="admin-section">
              <h3>User List</h3>
              {/* Replace with dynamic user list */}
              <button>Manage User Authorization</button>
            </div>
          )}

          {userRole === 'Manager' && (
            <div className="manager-section">
              <h3>Member Requests</h3>
              {/* Replace with dynamic requests */}
              <button>View New Member Requests</button>
            </div>
          )}

          {userRole === 'Member' && (
            <div className="member-section">
              <h3>Your Tasks</h3>
              {/* Replace with dynamic task list */}
              <button>Request Upgrade Status</button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default HomePage;
