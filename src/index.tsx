import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles';
import themes from './styles/themes';
import SearchProvider from './store/SearchProvider';
import App from './App';

ReactDOM.render(
  <Router>
    <SearchProvider>
      <ThemeProvider theme={themes}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </SearchProvider>
  </Router>,
  document.getElementById('root')
);
