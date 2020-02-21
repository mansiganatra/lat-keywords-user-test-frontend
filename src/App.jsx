import React, { useState } from 'react';
import fileDownload from 'js-file-download';
import axiosWithAuth from './utils/axiosWithAuth';
import AppRoutes from './AppRoutes';
import DocsetList from './components/DocsetList';

import './App.css';

function App() {
  const [error, setError] = useState('');
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
    }
  ]);

  const getKeywords = async (query, docset) => {
    try {
      const res = await axiosWithAuth().get(`/?term=${query}&docset=${docset}`);

      // add id and deleted_kw to models by index
      const newData = res.data.kw.map((item, i) => {
        return {
          id: `${Date.now()}${i}`,
          ...item,
          deleted_kw: []
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
    // remove key from list
    setDocset(prevState =>
      prevState.map(item => {
        if (item.name === docset) {
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
    );
  };

  const addToDeletedKwList = () => {
    // add removed key to deleted list
    setDocset();
  };

  const saveToFile = () => {
    fileDownload(JSON.stringify(docset), 'keyword_list.json');
  };

  return (
    <div>
      <div className="search-content">
        <div className="left-content">
          <div className="docset-list">
            <DocsetList docset={docset} />
          </div>
          <div>
            <button className="download-btn" onClick={saveToFile}>
              Download JSON
            </button>
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
