import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ShowTopTagItem from './ShowTopTagItem';
import redX from '../../lib/images/red_x.png';
import ShowTopHeader from './ShowTopHeader';
import { colorArray } from '../../utils';
import { State, SearchHistory } from '../../types';

interface Props {
  state: State;
  clearSearchAll: () => void;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  suggestedList: string[];
}

const SearchShowTop = ({
  state,
  clearSearchAll,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  suggestedList
}: Props): JSX.Element => {
  const [clear, setClear] = useState<boolean>(false);

  const handleClearConfirm = (): void => {
    const clearData = window.confirm(
      'Do you really want to clear all tags and results?'
    );
    setClear(clearData);
  };

  useEffect(() => {
    if (clear) {
      clearSearchAll();

      // delete text content inside global overview search bar
      const message = {
        call: 'setDocumentListParams',
        args: [{ q: '' }]
      };
      window.parent.postMessage(message, '*');
      setClear(false);
    }
  }, [clear, setClear, clearSearchAll]);
  return (
    <StyledSearchShowTop>
      {state.searchedList.length === 0 && (
        <div className="search-show-header-container">
          <ShowTopHeader suggestedList={suggestedList} />
        </div>
      )}
      {state.searchedList.length > 0 && (
        <StyledSearchShowTagsContainer>
          <StyledShowTagsTop>
            <h2>Search Terms:</h2>
            <StyledClearHistoryBtn onClick={handleClearConfirm}>
              <img src={redX} alt="x" />
              <p>Clear All</p>{' '}
            </StyledClearHistoryBtn>
          </StyledShowTagsTop>
          <StyledTagHistory>
            <StyledHistoryList>
              {!!state.searchHistory?.length &&
                state.searchHistory?.map(
                  (tag: SearchHistory, i: number): JSX.Element => (
                    <ShowTopTagItem
                      key={tag.id}
                      tag={tag}
                      color={colorArray[i]}
                      selectModel={selectModel}
                      deleteModel={deleteModel}
                      selectedId={selectedId}
                      setKeywordRef={setKeywordRef}
                    />
                  )
                )}
            </StyledHistoryList>
          </StyledTagHistory>
        </StyledSearchShowTagsContainer>
      )}
    </StyledSearchShowTop>
  );
};

const StyledSearchShowTop = styled.section`
  display: flex;
  width: 100%;
  max-width: 100vw;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  background-color: #1e2229;
  padding-bottom: 5px;

  @media (max-width: 700px) {
    padding-left: 15px;
  }

  @media (max-width: 625px) {
    flex-direction: column;
  }
`;
const StyledShowTagsTop = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  background-color: #1e2229;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  z-index: 2;
  width: 313px;
  padding-left: 23px;

  h2 {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 15px;
    text-transform: capitalize;

    color: #ffffff;
  }
`;
const StyledClearHistoryBtn = styled.button`
  cursor: pointer;
  min-width: 77px;
  height: 21px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e2229;

  p {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 12px;
    text-transform: capitalize;

    color: #fc3636;
  }

  img {
    width: inherit;
    margin-right: 5px;
  }
`;
const StyledSearchShowTagsContainer = styled.div`
  position: relative;
  width: 350px;
  min-height: 130px;
  max-height: 130px;
  background-color: #1e2229;
  border: 2px solid rgba(160, 175, 199, 0.2);
  border-radius: 6px;
  margin-right: 34px;

  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

const StyledHistoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const StyledTagHistory = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  max-height: 105px;
  overflow: auto;
  padding-left: 25px;
  padding-top: 51px;
  min-height: 72px;
  padding-bottom: 72px;

  /* Width */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3e5372;
    border-radius: 12px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fafafb;
    border-radius: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
`;

// #888 handle
// #f1f1f1 track
// #555
export default SearchShowTop;
