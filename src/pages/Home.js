import React, { useState, useEffect } from 'react';
import { searchBaseballCards } from '../api/ebayApi'; // Your eBay API integration
import Card from '../components/Card';
import './Home.css';
import axios from 'axios';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });
  const [searchResults, setSearchResults] = useState([]); // Holds search results
  const [query, setQuery] = useState('baseball card');
  const [formData, setFormData] = useState({ key: '' }); // State for the backend data submission form
  const [searchParams, setSearchParams] = useState({ name: '', team: '', year: '' }); // Search filters for baseball cards
  const [displayedCards, setDisplayedCards] = useState([]); // Display 3 cards

  const API_URL = 'http://localhost:5000'; 

  // Handle register
  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
  
      if (response.ok) {
        alert('Account created successfully. Please log in.');
        setRegisterForm({ username: '', password: '' }); // Reset registration form
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsLoggedIn(true);
        setUsername(data.username); // Set the username for personalization
        localStorage.setItem('token', data.token); // Save JWT in localStorage
        setLoginForm({ username: '', password: '' }); // Reset login form
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token'); // Clear the stored token
    alert('You have been logged out.');
  };
  

  // Handle login form changes
  const handleLoginInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration form changes
  const handleRegisterInputChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle baseball card search input changes
  const handleSearchInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  // Handle card search
  // 
  

  const handleSearchCards = async () => {
    const query = `${searchParams.name} ${searchParams.team} ${searchParams.year}`.trim();
  
    // 🚨 Ensure query is not empty
    if (!query) {
      alert("Please enter at least one search parameter.");
      return;
    }
  
    // 🔍 Debugging: Check the formatted API request URL
    const requestUrl = `${API_URL}/api/ebay/search?q=${encodeURIComponent(query)}`;
    console.log("Requesting eBay search:", requestUrl);
  
    try {
      const response = await fetch(requestUrl);
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Search Results:", data); // Debugging: Check response data
      setDisplayedCards(data.slice(0, 3)); // Display first 3 cards
    } catch (error) {
      console.error("Error searching baseball cards:", error);
      alert("Failed to fetch baseball cards. Please try again later.");
    }
  };
  

  
  // Fetch cards only when logged in
  useEffect(() => {
    async function initEbayToken() {
      try {
        const response = axios.post (`${API_URL}/api/ebay/token`);
        console.log (response);
      } catch (error) {
        console.log (error.respone);
      }
    }

    if (isLoggedIn) {
      initEbayToken();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="home">
        <h1>Welcome to Baseball Card Trader!</h1>

        {/* Login Form */}
        <div className="login-section">
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleLoginInputChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleLoginInputChange}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>

        {/* Registration Form */}
        <div className="register-section">
          <h2>Sign Up</h2>
          <input
            type="text"
            name="username"
            value={registerForm.username}
            onChange={handleRegisterInputChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleRegisterInputChange}
            placeholder="Password"
          />
          <button onClick={handleRegister}>Sign Up</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Welcome back, {username}!</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Baseball Card Search */}
      <div className="search-section">
        <h2>Search Baseball Cards</h2>
        <input
          type="text"
          name="name"
          placeholder="Player Name"
          value={searchParams.name}
          onChange={handleSearchInputChange}
        />
        <input
          type="text"
          name="team"
          placeholder="Team Name"
          value={searchParams.team}
          onChange={handleSearchInputChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={searchParams.year}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearchCards}>Search</button>
      </div>

      {/* Display Baseball Cards */}
      <div className="cards-display">
        <h2>Search Results</h2>
        <div className="cards-container">
          {displayedCards.length > 0 ? (
            displayedCards.map((card, index) => (
              <Card
                key={index}
                frontImage={card.image.imageUrl}
                backImage={card.image.imageUrl}
                title={card.title}
                link={card.itemWebUrl}
              />
            ))
          ) : (
            <p>No cards found. Try searching again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;








// const fetchCards = async () => {
//   if (!isLoggedIn) return;
//   try {
//     const token = localStorage.getItem('token');
//     const response = await searchBaseballCards(query, token);
//     setSearchResults(response);
//   } catch (error) {
//     console.error('Failed to fetch cards:', error);
//   }
// };
// fetchCards();