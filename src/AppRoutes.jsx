import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchResultView from './views/SearchResultView';

const AppRoutes = ({
  docset,
  saveToFile,
  getKeywords,
  removeKey,
  deleteModel,
  msg,
  alternateArr
}) => {
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
            removeKey={removeKey}
            saveToFile={saveToFile}
            getKeywords={getKeywords}
            deleteModel={deleteModel}
            msg={msg}
            alternateArr={alternateArr}
          />
        )}
      />
    </Switch>
  );
};

export default AppRoutes;
