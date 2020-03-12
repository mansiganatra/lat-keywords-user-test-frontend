import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchResultView from './views/SearchResultView';

const AppRoutes = ({
  docset,
  saveToFile,
  getKeywords,
  removeKey,
  deleteModel
}) => {
  return (
    <>
      <Switch>
        <Route
          path="/show"
          exact
          render={_ => (
            <div>
              <p>Please choose a docset on the left</p>
            </div>
          )}
        />
        <Route
          exact
          path="/show/:docset"
          render={props => (
            <SearchResultView
              {...props}
              docset={docset}
              removeKey={removeKey}
              saveToFile={saveToFile}
              getKeywords={getKeywords}
              deleteModel={deleteModel}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default AppRoutes;
