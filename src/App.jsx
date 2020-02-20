import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Grommet } from 'grommet';
import fileDownload from 'js-file-download';
import axiosWithAuth from './utils/axiosWithAuth';
import styled from 'styled-components';
import Uploader from './components/Uploader';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import SearchResultView from './components/SearchResultView';

const sample = {
  docset: [
    {
      name: 'juul',
      models: [],
      search_history: []
    },
    {
      name: 'woolsey',
      models: [],
      search_history: []
    },
    {
      name: 'mueller',
      models: [],
      search_history: []
    }
  ]
};

function App() {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('state')) || sample
  );

  // useEffect(() => {
  //   localStorage.setItem('state', JSON.stringify(state));
  // }, [state]);

  const setUploadPath = async path => {
    try {
      const data = await axiosWithAuth().post('/upload', path);
      setState({ ...state, uploaded: data });
    } catch (error) {
      console.log(error);
    }
  };
  //search?term=nicotine&docset=juul
  const getKeywords = async (query, docset) => {
    try {
      const res = await axiosWithAuth().get(`/?term=${query}&docset=${docset}`);

      // add id to models by index
      const newData = res.data.kw.map((item, i) => {
        return {
          id: `${Date.now()}${i}`,
          ...item
        };
      });

      setState(prevState => ({
        ...prevState,
        docset: prevState.docset.map(item => {
          if (item.name === docset) {
            return {
              ...item,
              models: [...item.models, ...newData],
              search_history: [...item.search_history, query]
            };
          }
          return item;
        })
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeKey = (modelId, index, docset) => {
    setState(prevState => ({
      ...prevState,
      docset: prevState.docset.map(item => {
        console.log('iterm: ', item.name, docset);
        if (item.name === docset) {
          console.log(item.name);
          return {
            ...item,
            models: item.models.map(model => {
              if (modelId === model.id) {
                return {
                  ...model,
                  kw: model.kw.filter((_, i) => {
                    return i !== index;
                  }),
                  score: model.score - 1
                };
              }
              return model;
            })
          };
        }
        return item;
      })
    }));
  };

  const saveToFile = () => {
    fileDownload(JSON.stringify(state), 'keyword_list.json');
  };
  console.log(state);
  return (
    <div>
      <Grommet plain>
        {/* <Navigation /> */}
        <SearchContent>
          <TopContent>
            {state.docset.map((item, i) => (
              <div key={i}>
                <NavLink
                  to={`/docset=${item.name}`}
                  activeClassName="selectedLink"
                  exact
                >
                  <h3>{item.name}</h3>
                </NavLink>
              </div>
            ))}
          </TopContent>
          <BottomContent>
            <Switch>
              <Route
                path="/"
                exact
                render={_ => (
                  <div>
                    <p>Please choose a docset on the left</p>
                  </div>
                )}
                setUploadPath={setUploadPath}
              />
              <Route
                path="/:docset"
                exact
                render={props => (
                  <SearchResultView
                    {...props}
                    docset={state.docset}
                    removeKey={removeKey}
                    saveToFile={saveToFile}
                    getKeywords={getKeywords}
                  />
                )}
              />
            </Switch>
          </BottomContent>
        </SearchContent>
      </Grommet>
    </div>
  );
}

const SearchContent = styled.div`
  display: flex;

  .selectedLink {
    h3 {
      color: white;
      background-color: black;
    }
  }
`;
const TopContent = styled.div`
  margin-right: 50px;
`;
const BottomContent = styled.div``;

export default App;
