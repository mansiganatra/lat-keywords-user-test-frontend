import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import fileDownload from 'js-file-download';

import axiosWithAuth from './utils/axiosWithAuth';

import Metadata from './views/Metadata/Metadata';
import Show from './views/Show/Show';

import './App.css';

function App() {
  const [docset, setDocset] = useState(
    JSON.parse(localStorage.getItem('docset')) || {
      name: 'mueller',
      models: [],
      search_history: [],
      msg: '',
      alt_arr: []
    }
  );

  const deleteModel = (e, modelId) => {
    e.stopPropagation();
    setDocset(prev => ({
      ...prev,
      models: prev.models.filter(model => model.id !== modelId),
      search_history: prev.search_history.filter(tag => tag.tag_id !== modelId)
    }));
  };
  console.log(docset.models);
  const sortModels = (tagIndex, name) => {
    const sortedModels = [...docset.models];
    let temp;
    // check if already first
    // if arr[0] === name: do nothing
    if (docset.models[0].search_term === name) return;

    // check if last
    // if arr[len of arr - 1]:
    if (docset.models[docset.models.length - 1].search_term === name) {
      //  temp = arr[len of arr - 1]
      temp = sortedModels[sortedModels.length - 1];
      //  arr.pop()
      sortedModels.pop();
      //  unshift temp to arr
      setDocset(prev => ({ ...prev, models: [temp, ...sortedModels] }));
      return;
    }

    // else
    // temp = arr[tag index]
    temp = sortedModels.find(model => model.id === tagIndex);
    const filteredSortedModels = sortedModels.filter(
      model => model.id !== temp.id
    );
    // del arr[tag index]
    setDocset(prev => ({
      ...prev,
      models: [temp, ...filteredSortedModels]
    }));
    // unshift temp to arr
  };

  // const sortKWList = (context) => {
  //   switch(context) {
  //     case 'FREQ':
  //       return
  //     case 'RELEVANCE':

  //   }
  // }

  const clearAll = () => {
    localStorage.removeItem('docset');
    setDocset({
      name: 'mueller',
      models: [],
      search_history: [],
      msg: '',
      alt_arr: []
    });
  };
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
          const newID = Date.now();
          newData = res.data.kw.map((item, i) => {
            return {
              id: newID,
              ...item,
              deleted_kw: [],
              search_term: query,
              deleted: false
            };
          });
          const historyObj = {
            tag_id: newID,
            term: query
          };
          setDocset(prevState => ({
            ...prevState,
            models: [...prevState.models, ...newData],
            search_history: [...prevState.search_history, historyObj],
            msg: '',
            alt_arr: []
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(docset.search_history);

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
          docset={docset}
          saveToFile={saveToFile}
          clearAll={clearAll}
          sortModels={sortModels}
          deleteModel={deleteModel}
        />
      </Route>
      <Route path="/metadata">
        <Metadata />
      </Route>
    </div>
  );
}

export default App;
