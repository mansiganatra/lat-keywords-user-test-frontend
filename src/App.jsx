import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Metadata from './views/Metadata/Metadata';
import Show from './views/Show/Show';

import './App.css';
import LoadingPage from './components/LoadingPage/LoadingPage';

const App = () => {
  return (
    <div className="App">
      <Route path="/show">
        <LoadingPage />
      </Route>
      {/* <Route path="/show">
        <Show />
      </Route> */}
      <Route path="/metadata">
        <Metadata />
      </Route>
    </div>
  );
};

export default App;
