import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import fileDownload from 'js-file-download';

import axiosWithAuth from './utils/axiosWithAuth';

import Metadata from './views/Metadata/Metadata';
import Show from './views/Show/Show';

import './App.css';

function App() {
  const [msg, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [alternateArr, setAlternateArr] = useState([]);
  const [deletedWord, setDeletedWord] = useState({
    modelId: null,
    word: ''
  });
  const [docset, setDocset] = useState({
    name: 'mueller',
    models: [],
    search_history: [],
    msg: '',
    alt_arr: []
  });
  const [searched, setSearched] = useState(true);

  // useEffect(() => {
  //   // populated deleted_kw array
  //   if (deleted) {
  //     addToDeletedKwList(
  //       deletedWord.modelId,
  //       deletedWord.kw,
  //       deletedWord.docset
  //     );
  //     setDeleted(false);
  //   }
  // }, [deleted]);

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

  const getKeywords = async (query, size = 15, docset = 'mueller') => {
    try {
      let newData;
      const res = await axiosWithAuth().get(
        `/?term=${query}&docset=${docset}&size=${size}`
      );

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

  const startSearch = () => {
    if (!searched) {
      setSearched(true);
    }
  };

  return (
    <div className="App">
      <Route
        path="/show"
        render={props => (
          <Show
            {...props}
            searched={searched}
            getKeywords={getKeywords}
            startSearch={startSearch}
            docset={docset}
          />
        )}
      />
      <Route path="/metadata" component={Metadata} />
    </div>
  );
}

export default App;

// TODO
// Fix styles
// add deleted list component

// return (
//   <div className="App">
//     <div className="search-content">
//       <div className="left-content">
//         <div className="docset-list">
//           <DocsetList docset={docset} />
//         </div>
//         <div className="download-btn">
//           <DownloadBtn saveToFile={saveToFile} />
//         </div>
//       </div>
//       <div className="right-content">
//         <AppRoutes
//           docset={docset}
//           saveToFile={saveToFile}
//           getKeywords={getKeywords}
//           removeKey={removeKey}
//           deleteModel={deleteModel}
//         />
//       </div>
//     </div>
//   </div>
// );
