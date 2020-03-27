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
import Snackbar from './components/Snackbar/Snackbar';

interface AppProps {}

const App = (props: AppProps): JSX.Element => {
  const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('relevance');
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
            .done(() => {
              setProgressState(prevProgressState => {
                let sucessObj: ProgressState;
                updateStore(state);

                if (prevProgressState.lastProgress !== null) {
                  sucessObj = {
                    lastProgress: prevProgressState.lastProgress,
                    isSuccess: prevProgressState.lastProgress?.returncode === 0
                  };

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

  // global search input watcher
  useEffect(() => {
    window.addEventListener('message', onNotifyDocumentListParams);
    return () =>
      window.removeEventListener('message', onNotifyDocumentListParams);
  }, []);

  // get suggestion list

  const getSuggestion = async (): Promise<void> => {
    try {
      const tokenRes = await axios.get(
        `${server}/api/v1/document-sets/${documentSetId}/documents`,
        {
          headers: {
            Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const suggestionRes = await axiosWithAuth(apiToken).get('/search', {
        params: {
          term: tokenRes.data.items[0].title
            .replace(/[^\w\s]/gi, ' ')
            .split(' ')
            .slice(0, 2)
            .join(' ')
            .trim(),
          server,
          documentSetId
        }
      });
      setSuggestedList(
        suggestionRes.data.similarTokens
          .slice(0, 4)
          .map((item: any) => item.token)
      );
    } catch (error) {
      console.error(error);
    }
  };

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

  async function updateStore(state: State | undefined): Promise<void> {
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

      if (res.data.foundTokens.length === 0) {
        console.log('hello');
        console.log(res.data.similarTokens);
        console.log(res.data.foundTokens);

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledApp>
      <Snackbar
        term={term}
        state={state}
        notificationIsOpen={notificationIsOpen}
        setNotificationIsOpen={setNotificationIsOpen}
      />

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
          suggestedList={suggestedList}
          getSuggestion={getSuggestion}
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
