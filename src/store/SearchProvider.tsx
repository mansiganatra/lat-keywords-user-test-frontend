import React, { useState, useEffect, useRef, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import searchContext from './searchContext';
import { axiosWithAuth, testData } from '../utils';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
interface GetKeywords {
  token: string | null;
  server: string | null;
  documentSetId: string | null;
  apiToken: string | null;
}
interface SimilarToken {
  count: number;
  similarity: number;
  token: string;
}
interface SearchHistory {
  id: number;
  term: string | null;
}
interface Model {
  id: number;
  foundTokens: string[];
  similarTokens: SimilarToken[];
  sortedSimilarTokensByCount: SimilarToken[];
}
interface Docset {
  models: {
    id: number;
    foundTokens: string[];
    similarTokens: {
      count: number;
      similarity: number;
      token: string;
    }[];
    sortedSimilarTokensByCount: {
      count: number;
      similarity: number;
      token: string;
    }[];
  }[];
  searchHistory: {
    id: number;
    term: string | null;
  }[];
  token: string[];
  similarSuggestionslist: string[];
}
interface ProviderProps {
  children: React.ReactNode;
}

const SearchProvider = ({ children }: ProviderProps) => {
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [term, setTerm] = useState<string | null>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const query = useQuery();
  const [docset, setDocset] = useState<Docset>(
    JSON.parse(`${localStorage.getItem('docset')}`) || {}
  );

  const keywordMode = useRef(false); // checks if kw is being clicked
  const apiToken: string | null = query.get('apiToken');
  const server: string | null = query.get('server');
  const documentSetId: string | null = query.get('documentSetId');

  // use browser cache for persistence
  useEffect(() => {
    localStorage.setItem('docset', JSON.stringify(docset));
  }, [docset, setDocset]);

  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', (e): void => {
      if (e.data.event === 'notify:documentListParams') {
        const token: string = e.data.args[0].q;
        if (keywordMode.current === false && token !== undefined) {
          getKeywords({
            token,
            server,
            documentSetId,
            apiToken
          });
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

  const selectModel = (id: number | null): void => {
    setSelectedId(id);
  };

  const deleteModel = (modelId: number): void => {
    setDocset(prevDocset => ({
      ...prevDocset,
      models: prevDocset.models.filter(model => model.id !== modelId),
      searchHistory: prevDocset.searchHistory.filter(tag => tag.id !== modelId)
    }));
  };

  const clearAll = (): void => {
    localStorage.removeItem('docset');
    setDocset({
      models: [],
      searchHistory: [],
      token: [],
      similarSuggestionslist: []
    });
  };

  const getKeywords = async ({
    token,
    server,
    documentSetId,
    apiToken
  }: GetKeywords): Promise<void> => {
    setTerm(token);
    try {
      const res = await axiosWithAuth(apiToken).get(
        `/search?term=${token}&server=${server}&documentSetId${documentSetId}`
      );
      const newID: number = Date.now();
      const sortedSimilarTokensByCount: SimilarToken[] = res.data.similarTokens.sort(
        (curItem: SimilarToken, nextItem: SimilarToken): number =>
          nextItem.count - curItem.count
      );
      const newModel: Model = {
        id: newID,
        foundTokens: res.data.foundTokens,
        similarTokens: res.data.similarTokens,
        sortedSimilarTokensByCount
      };
      const newHistoryItem: SearchHistory = {
        id: newID,
        term: token
      };

      setDocset(prevState => ({
        ...prevState,
        models: [...prevState.models.map(model => ({ ...model })), newModel],
        searchHistory: [
          ...prevState.searchHistory.map(hist => ({ ...hist })),
          newHistoryItem
        ],
        token: res.data.foundTokens,
        similarSuggestionslist: res.data.similarTokens.map(
          (item: SimilarToken): string => item.token
        )
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
        sortBy,
        keywordMode,
        selectedId,
        selectModel,
        term,
        setSortBy
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchProvider;
