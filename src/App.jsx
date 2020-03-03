import React, { useState, useEffect } from 'react';
import fileDownload from 'js-file-download';
import axiosWithAuth from './utils/axiosWithAuth';
import AppRoutes from './AppRoutes';
import DocsetList from './components/DocsetList';
import DownloadBtn from './components/DownloadBtn';

import './App.css';

function App() {
  const [msg, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [alternateArr, setAlternateArr] = useState([]);
  const [deletedWord, setDeletedWord] = useState({
    modelId: null,
    word: ''
  });
  const [docset, setDocset] = useState([]);

  useEffect(() => {
    if (!docset.length) {
      const getDocsetInit = async () => {
        try {
          const res = await axiosWithAuth().get(`/getDocsetNames`);
          console.log(res);
          const newDocset = res.data.map(doc => {
            return {
              name: doc,
              models: [],
              search_history: []
            };
          });
          setDocset(newDocset);
        } catch (error) {}
      };

      getDocsetInit();
    }
  }, []);

  useEffect(() => {
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
                console.log(model);
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

  const getKeywords = async (query, docset, size) => {
    try {
      let newData;
      const res = await axiosWithAuth().get(
        `/?term=${query}&docset=${docset}&size=${size}`
      );
      console.log(res.data);
      if (res.data.kw[0].msg) {
        setMessage(res.data.kw[0].msg);
        setAlternateArr([
          ...res.data.kw[0].kw.map(item => {
            return item[0];
          })
        ]);
      } else {
        if (res.data.kw[0].score < 0) {
          setMessage(res.data.kw[0].kw[1]);
          setAlternateArr([]);
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

          console.log(newData);

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
    console.log(modelId, kw, docset);
    setDocset(prevState =>
      prevState.map(item => {
        if (item.name === docset) {
          return {
            ...item,
            models: item.models.map(model => {
              if (modelId === model.id) {
                console.log(model);
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

  console.log(docset);

  return (
    <div className="App">
      <div className="search-content">
        <div className="left-content">
          <div className="docset-list">
            <DocsetList docset={docset} />
          </div>
          <div className="download-btn">
            <DownloadBtn saveToFile={saveToFile} />
          </div>
        </div>
        <div className="right-content">
          <AppRoutes
            docset={docset}
            saveToFile={saveToFile}
            getKeywords={getKeywords}
            removeKey={removeKey}
            deleteModel={deleteModel}
            msg={msg}
            alternateArr={alternateArr}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

// TODO
// Fix styles
// add deleted list component
