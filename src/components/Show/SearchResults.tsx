import React from 'react';
import styled from 'styled-components';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';
import SearchShowMid from './SearchShowMid';
import LoadComplete from '../../lib/load_complete.png';
import { State } from '../../types';
import LoadingSuccess from '../LoadingPage/LoadingSuccess';

interface Props {
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

const SearchTopResult = ({
  state,
  term,
  setSortBy,
  setState,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  sortBy
}: Props): JSX.Element => {
  const { token, similarSuggestionslist } = state;

  const handleClick = (word: string): void => {
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: word }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <>
      {state.models.length === 0 ? (
        <LoadingSuccess />
      ) : (
        <>
          <SearchShowTop
            state={state}
            setState={setState}
            selectModel={selectModel}
            deleteModel={deleteModel}
            selectedId={selectedId}
            setKeywordRef={setKeywordRef}
          />
          {token?.length === 0 && (
            <StyledInvalidSearch>
              <h1>{term}</h1>
              {similarSuggestionslist?.length > 0 && (
                <div className="right">
                  <p>But These Related Words Do. Try Searching:</p>
                  <div className="list">
                    {similarSuggestionslist.map(
                      (item: string): JSX.Element => (
                        <p
                          key={item}
                          onClick={() => handleClick(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </StyledInvalidSearch>
          )}
          <SearchShowMid setSortBy={setSortBy} />
          <SearchShowBot
            sortBy={sortBy}
            state={state}
            selectedId={selectedId}
            selectModel={selectModel}
            setKeywordRef={setKeywordRef}
            deleteModel={deleteModel}
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
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
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
      font-family: 'Helvetica Neue';
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
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
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        /* or 137% */

        text-transform: capitalize;

        color: #ffffff;
      }
    }
  }
`;

export default SearchTopResult;
