import React, { useEffect, useState } from 'react';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';
import SearchShowMid from './SearchShowMid';
import { State } from '../../types';

interface Props {
  state: State;
  term: string | null;
  clearSearchAll: () => void;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  sortBy: string;
  suggestedList: string[];
  getSuggestion: () => Promise<void>;
  undoCache: State | null;
  undoState: () => void;
}

const SearchTopResult = ({
  state,
  term,
  setSortBy,
  clearSearchAll,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  sortBy,
  suggestedList,
  getSuggestion,
  undoCache,
  undoState
}: Props): JSX.Element => {
  const [prevItemState, setPrevItemState] = useState<{
    color: string;
    term: string;
  }>({ color: '', term: '' });
  const [highlighted, setHighlighted] = useState<boolean>(false);

  useEffect(() => {
    getSuggestion();
    // eslint-disable-next-line
  }, []);

  const handleHighlightedEnable = ({
    color,
    term
  }: {
    color: string;
    term: string;
  }): void => {
    setPrevItemState({ color, term });
    if (!highlighted) return setHighlighted(true);
  };
  const handleHighlightedDisable = (): void => {
    if (highlighted) return setHighlighted(false);
  };

  return (
    <>
      <SearchShowTop
        state={state}
        clearSearchAll={clearSearchAll}
        selectModel={selectModel}
        deleteModel={deleteModel}
        selectedId={selectedId}
        setKeywordRef={setKeywordRef}
        suggestedList={suggestedList}
        undoCache={undoCache}
        undoState={undoState}
        handleHighlightedDisable={handleHighlightedDisable}
      />
      {!!state.searchedList.length && <SearchShowMid setSortBy={setSortBy} />}
      <SearchShowBot
        sortBy={sortBy}
        state={state}
        selectedId={selectedId}
        selectModel={selectModel}
        setKeywordRef={setKeywordRef}
        deleteModel={deleteModel}
        term={term}
        suggestedList={suggestedList}
        handleHighlightedEnable={handleHighlightedEnable}
        handleHighlightedDisable={handleHighlightedDisable}
        highlighted={highlighted}
        prevItemState={prevItemState}
      />
    </>
  );
};

export default SearchTopResult;
