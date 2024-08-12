// src/index.js
import axios from 'axios';

// Set the base URL for Axios requests
axios.defaults.baseURL = 'https://blogsforfuture.vercel.app/'; // Adjust the port if necessary
import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
