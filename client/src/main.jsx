/**
 * ============================================================================
 * REACT ROOT ENTRY POINT (main.jsx)
 * ============================================================================
 * Purpose:
 *   Initializes the React 18 Concurrent Root and mounts the App component tree
 *   into the DOM document node with React Router BrowserRouter.
 * ============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Create React 18 Concurrent Root attached to #root in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
