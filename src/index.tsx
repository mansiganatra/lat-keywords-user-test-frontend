import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles';
import themes from './styles/themes';
import App from './App';

ReactDOM.render(
  <Router>
    <StylesProvider injectFirst>
      <ThemeProvider theme={themes}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </StylesProvider>
  </Router>,
  document.getElementById('root')
);
