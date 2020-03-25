import React from 'react';

import SearchResults from '../../components/Show/SearchResults';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import { ModelState, State } from '../../types';

interface Props {
  modelState: ModelState;
  state: State;
  term: string | null;
  setState: React.Dispatch<React.SetStateAction<State>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  sortBy: string;
}

const Show = ({
  modelState,
  state,
  term,
  setState,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  setSortBy,
  sortBy
}: Props): JSX.Element => {
  return (
    <section>
      {modelState.isSuccess ? (
        <SearchResults
          state={state}
          term={term}
          setState={setState}
          selectModel={selectModel}
          deleteModel={deleteModel}
          selectedId={selectedId}
          setKeywordRef={setKeywordRef}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      ) : (
        <LoadingPage progress={modelState.lastProgress} />
      )}
    </section>
  );
};

export default Show;
