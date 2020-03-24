import React, { useState, useEffect, useRef } from 'react';
import fileDownload from 'js-file-download';
import axios from 'axios';
import searchContext from './searchContext';

const SearchProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const keywordMode = useRef(false); // checks if kw is being clicked
  const [term, setTerm] = useState('');
  const [docset, setDocset] = useState(
    JSON.parse(localStorage.getItem('docset')) || {
      name: 'coronavirus',
      // mueller
      models: [],
      search_history: [],
      msg: '',
      alt_arr: []
    }
  );
  const [selectedId, setSelectedId] = useState(null);

  const deleteModel = modelId => {
    setDocset(prev => ({
      ...prev,
      models: prev.models.filter(model => model.id !== modelId),
      search_history: prev.search_history.filter(tag => tag.tag_id !== modelId)
    }));
  };

  const sortModels = ({ tagIndex, name }) => {
    const sortedModels = [...docset.models];
    let temp;
    // check if tag already in first position
    if (docset.models[0].search_term === name) return;

    // check if tag already in last position
    if (docset.models[docset.models.length - 1].search_term === name) {
      temp = sortedModels[sortedModels.length - 1];
      sortedModels.pop();
      setDocset(prev => ({ ...prev, models: [temp, ...sortedModels] }));
      return;
    }
    // tag in between
    temp = sortedModels.find(model => model.id === tagIndex);
    const filteredSortedModels = sortedModels.filter(
      model => model.id !== temp.id
    );
    setDocset(prev => ({
      ...prev,
      models: [temp, ...filteredSortedModels]
    }));
  };

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

  // mueller m-overview
  // Gen-Hur gen-hur
  // coronavirus associator-covid19
  // Banks-Daxzaneous-Forger kimbreall
  // court_docs m-court-docs
  const getKeywords = async ({
    searchedGlobalTerm,
    size = 8,
    docset = 'court_docs'
  }) => {
    const url = 'https://cohorts-api.herokuapp.com/api';

    setTerm(searchedGlobalTerm);
    try {
      const res = await axios.get(
        `${url}/?term=${searchedGlobalTerm}&docset=${docset}&size=${size}`
      );

      // search term does not exist but has similar words
      if (res.data.kw[0].msg) {
        setDocset(prevState => ({
          ...prevState,
          msg: res.data.kw[0].msg,
          alt_arr: [...res.data.kw[0].kw.map(word => word[0])]
        }));
        return;
      }
      // search term does not exist and has no similar words
      if (res.data.kw[0].score < 0) {
        setDocset(prevState => ({
          ...prevState,
          msg: res.data.kw[0].kw[1],
          alt_arr: []
        }));
        return;
      }

      // search term exists
      // add id and deleted_kw to models by index
      const newID = Date.now();
      const newData = res.data.kw.map((item, i) => {
        const temp = [...item.kw];
        return {
          id: newID,
          ...item,
          sorted_kw: temp.sort((a, b) => b[1] - a[1]),
          deleted_kw: [],
          search_term: searchedGlobalTerm,
          deleted: false
        };
      });
      const historyObj = {
        tag_id: newID,
        term: searchedGlobalTerm
      };

      setDocset(prevState => ({
        ...prevState,
        models: [...prevState.models.map(model => ({ ...model })), ...newData],
        search_history: [
          ...prevState.search_history.map(hist => ({ ...hist })),
          historyObj
        ],
        msg: '',
        alt_arr: []
      }));
      return;
    } catch (error) {
      console.log(error);
    }
  };

  // use browser cache for persistence
  useEffect(() => {
    localStorage.setItem('docset', JSON.stringify(docset));
  }, [docset, setDocset]);

  const fn = e => {
    if (e.data.event === 'notify:documentListParams') {
      const searchedGlobalTerm = e.data.args[0].q;
      if (keywordMode.current === false && term !== undefined) {
        getKeywords({ searchedGlobalTerm });
      } else {
        keywordMode.current = false;
      }
    }
  };

  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', e => {
      fn(e);
    });
    return () =>
      window.removeEventListener('message', e => {
        fn(e);
      });
  }, [keywordMode]);

  const selectModel = id => {
    setSelectedId(id);
  };

  return (
    <searchContext.Provider
      value={{
        docset,
        saveToFile,
        clearAll,
        sortModels,
        deleteModel,
        setSortBy,
        sortBy,
        keywordMode,
        selectedId,
        selectModel,
        term
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchProvider;
