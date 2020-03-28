import React, { useEffect } from 'react';
import styled from 'styled-components';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';
import SearchShowMid from './SearchShowMid';
import LoadingSuccess from '../LoadingPage/LoadingSuccess';
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
  getSuggestion
}: Props): JSX.Element => {
  useEffect(() => {
    getSuggestion();
  }, []);

  return (
    <>
      {state.searchedList.length === 0 ? (
        <LoadingSuccess />
      ) : (
        <>
          <SearchShowTop
            state={state}
            clearSearchAll={clearSearchAll}
            selectModel={selectModel}
            deleteModel={deleteModel}
            selectedId={selectedId}
            setKeywordRef={setKeywordRef}
            suggestedList={suggestedList}
          />
          <SearchShowMid setSortBy={setSortBy} />
          <SearchShowBot
            sortBy={sortBy}
            state={state}
            selectedId={selectedId}
            selectModel={selectModel}
            setKeywordRef={setKeywordRef}
            deleteModel={deleteModel}
            term={term}
          />
        </>
      )}
    </>
  );
};
//setKeywordRef, deleteModel

const StyledInvalidSearch = styled.section`
  display: flex;
  justify-content: space-around;
  background: #172d3b;
  border-radius: 3px;
  padding: 40px;

  @media (max-width: 700px) {
    flex-direction: column;
    padding: 40px 0;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 2.4rem;
    line-height: 31px;
    /* or 130% */

    text-transform: capitalize;

    color: #ffffff;
    width: 100%;
    max-width: 311px;

    @media (max-width: 700px) {
      text-align: center;
      padding-bottom: 15px;
    }
  }

  .right {
    p {
      font-family: 'Helvetica Neue', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 1.2rem;
      line-height: 16px;
      /* or 130% */

      text-transform: capitalize;

      color: #ffffff;
    }

    .list {
      padding-top: 10px;
      display: flex;
      justify-content: space-evenly;
      margin-left: -25px;
      flex-wrap: wrap;
      p {
        font-family: 'Helvetica Neue', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 1.2rem;
        line-height: 16px;
        /* or 137% */

        text-transform: capitalize;

        color: #ffffff;
      }
    }
  }
`;

export default SearchTopResult;
