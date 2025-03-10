import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
        .then(response => response.text())
        .then(data => setMessage(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Frontend Running!</h1>
        <h2>Backend says: {message}</h2>
        
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default App;
