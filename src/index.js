import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles';
import theme from './styles/theme';
import App from './App.jsx';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('root')
);
