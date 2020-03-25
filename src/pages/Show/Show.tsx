import React from 'react';

import SearchResults from '../../components/Show/SearchResults';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import { ModelState, Docset } from '../../types';

interface Props {
  modelState: ModelState;
  docset: Docset;
  term: string | null;
  setDocset: React.Dispatch<React.SetStateAction<Docset>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  sortBy: string;
}

const Show = ({
  modelState,
  docset,
  term,
  setDocset,
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
          docset={docset}
          term={term}
          setDocset={setDocset}
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
