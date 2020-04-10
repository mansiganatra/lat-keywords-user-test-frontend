import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ShowTopTagItem from './ShowTopTagItem';
import ShowTopHeader from './ShowTopHeader';
import { colorArray } from '../../utils';
import { State, SearchHistory } from '../../types';
import ClearBtn from './ClearBtn';
import UndoBtn from './UndoBtn';

interface Props {
  state: State;
  clearSearchAll: () => void;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  suggestedList: string[];
  undoCache: State | null;
  undoState: () => void;
}

const SearchShowTop = ({
  state,
  clearSearchAll,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  suggestedList,
  undoCache,
  undoState
}: Props): JSX.Element => {
  const handleClearConfirm = (): void => {
    clearSearchAll();
    // delete text content inside global overview search bar
    const message = {
      call: 'setDocumentListParams',
      args: [{ q: '' }]
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <StyledSearchShowTop>
      {!state.searchedList.length && (
        <StyledShowTopContainer>
          <ShowTopHeader />
          {undoCache && <UndoBtn undoState={undoState} />}
        </StyledShowTopContainer>
      )}
      {!!state.searchedList.length && (
        <StyledSearchShowTagsContainer>
          <StyledShowTagsTop>
            <h2>Search Terms:</h2>
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
          </StyledShowTagsTop>
          <StyledClearBtnContainer>
            <ClearBtn handleClearConfirm={handleClearConfirm} />
          </StyledClearBtnContainer>
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
  width: 100%;
  max-width: 85%;
  /* max-width: 530px; */

  h2 {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 15px;
    text-transform: capitalize;
    width: 125px;

    color: #ffffff;
  }
`;

const StyledSearchShowTagsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #1e2229;
  border-radius: 6px;
  margin-right: 50px;
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
  max-width: 85%;
`;
const StyledTagHistory = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  overflow: auto;
  overflow-y: hidden;

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

const StyledShowTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 55px;
`;

const StyledClearBtnContainer = styled.div`
  margin-top: 7px;
`;

export default SearchShowTop;
