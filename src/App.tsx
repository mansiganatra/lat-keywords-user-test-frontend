import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import oboe from 'oboe';
import axios from 'axios';

import Metadata from './pages/Metadata/Metadata';
import Show from './pages/Show/Show';
import { axiosWithAuth, query } from './utils';
import {
  State,
  GetKeywords,
  SearchedItem,
  ProgressState,
  SimilarToken,
  SearchHistory,
  Progress
} from './types';
import Snackbar from './components/Snackbar/Snackbar';

const App = (): JSX.Element => {
  const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('similarity');
  const [term, setTerm] = useState<string | null>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [keywordMode, setKeywordMode] = useState<boolean>(false); // checks if kw is being clicked
  const [suggestedList, setSuggestedList] = useState<string[]>([]);
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

  const { server, apiToken, documentSetId } = query;

  // get suggestion list
  const getSuggestion = async (): Promise<void> => {
    try {
      const res = await axiosWithAuth(apiToken).get('/mostfrequent', {
        params: {
          server,
          documentSetId
        }
      });
      res.data.mostFrequentTokens.pop(); // set item length to 4 instead of 5
      setSuggestedList(res.data.mostFrequentTokens);
    } catch (error) {
      console.error(error);
    }
  };

  const selectModel = (id: number | null): void => {
    setSelectedId(id);
  };

  const setKeywordRef = (bool: boolean): void => {
    keywordModeRef.current = bool;
    setKeywordMode(bool);
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

  const updateStore = useCallback(
    async (state: State | undefined): Promise<void> => {
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
    },
    [apiToken, server]
  );

  const clearSearchAll = (): void => {
    const newState: State = {
      searchedList: [],
      searchHistory: [],
      token: [],
      similarSuggestionslist: []
    };

    setState(newState);
    updateStore(newState);
  };

  const getKeywords = useCallback(
    async ({
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

        if (!res.data.foundTokens.length) {
          setNotificationIsOpen(true);

          setState(prevState => {
            const newState: State = {
              ...prevState,
              similarSuggestionslist: res.data.similarTokens.map(
                (item: any) => item.token
              ),
              token: res.data.foundTokens
            };
            updateStore(newState);
            return newState;
          });
        } else {
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
              ...prevState.searchedList.map(searchedItem => ({
                ...searchedItem
              })),
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
        }
        scrollToLastChild();
      } catch (error) {
        console.error(error);
      }

      function scrollToLastChild() {
        const el = document.querySelector('.item:last-child');
        const scrollIntoViewOptions: any = {
          behavior: 'smooth',
          block: 'start'
        };
        el?.scrollIntoView(scrollIntoViewOptions);
      }
    },
    [updateStore]
  );

  // json stream and initial logic
  useEffect(() => {
    async function initFetchStore(): Promise<void> {
      try {
        // stream the json, will get 200 or 204
        const progressObject = await oboeJS();
        setProgressState(progressObject);
        progressStateRef.current = progressObject;

        // check to see if store exists
        const res = await axios.get(`${server}/api/v1/store/state`, {
          headers: {
            Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (typeof res.data === 'object' && res.data.associatorStore) {
          if (!!res.data.associatorStore.state.searchedList.length) {
            setState(res.data.associatorStore?.state);
          } else {
            // set default initial values to state
            const newState: State = {
              searchedList: [],
              searchHistory: [],
              token: [],
              similarSuggestionslist: []
            };
            setState(newState);
            updateStore(newState);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    function oboeJS(): Promise<ProgressState> {
      return new Promise((resolve, reject) => {
        const url: string = 'http://localhost:3335/';
        // const url: string = 'https://mansi-nlp.sdata.caltimes.io';

        oboe({
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
              reject(`${statusCode} ${body} ${error}`);
            }
          )
          .done(() => {
            setProgressState(prevProgressState => {
              let sucessObj: ProgressState;

              if (prevProgressState.lastProgress !== null) {
                sucessObj = {
                  lastProgress: prevProgressState.lastProgress,
                  isSuccess: prevProgressState.lastProgress?.returncode === 0
                };

                progressStateRef.current = sucessObj;
                resolve(sucessObj);
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

                progressStateRef.current = sucessObj;
                resolve(sucessObj);
                return sucessObj;
              }
            });
          });
      });
    }

    initFetchStore();
  }, [apiToken, documentSetId, server, updateStore]);

  // global search input watcher
  useEffect(() => {
    const onNotifyDocumentListParams = (e: MessageEvent) => {
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
    };

    window.addEventListener('message', onNotifyDocumentListParams);

    window.parent.postMessage({ call: 'notifyDocumentListParams' }, '*');
    return () =>
      window.removeEventListener('message', onNotifyDocumentListParams);
  }, [apiToken, documentSetId, server, getKeywords]);

  const pathname = window.location.pathname;

  return (
    <StyledApp>
      <Snackbar
        term={term}
        state={state}
        notificationIsOpen={notificationIsOpen}
        setNotificationIsOpen={setNotificationIsOpen}
      />
      {pathname === '/show' && (
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
          suggestedList={suggestedList}
          getSuggestion={getSuggestion}
        />
      )}
      {pathname === '/metadata' && <Metadata />}
    </StyledApp>
  );
};

const StyledApp = styled.main`
  height: 100vh;
`;

export default App;
