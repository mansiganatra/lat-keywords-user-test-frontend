import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles';
import themes from './styles/themes';
import App from './App';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={themes}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
