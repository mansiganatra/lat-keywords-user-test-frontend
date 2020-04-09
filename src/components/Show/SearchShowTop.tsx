import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ShowTopTagItem from './ShowTopTagItem';
import redX from '../../lib/images/red_x.png';
import ShowTopHeader from './ShowTopHeader';
import { colorArray } from '../../utils';
import { State, SearchHistory } from '../../types';
import ClearBtn from './ClearBtn';

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
      {!state.searchedList.length && (
        <div className="search-show-header-container">
          <ShowTopHeader />
        </div>
      )}
      {!!state.searchedList.length && (
        <StyledSearchShowTagsContainer>
          <StyledShowTagsTop>
            <h2>Search Terms:</h2>
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
          <StyledClearHistoryBtn onClick={handleClearConfirm}>
            <ClearBtn />
          </StyledClearHistoryBtn>
        </StyledSearchShowTagsContainer>
      )}
    </StyledSearchShowTop>
  );
};

const StyledSearchShowTop = styled.section`
  display: flex;
  width: 100%;
  max-width: 100vw;
  position: fixed;
  top: 0;
  z-index: 99;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  background-color: #1e2229;
  padding-bottom: 5px;
`;
const StyledShowTagsTop = styled.div`
  display: flex;
  background-color: #1e2229;
  z-index: 2;
  width: 150px;

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
  display: flex;
  width: 100%;
  background-color: #1e2229;
  border-radius: 6px;
  margin-right: 34px;
  animation-fill-mode: forwards;
  animation-duration: 0.5s;
  animation-name: top;

  @keyframes top {
    from {
      padding: 20px 0;
    }
    to {
      padding: 15px 0;
    }
  }
`;

const StyledHistoryList = styled.div`
  display: flex;
  width: 100%;
`;
const StyledTagHistory = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  overflow: auto;

  /* Width */
  &::-webkit-scrollbar {
    /* width: 4px; */
    height: 10px;
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
