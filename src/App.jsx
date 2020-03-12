import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import fileDownload from 'js-file-download';

import axiosWithAuth from './utils/axiosWithAuth';

import Metadata from './views/Metadata/Metadata';
import Show from './views/Show/Show';

import './App.css';

function App() {
  const [msg, setMessage] = useState('');
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
  const [searched, setSearched] = useState(false);

  const deleteModel = (docset, modelId) => {
    // TODO
  };

  const getKeywords = async (query, size = 15, docset = 'mueller') => {
    try {
      let newData;
      const res = await axiosWithAuth().get(
        `/?term=${query}&docset=${docset}&size=${size}`
      );
      console.log('res!!!', res);
      // msg will only appear with words not in dict
      if (res.data.kw[0].msg) {
        setDocset(prevState => ({
          ...prevState,
          msg: res.data.kw[0].msg,
          alt_arr: [...res.data.kw[0].kw.map(word => word[0])]
        }));
      } else {
        // checks if score is -1 to indicate word
        // that does not exist in dict and
        // no similar words
        if (res.data.kw[0].score < 0) {
          setDocset(prevState => ({
            ...prevState,
            msg: res.data.kw[0].kw[1],
            alt_arr: []
          }));
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
          setDocset(prevState => ({
            ...prevState,
            models: [...prevState.models, ...newData],
            search_history: [...prevState.search_history, query],
            msg: '',
            alt_arr: []
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
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
            saveToFile={saveToFile}
          />
        )}
      />
      <Route path="/metadata" component={Metadata} />
    </div>
  );
}

export default App;
