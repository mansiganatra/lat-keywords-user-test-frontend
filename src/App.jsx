import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import fileDownload from 'js-file-download';
import axiosWithAuth from './utils/axiosWithAuth';
import styled from 'styled-components';
import AppRoutes from './AppRoutes';

import './App.css';
import DocsetList from './components/DocsetList';

function App() {
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

  const setUploadPath = async path => {
    try {
      const data = await axiosWithAuth().post('/upload', path);
      setDocset({ ...docset, uploaded: data });
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

      setDocset(prevState => ({
        ...prevState,
        docset: prevState.map(item => {
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
    setDocset(prevState => ({
      ...prevState,
      docset: prevState.map(item => {
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;
