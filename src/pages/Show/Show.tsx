import React from 'react';

import SearchResults from '../../components/Show/SearchResults';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import { ModelState, Docset } from '../../types';

interface Props {
  modelStateRef: { current: ModelState };
  docset: Docset;
  term: string | null;
  setDocset: React.Dispatch<React.SetStateAction<Docset>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  keywordModeRef: { current: boolean };
  sortBy: string;
}

const Show = ({
  modelStateRef,
  docset,
  term,
  setDocset,
  selectModel,
  deleteModel,
  selectedId,
  keywordModeRef,
  setSortBy,
  sortBy
}: Props): JSX.Element => {
  return (
    <section>
      {modelStateRef.current.isSuccess ? (
        <SearchResults
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
      ) : (
        <LoadingPage progress={modelStateRef.current.lastProgress} />
      )}
    </section>
  );
};

export default Show;
