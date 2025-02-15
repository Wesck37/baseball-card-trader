// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trades from './pages/Trades';
import Profile from './pages/Profile';
import './styles.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

