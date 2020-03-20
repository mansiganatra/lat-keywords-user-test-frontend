import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles';
import themes from './styles/themes';
import SearchProvider from './store/SearchProvider';
import App from './App.jsx';

ReactDOM.render(
  <SearchProvider>
    <Router>
      <ThemeProvider theme={themes}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </Router>
  </SearchProvider>,
  document.getElementById('root')
);
