import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchResultView from './components/SearchResultView';

const AppRoutes = ({ docset, saveToFile, getKeywords }) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={_ => (
          <div>
            <p>Please choose a docset on the left</p>
          </div>
        )}
      />
      <Route
        path="/:docset"
        exact
        render={props => (
          <SearchResultView
            {...props}
            docset={docset}
            removeKey={docset}
            saveToFile={saveToFile}
            getKeywords={getKeywords}
          />
        )}
      />
    </Switch>
  );
};

export default AppRoutes;
