import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import searchContext from './searchContext';
import AxiosWithAuth from '../utils/axiosWithAuth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState('relevance');
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
  const keywordMode = useRef(false); // checks if kw is being clicked
  let query = useQuery();

  let apiToken = query.get('apiToken');
  let server = query.get('server');
  // let selectionId = query.get('selectionId');
  let documentSetId = query.get('documentSetId');

  // use browser cache for persistence
  useEffect(() => {
    localStorage.setItem('docset', JSON.stringify(docset));
  }, [docset, setDocset]);

  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.event === 'notify:documentListParams') {
        const term = e.data.args[0].q;
        if (keywordMode.current === false && term !== undefined) {
          getKeywords(term, server, documentSetId);
        } else {
          keywordMode.current = false;
        }
      }
    });

    return () =>
      window.removeEventListener('message', () => {
        console.log('done');
      });
  }, [keywordMode]);

  const selectModel = id => {
    setSelectedId(id);
  };

  const deleteModel = (e, modelId) => {
    e.stopPropagation();
    setDocset(prev => ({
      ...prev,
      models: prev.models.filter(model => model.id !== modelId),
      search_history: prev.search_history.filter(tag => tag.tag_id !== modelId)
    }));
    return;
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
    return;
  };

  // mueller m-overview
  // Gen-Hur gen-hur
  // coronavirus associator-covid19
  // Banks-Daxzaneous-Forger kimbreall
  const getKeywords = async (term, server, documentSetId, size = 15) => {
    setTerm(term);
    try {
      let newData;
      const res = await AxiosWithAuth(apiToken).get(
        `/search?term=${term}&server=${server}&documentSetId${documentSetId}&size=${size}`
      );

      console.log(res);
      // // search term does not exist but has similar words
      // if (res.data.kw[0].msg) {
      //   setDocset(prevState => ({
      //     ...prevState,
      //     msg: res.data.kw[0].msg,
      //     alt_arr: [...res.data.kw[0].kw.map(word => word[0])]
      //   }));
      //   return;
      // }
      // // search term does not exist and has no similar words
      // if (res.data.kw[0].score < 0) {
      //   setDocset(prevState => ({
      //     ...prevState,
      //     msg: res.data.kw[0].kw[1],
      //     alt_arr: []
      //   }));
      //   return;
      // }

      // // search term exists
      // // add id and deleted_kw to models by index
      // const newID = Date.now();
      // newData = res.data.kw.map((item, i) => {
      //   const temp = [...item.kw];
      //   return {
      //     id: newID,
      //     ...item,
      //     sorted_kw: temp.sort((a, b) => b[1] - a[1]),
      //     deleted_kw: [],
      //     search_term: term,
      //     deleted: false
      //   };
      // });
      // const historyObj = {
      //   tag_id: newID,
      //   term: term
      // };

      // setDocset(prevState => ({
      //   ...prevState,
      //   models: [...prevState.models, ...newData],
      //   search_history: [...prevState.search_history, historyObj],
      //   msg: '',
      //   alt_arr: []
      // }));
      // return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <searchContext.Provider
      value={{
        docset,
        clearAll,
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
