import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import fileDownload from 'js-file-download';
import axiosWithAuth from './utils/axiosWithAuth';
import SearchContent from './components/SearchContent';
import Show from './components/Show';

import SearchResultView from './views/SearchResultView';

import './App.css';
import Metadata from './components/Metadata';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [msg, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [alternateArr, setAlternateArr] = useState([]);
  const [deletedWord, setDeletedWord] = useState({
    modelId: null,
    word: ''
  });
  const [docset, setDocset] = useState([
    { name: 'mueller', models: [], search_history: [], msg: '', alt_arr: [] }
  ]);

  // useEffect(() => {
  //   // fetch docset at initialization
  //   if (!docset.length) {
  //     const getDocsetInit = async () => {
  //       try {
  //         const res = await axiosWithAuth().get(`/getDocsetNames`);
  //         const newDocset = res.data.map(doc => {
  //           return {
  //             name: doc,
  //             models: [],
  //             search_history: [],
  //             msg: '',
  //             alt_arr: []
  //           };
  //         });
  //         console.log(newDocset);
  //         setDocset(newDocset);
  //       } catch (error) {}
  //     };

  //     getDocsetInit();
  //   }
  // }, []);

  useEffect(() => {
    // populated deleted_kw array
    if (deleted) {
      addToDeletedKwList(
        deletedWord.modelId,
        deletedWord.kw,
        deletedWord.docset
      );
      setDeleted(false);
    }
  }, [deleted]);

  const deleteModel = (docset, modelId) => {
    setDocset(prevState =>
      prevState.map(item => {
        if (item.name === docset) {
          return {
            ...item,
            models: item.models.map(model => {
              if (modelId === model.id) {
                return {
                  ...model,
                  deleted: true
                };
              }
              return model;
            })
          };
        }
        return item;
      })
    );
  };
  const getKeywords = async (query, docset) => {
    console.log('searching', query);
    try {
      let newData;
      const res = await axiosWithAuth().get(
        `/?term=${query}&docset=${docset}&size=10`
      );
      console.log(res);

      // msg will only appear with words not in dict
      if (res.data.kw[0].msg) {
        setDocset(prevState =>
          prevState.map(item => {
            if (item.name === docset) {
              return {
                ...item,
                msg: res.data.kw[0].msg,
                alt_arr: [
                  ...res.data.kw[0].kw.map(word => {
                    return word[0];
                  })
                ]
              };
            }
            return item;
          })
        );
      } else {
        // checks if score is -1 to indicate word
        // that does not exist in dict and
        // no similar words
        if (res.data.kw[0].score < 0) {
          setDocset(prevState =>
            prevState.map(item => {
              if (item.name === docset) {
                return {
                  ...item,
                  msg: res.data.kw[0].kw[1],
                  alt_arr: []
                };
              }
              return item;
            })
          );
        } else {
          // add id and deleted_kw to models by index
          setAlternateArr([]);
          setMessage('');
          newData = res.data.kw.map((item, i) => {
            return {
              id: `${Date.now()}${i}`,
              ...item,
              deleted_kw: [],
              search_term: query,
              deleted: false
            };
          });
          setDocset(prevState =>
            prevState.map(item => {
              if (item.name === docset) {
                return {
                  ...item,
                  models: [...item.models, ...newData],
                  search_history: [...item.search_history, query]
                };
              }
              return item;
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeKey = (modelId, index, docset) => {
    // remove key from keyword list
    setDocset(prevState =>
      prevState.map(item => {
        if (item.name === docset) {
          return {
            ...item,
            models: item.models.map(model => {
              if (modelId === model.id) {
                return {
                  ...model,
                  kw: model.kw.filter((kw, i) => {
                    if (i === index) {
                      // add removed key to deleted list
                      setDeletedWord({
                        modelId,
                        kw,
                        docset
                      });
                      setDeleted(true);
                    }
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
    );
  };
  const addToDeletedKwList = (modelId, kw, docset) => {
    setDocset(prevState =>
      prevState.map(item => {
        if (item.name === docset) {
          return {
            ...item,
            models: item.models.map(model => {
              if (modelId === model.id) {
                return {
                  ...model,
                  deleted_kw: [...model.deleted_kw, kw]
                };
              }
              return model;
            })
          };
        }
        return item;
      })
    );
  };

  const saveToFile = () => {
    fileDownload(JSON.stringify(docset), 'keyword_list.json');
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/metadata" component={Metadata} />
        <Route
          exact
          path="/show"
          render={_ => (
            <SearchResultView
              getKeywords={getKeywords}
              removeKey={removeKey}
              deleteModel={deleteModel}
              docset={docset}
              saveToFile={saveToFile}
            />
          )}
        />
        {/* <Route
          path="/show"
          render={_ => (
            <SearchContent
              getKeywords={getKeywords}
              removeKey={removeKey}
              deleteModel={deleteModel}
              docset={docset}
              saveToFile={saveToFile}
            />
          )}
        /> */}
      </Switch>
    </div>
  );
}

export default App;

// TODO
// Fix styles
// add deleted list component
