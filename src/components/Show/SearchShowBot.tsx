import React from 'react';
import styled from 'styled-components';

import SearchedTerm from '../SearchedItem/SearchedItem';
import colorArray from '../../utils/colorArray';
import { State, SearchedItem } from '../../types';

interface Props {
  sortBy: string;
  state: State;
  selectedId: number | null;
  selectModel: (id: number | null) => void;
  setKeywordRef: (bool: boolean) => void;
  deleteModel: (modelId: number) => void;
}

const SearchShowBot = ({
  sortBy,
  state,
  selectedId,
  selectModel,
  setKeywordRef,
  deleteModel
}: Props): JSX.Element => {
  const { searchedList } = state;

  return (
    <StyledSearchShowBot>
      <StyledModelList>
        {searchedList?.length > 0 &&
          searchedList.map((searchedItem: SearchedItem, i: number) => (
            <SearchedTerm
              key={searchedItem.id}
              searchedItem={searchedItem}
              topBarColor={colorArray[i]}
              sortBy={sortBy}
              selectedId={selectedId}
              selectModel={selectModel}
              setKeywordRef={setKeywordRef}
              deleteModel={deleteModel}
            />
          ))}
      </StyledModelList>
    </StyledSearchShowBot>
  );
};

const StyledSearchShowBot = styled.section`
  overflow: auto;
  overflow-y: hidden;
  transform: rotateX(180deg);
  padding-left: 50px;
  padding-bottom: 20px;

  @media (max-width: 700px) {
    padding-left: 15px;
  }
`;
const StyledModelList = styled.div`
  display: flex;
  transform: rotateX(180deg);
  padding-top: 10px;
  padding-bottom: 40px;
`;

export default SearchShowBot;
