import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import oboe from 'oboe';
import axios from 'axios';

import Metadata from './pages/Metadata/Metadata';
import Show from './pages/Show/Show';
import { axiosWithAuth, useQuery } from './utils';
import {
  State,
  GetKeywords,
  SearchedItem,
  ProgressState,
  SimilarToken,
  SearchHistory,
  Progress
} from './types';

const App = ({}: any): JSX.Element => {
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [term, setTerm] = useState<string | null>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [keywordMode, setKeywordMode] = useState<boolean>(false); // checks if kw is being clicked
  const [state, setState] = useState<State>({
    searchedList: [],
    searchHistory: [],
    token: [],
    similarSuggestionslist: []
  });
  const [progressState, setProgressState] = useState<ProgressState>({
    lastProgress: null,
    isSuccess: false
  });

  const keywordModeRef = useRef<boolean>(keywordMode);
  const progressStateRef = useRef<ProgressState>(progressState);

  const query = useQuery();
  const apiToken: string = query.get('apiToken')!;
  const server: string = query.get('server')!;
  const documentSetId: string = query.get('documentSetId')!;

  const initFetchStore = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/store/state', {
        headers: {
          Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data.store) {
        // store exists
        setState(res.data.store);
        progressStateRef.current = {
          lastProgress: {
            n_ahead_in_queue: 0,
            fraction: 1,
            message: null,
            returncode: 0,
            error: null
          },
          isSuccess: true
        };
        setProgressState({
          lastProgress: {
            n_ahead_in_queue: 0,
            fraction: 1,
            message: null,
            returncode: 0,
            error: null
          },
          isSuccess: true
        });
      } else {
        // store doesnt exist... oboe it to existence

        return oboe({
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
            // Oboe instance will emit each Progress event until there are no more
            console.log('runnin!');
            setProgressState({ lastProgress: progress, isSuccess: false });
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
            setProgressState(prevModelState => {
              console.log('done! ', prevModelState.lastProgress);
              progressStateRef.current = {
                // state will have stale object
                lastProgress: prevModelState.lastProgress,
                isSuccess: prevModelState.lastProgress?.returncode === 0
              };
              return {
                lastProgress: prevModelState.lastProgress,
                isSuccess: prevModelState.lastProgress?.returncode === 0
              };
            })
          );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initFetchStore();
  }, []);

  const setKeywordRef = (bool: boolean): void => {
    keywordModeRef.current = bool;
    setKeywordMode(bool);
  };

  const onNotifyDocumentListParams = useCallback(
    (e: MessageEvent) => {
      if (e.data.event === 'notify:documentListParams') {
        const token: string = e.data.args[0].q;
        if (
          keywordModeRef.current === false &&
          token !== undefined &&
          progressStateRef.current.isSuccess
        ) {
          getKeywords({
            token,
            server,
            documentSetId,
            apiToken
          });
        } else {
          setKeywordRef(false);
        }
      }
    },
    [keywordModeRef, progressState]
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
    setState(prevDocset => ({
      ...prevDocset,
      searchedList: prevDocset.searchedList.filter(
        searchedItem => searchedItem.id !== modelId
      ),
      searchHistory: prevDocset.searchHistory.filter(tag => tag.id !== modelId)
    }));
  };

  const updateStore = async (stateObj: State): Promise<void> => {
    try {
      await axios.put(
        'http://localhost:9000/api/v1/store/state',
        { store: stateObj },
        {
          headers: {
            Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('saved to store!');
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearchAll = (): void => {
    const newObj = {
      searchedList: [],
      searchHistory: [],
      token: [],
      similarSuggestionslist: []
    };

    setState(newObj);
    updateStore(newObj);
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
      const newModel: SearchedItem = {
        id: newID,
        foundTokens: res.data.foundTokens,
        similarTokens: res.data.similarTokens,
        sortedSimilarTokensByCount
      };
      const newHistoryItem: SearchHistory = {
        id: newID,
        term: token
      };

      setState(prevState => {
        const searchedList = [
          ...prevState.searchedList.map(searchedItem => ({ ...searchedItem })),
          newModel
        ];
        const searchHistory = [
          ...prevState.searchHistory.map(hist => ({ ...hist })),
          newHistoryItem
        ];
        const similarSuggestionslist = res.data.similarTokens.map(
          (item: SimilarToken): string => item.token
        );
        const token = res.data.foundTokens;

        updateStore({
          searchedList,
          searchHistory,
          similarSuggestionslist,
          token
        });

        return {
          ...prevState,
          searchedList,
          searchHistory,
          token,
          similarSuggestionslist
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledApp>
      <Route path="/show">
        <Show
          progressState={progressState}
          state={state}
          term={term}
          clearSearchAll={clearSearchAll}
          selectModel={selectModel}
          deleteModel={deleteModel}
          selectedId={selectedId}
          setKeywordRef={setKeywordRef}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </Route>
      <Route path="/metadata">
        <Metadata />
      </Route>
    </StyledApp>
  );
};

const StyledApp = styled.main`
  height: 100vh;
`;

export default App;
