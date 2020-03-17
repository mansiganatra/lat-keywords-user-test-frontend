import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import fileDownload from 'js-file-download';

import axiosWithAuth from './utils/axiosWithAuth';

import Metadata from './views/Metadata/Metadata';
import Show from './views/Show/Show';

import './App.css';

function App() {
  // const [deletedWord, setDeletedWord] = useState({
  //   modelId: null,
  //   word: ''
  // });
  const [docset, setDocset] = useState(
    JSON.parse(localStorage.getItem('docset')) || {
      name: 'mueller',
      models: [],
      search_history: [],
      msg: '',
      alt_arr: []
    }
  );

  // const deleteModel = (docset, modelId) => {
  //   // TODO
  // };
  const saveToFile = () => {
    fileDownload(JSON.stringify(docset), 'keyword_list.json');
  };
  const getKeywords = async (query, size = 15, docset = 'mueller') => {
    try {
      let newData;
      const res = await axiosWithAuth().get(
        `/?term=${query}&docset=${docset}&size=${size}`
      );

      // search term does not exist but has similar words
      if (res.data.kw[0].msg) {
        setDocset(prevState => ({
          ...prevState,
          msg: res.data.kw[0].msg,
          alt_arr: [...res.data.kw[0].kw.map(word => word[0])]
        }));
      } else {
        // search term does not exist and has no similar words
        if (res.data.kw[0].score < 0) {
          setDocset(prevState => ({
            ...prevState,
            msg: res.data.kw[0].kw[1],
            alt_arr: []
          }));

          // search term exists
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
    localStorage.setItem('docset', JSON.stringify(docset));
  }, [docset, setDocset]);

  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.event === 'notify:documentListParams') {
        const term = e.data.args[0].q;
        getKeywords(term);
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
      <Route path="/metadata">
        <Metadata />
      </Route>
    </div>
  );
}

export default App;
