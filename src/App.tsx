import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import oboe from 'oboe';

import Metadata from './pages/Metadata/Metadata';
import Show from './pages/Show/Show';
import { axiosWithAuth, useQuery } from './utils';
import {
  Docset,
  GetKeywords,
  Model,
  ModelState,
  SimilarToken,
  SearchHistory,
  Progress
} from './types';

const App = (props: any): JSX.Element => {
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

  const keywordModeRef = useRef<boolean>(false); // checks if kw is being clicked
  const modelStateRef = useRef<ModelState>({
    lastProgress: null,
    isSuccess: false
  });

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
        // Oboe instance will emit each Progress event until there are no more
        modelStateRef.current = {
          // state will have stale object
          lastProgress: progress,
          isSuccess: false
        };
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
      .done(
        () =>
          (modelStateRef.current = {
            // state will have stale object
            lastProgress: modelStateRef.current.lastProgress,
            isSuccess: true
          })
      );

    return () => o.abort();
  }, []);

  const onNotifyDocumentListParams = useCallback(
    (e: MessageEvent) => {
      if (e.data.event === 'notify:documentListParams') {
        const token: string = e.data.args[0].q;
        if (
          keywordModeRef.current === false &&
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
          keywordModeRef.current = false;
        }
      }
    },
    [keywordModeRef, modelStateRef]
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
    <StyledApp>
      <Route path="/show">
        <Show
          modelStateRef={modelStateRef}
          docset={docset}
          term={term}
          setDocset={setDocset}
          selectModel={selectModel}
          deleteModel={deleteModel}
          selectedId={selectedId}
          keywordModeRef={keywordModeRef}
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
