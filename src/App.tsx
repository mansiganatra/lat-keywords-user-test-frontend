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

interface AppProps {}

const App = (props: AppProps): JSX.Element => {
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
    [keywordModeRef, progressStateRef]
  );

  // useEffect(() => {
  //
  // updateStore({
  //   state: {
  //     searchedList: [],
  //     searchHistory: [],
  //     token: [],
  //     similarSuggestionslist: []
  //   },
  // });
  // }, []);

  // useEffect(() => {
  //   axios.put(
  //     `${server}/api/v1/store/state`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   );
  // }, []);

  useEffect(() => {
    async function initFetchStore(): Promise<void> {
      try {
        const res = await axios.get(`${server}/api/v1/store/state`, {
          headers: {
            Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (typeof res.data === 'object' && res.data.associatorStore) {
          // store exists... update ref and state from overview
          const progressObject = { lastProgress: null, isSuccess: true };

          setState(res.data.associatorStore?.state);
          setProgressState(progressObject);
          progressStateRef.current = progressObject;
        } else {
          // store doesnt exist... oboe it to existence
          const url: string = 'https://mansi-nlp.data.caltimes.io';
          return oboe({
            url: `${process.env.REACT_APP_BASE_URL || url}/generate`,
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
              // Oboe instance will emit each Progress event until there are no more
              console.log('runnin!');
              console.log(progress);
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
            .done((hello: any) => {
              console.log('in done');
              setProgressState(prevProgressState => {
                let sucessObj: ProgressState;
                console.log('prevProgressState in setstate');
                if (prevProgressState.lastProgress !== null) {
                  sucessObj = {
                    lastProgress: prevProgressState.lastProgress,
                    isSuccess: prevProgressState.lastProgress?.returncode === 0
                  };
                  console.log('done! ', prevProgressState.lastProgress);

                  updateStore(state);
                  progressStateRef.current = sucessObj;
                  return sucessObj;
                } else {
                  sucessObj = {
                    lastProgress: {
                      n_ahead_in_queue: 0,
                      fraction: 1,
                      message: null,
                      returncode: 0,
                      error: null
                    },
                    isSuccess: true
                  };

                  updateStore(state);
                  progressStateRef.current = sucessObj;
                  return sucessObj;
                }
              });
            });
        }
      } catch (error) {
        console.error(error);
      }
    }

    initFetchStore();
  }, []);
  console.log('progressState', progressStateRef.current);
  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', onNotifyDocumentListParams);
    return () =>
      window.removeEventListener('message', onNotifyDocumentListParams);
  }, []);

  function selectModel(id: number | null): void {
    setSelectedId(id);
  }

  function setKeywordRef(bool: boolean): void {
    keywordModeRef.current = bool;
    setKeywordMode(bool);
  }

  function deleteModel(modelId: number): void {
    setState(prevDocset => ({
      ...prevDocset,
      searchedList: prevDocset.searchedList.filter(
        searchedItem => searchedItem.id !== modelId
      ),
      searchHistory: prevDocset.searchHistory.filter(tag => tag.id !== modelId)
    }));
  }

  async function updateStore(state: State): Promise<void> {
    try {
      await axios.put(
        `${server}/api/v1/store/state`,
        {
          associatorStore: {
            state
          }
        },
        {
          headers: {
            Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  function clearSearchAll(): void {
    const newState: State = {
      searchedList: [],
      searchHistory: [],
      token: [],
      similarSuggestionslist: []
    };

    setState(newState);
    updateStore(newState);
  }

  async function getKeywords({
    token,
    server,
    documentSetId,
    apiToken
  }: GetKeywords): Promise<void> {
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
      const similarTokens: SimilarToken[] = res.data.similarTokens.map(
        (token: SimilarToken) => ({ ...token })
      );

      const similarTokensCopy: SimilarToken[] = res.data.similarTokens.map(
        (token: SimilarToken) => ({ ...token })
      );

      const sortedSimilarTokensByCount: SimilarToken[] = similarTokensCopy.sort(
        (curItem: SimilarToken, nextItem: SimilarToken): number =>
          nextItem.count - curItem.count
      );

      const newModel: SearchedItem = {
        id: newID,
        foundTokens: res.data.foundTokens,
        similarTokens,
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
        const newState = {
          searchedList,
          searchHistory,
          similarSuggestionslist,
          token
        };
        updateStore(newState);

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
  }

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
