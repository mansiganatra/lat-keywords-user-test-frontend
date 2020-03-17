import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchProvider from './store/SearchProvider';
import App from './App.jsx';

import './index.css';

ReactDOM.render(
  <SearchProvider>
    <Router>
      <App />
    </Router>
  </SearchProvider>,
  document.getElementById('root')
);
