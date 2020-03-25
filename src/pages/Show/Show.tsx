import React from 'react';

import SearchResults from '../../components/Show/SearchResults';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import { ProgressState, State } from '../../types';

interface Props {
  progressState: ProgressState;
  state: State;
  term: string | null;
  clearSearchAll: () => void;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  sortBy: string;
}

const Show = ({
  progressState,
  state,
  term,
  clearSearchAll,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  setSortBy,
  sortBy
}: Props): JSX.Element => {
  return (
    <section>
      {progressState.isSuccess ? (
        <SearchResults
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
      ) : (
        <LoadingPage progress={progressState.lastProgress} />
      )}
    </section>
  );
};

export default Show;
