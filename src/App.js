import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import Dashboard from './Dashboard';

function App() {
  // Use state to track which "page" to show
  const [currentPage, setCurrentPage] = useState('home');

  // Function to navigate to Dashboard
  const goToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="app">
      {currentPage === 'home' && <Home onContinue={goToDashboard} />}
      {currentPage === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;
