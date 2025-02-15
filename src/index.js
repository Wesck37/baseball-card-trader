import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';
import './styles.css';
import './components/Navbar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap the App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: Log performance metrics
reportWebVitals();
