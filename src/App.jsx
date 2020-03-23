import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Metadata from './pages/Metadata/Metadata';
import Show from './pages/Show/Show';

// import LoadingPage from './components/LoadingPage/LoadingPage';

const App = () => {
  return (
    <StyledApp>
      {/* <Route path="/show">
        <LoadingPage />
      </Route> */}
      <Route path="/show">
        <Show />
      </Route>
      <Route path="/metadata">
        <Metadata />
      </Route>
    </StyledApp>
  );
};

const StyledApp = styled.main`
  height: 100vh;
`;

export default App;
