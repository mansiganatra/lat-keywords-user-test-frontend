import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import fileDownload from 'js-file-download';

import axiosWithAuth from './utils/axiosWithAuth';

import Metadata from './views/Metadata/Metadata';
import Show from './views/Show/Show';

import './App.css';

function App() {
  const [deletedWord, setDeletedWord] = useState({
    modelId: null,
    word: ''
  });
  const [docset, setDocset] = useState(
    JSON.parse(localStorage.getItem('docset')) || {
      name: 'mueller',
      models: [],
      search_history: [],
      msg: '',
      alt_arr: []
    }
  );

  const deleteModel = (docset, modelId) => {
    // TODO
  };

  const saveToFile = () => {
    fileDownload(JSON.stringify(docset), 'keyword_list.json');
  };

  useEffect(() => {
    localStorage.setItem('docset', JSON.stringify(docset));
  }, [docset, setDocset]);

  const getKeywords = async (query, size = 15, docset = 'mueller') => {
    try {
      let newData;
      const res = await axiosWithAuth().get(
        `/?term=${query}&docset=${docset}&size=${size}`
      );

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

  useEffect(() => {
    // global search input watcher
    window.addEventListener('message', e => {
      if (e.data.event === 'notify:documentListParams') {
        const term = e.data.args[0].q;
        getKeywords(term);

        // console.log(term);
      }
    });

    return () =>
      window.removeEventListener('message', () => {
        console.log('done');
      });
  }, []);

  return (
    <div className="App">
      <Route path="/show">
        <Show
          getKeywords={getKeywords}
          docset={docset}
          saveToFile={saveToFile}
        />
      </Route>
      <Route path="/metadata" component={Metadata} />
    </div>
  );
}

export default App;
