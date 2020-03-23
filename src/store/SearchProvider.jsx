import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import searchContext from './searchContext';
import { axiosWithAuth, testData } from '../utils';
import res from '../utils/testData';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [term, setTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const query = useQuery();

  const [docset, setDocset] = useState(
    JSON.parse(localStorage.getItem('docset')) || {}
  );

  const keywordMode = useRef(false); // checks if kw is being clicked
  const apiToken = query.get('apiToken');
  const server = query.get('server');
  const documentSetId = query.get('documentSetId');

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
          getKeywords({ term, server, documentSetId });
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

  const deleteModel = modelId => {
    setDocset(prev => ({
      ...prev,
      models: prev.models.filter(model => model.id !== modelId),
      searchHistory: prev.searchHistory.filter(tag => tag.id !== modelId)
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

  const getKeywords = async ({ token, server, documentSetId }) => {
    setTerm(token);
    try {
      // const res = await axiosWithAuth(apiToken).get(
      //   `/search?term=${token}&server=${server}&documentSetId${documentSetId}`
      // );
      const newID = Date.now();
      const sortedSimilarTokensByCount = res.data.similarTokens.sort(
        (a, b) => b.count - a.count
      );
      const newModel = {
        id: newID,
        foundTokens: res.data.foundTokens,
        similarTokens: res.data.similarTokens,
        sortedSimilarTokensByCount
      };
      const newHistoryItem = {
        id: newID,
        term: token
      };

      setDocset(prevState => ({
        ...prevState,
        models: [...prevState.models.map(model => ({ ...model })), ...newModel],
        search_history: [
          ...prevState.search_history.map(hist => ({ ...hist })),
          newHistoryItem
        ],
        token: res.data.foundTokens,
        similarSuggestionslist: res.data.similarTokens.map(item => item.token)
      }));
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
