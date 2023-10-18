import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './auth/login';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Employee Discount / Loyalty Platform Coming Soon
        </p>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginView />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}


export default App;
