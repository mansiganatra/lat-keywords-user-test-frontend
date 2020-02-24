import React, { useState, useEffect } from 'react';
import fileDownload from 'js-file-download';
import axiosWithAuth from './utils/axiosWithAuth';
import AppRoutes from './AppRoutes';
import DocsetList from './components/DocsetList';
import DownloadBtn from './components/DownloadBtn';

import './App.css';

function App() {
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [deletedWord, setDeletedWord] = useState({
    modelId: null,
    word: ''
  });
  const [docset, setDocset] = useState([
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
    },
    {
      name: 'Banks-Daxzaneous-Forger',
      models: [],
      search_history: []
    }
  ]);

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

  const getKeywords = async (query, docset) => {
    try {
      const res = await axiosWithAuth().get(`/?term=${query}&docset=${docset}`);

      // add id and deleted_kw to models by index
      const newData = res.data.kw.map((item, i) => {
        return {
          id: `${Date.now()}${i}`,
          ...item,
          deleted_kw: [],
          search_term: query
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
    } catch (error) {
      setError(error);
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
          <div>
            <DownloadBtn saveToFile={saveToFile} />
          </div>
        </div>
        <div className="right-content">
          <AppRoutes
            docset={docset}
            saveToFile={saveToFile}
            getKeywords={getKeywords}
            removeKey={removeKey}
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
