// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/trades">Trades</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
};

export default Navbar;
