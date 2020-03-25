import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext
} from 'react';
import { useLocation } from 'react-router-dom';
import oboe from 'oboe';

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

interface Progress {
  n_ahead_in_queue: number;
  fraction: number;
  message: string | null;
  returncode: number | null;
  error: string | null;
}

/**
 * State of this docset+apiToken on the server, according to the server.
 *
 * !isSuccess && lastProgress === null => this is "UNKNOWN" (server hasn't responded yet)
 * !isSuccess && lastProgress => server says X (may be an error message!)
 * isSuccess && lastProgress === null => server says this was done (long ago)
 * isSuccess && lastProgress => server says this was done (since we started the request)
 */
interface ModelState {
  lastProgress: Progress | null;
  isSuccess: boolean;
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
  const [docset, setDocset] = useState<Docset>({
    models: [],
    searchHistory: [],
    token: [],
    similarSuggestionslist: []
  });

  const [modelState, setModelState] = useState<ModelState>({
    lastProgress: null,
    isSuccess: false
  });

  const keywordMode = useRef(false); // checks if kw is being clicked
  const modelStateRef = useRef<ModelState>(modelState);

  const apiToken: string = query.get('apiToken')!;
  const server: string = query.get('server')!;
  const documentSetId: string = query.get('documentSetId')!;

  useEffect(() => {
    const o = oboe({
      url: 'http://localhost:3335/generate',
      method: 'POST',
      body: `server=${encodeURIComponent(
        server
      )}&documentSetId=${encodeURIComponent(documentSetId)}`,
      headers: {
        Authorization: 'Basic ' + btoa(apiToken + ':x-auth-token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .node('!.*', (progress: Progress) => {
        // Server will return either:
        // HTTP 204 -- in which case we're done
        // HTTP 200 with JSON Array of progress events, like:
        //   [
        //      {
        //          "fraction": 0.2,
        //          "n_ahead_in_queue": 0,
        //          ...,
        //      }
        //      ...
        //   ]
        //
        // Oboe instance will emit each Progress event until there are no more
        setModelState({ lastProgress: progress, isSuccess: false });
        return oboe.drop;
      })
      .fail(
        ({
          statusCode,
          body,
          error
        }: {
          statusCode: number | null;
          body: String | null;
          error: Error | null;
        }) => {
          console.error(statusCode, body, error);
        }
      )
      .done(() =>
        setModelState(prevModelState => {
          modelStateRef.current = {
            // state will have stale object
            lastProgress: prevModelState.lastProgress,
            isSuccess: true
          };
          return {
            lastProgress: prevModelState.lastProgress,
            isSuccess: true
          };
        })
      );

    return () => o.abort();
  }, []);

  const onNotifyDocumentListParams = useCallback(
    (e: MessageEvent) => {
      if (e.data.event === 'notify:documentListParams') {
        const token: string = e.data.args[0].q;
        if (
          keywordMode.current === false &&
          token !== undefined &&
          modelStateRef.current.isSuccess
        ) {
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
    },
    [keywordMode, modelStateRef]
  );

  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', onNotifyDocumentListParams);
    return () =>
      window.removeEventListener('message', onNotifyDocumentListParams);
  }, []);

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
      const res = await axiosWithAuth(apiToken).get('/search', {
        params: {
          term: token,
          server,
          documentSetId
        }
      });
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
      console.error(error);
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
        setSortBy,
        modelState
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchProvider;
