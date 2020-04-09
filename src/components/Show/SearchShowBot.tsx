import React, { useState } from 'react';
import styled from 'styled-components';

import SearchedTerm from '../SearchedItem/SearchedItem';
import colorArray from '../../utils/colorArray';
import SuggestionItem from '../shared/SuggestionItem';
import { State, SearchedItem } from '../../types';

interface Props {
  sortBy: string;
  state: State;
  selectedId: number | null;
  selectModel: (id: number | null) => void;
  setKeywordRef: (bool: boolean) => void;
  deleteModel: (modelId: number) => void;
  term: string | null;
  suggestedList: string[];
}

const SearchShowBot = ({
  sortBy,
  state,
  selectedId,
  selectModel,
  setKeywordRef,
  deleteModel,
  term,
  suggestedList
}: Props): JSX.Element => {
  const { searchedList } = state;
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const handleTokenSelect = (token: string, id: number): void => {
    setSelectedToken(token);
    setTokenId(id);
  };

  return (
    <>
      {!!searchedList.length ? (
        <StyledSearchShowBot>
          <StyledModelList>
            {!!searchedList?.length &&
              searchedList.map((searchedItem: SearchedItem, i: number) => (
                <>
                  <SearchedTerm
                    key={searchedItem.id}
                    searchedItem={searchedItem}
                    topBarColor={colorArray[i]}
                    sortBy={sortBy}
                    selectedId={selectedId}
                    selectModel={selectModel}
                    setKeywordRef={setKeywordRef}
                    deleteModel={deleteModel}
                    term={state.searchHistory[i].term}
                    selectedToken={selectedToken}
                    handleTokenSelect={handleTokenSelect}
                    tokenId={tokenId}
                  />
                </>
              ))}
          </StyledModelList>
        </StyledSearchShowBot>
      ) : (
        <StyledFallbackMessage>
          <div className="message-container">
            <h2>Start Searching Now</h2>
            <MsgText>
              Enter your search term into the search bar above to see a list of
              related words.
            </MsgText>
            <MsgTextShort>
              Here are some keywords from the document set that you can get
              started with:
            </MsgTextShort>
            <div>
              {suggestedList.map((suggested: string) => (
                <SuggestionItem
                  key={suggested}
                  suggested={suggested}
                  inversed={true}
                />
              ))}
            </div>
          </div>
        </StyledFallbackMessage>
      )}
    </>
  );
};

const MsgText = styled.p`
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 125%;
  text-align: center;
  margin-bottom: 15px;
  color: #a0afc7;

  width: 105%;
  /* max-width: 271px; */
`;
const MsgTextShort = styled(MsgText)`
  width: 95%;
`;

const StyledFallbackMessage = styled.section`
  min-height: 100vh;
  animation-name: display;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  @keyframes display {
    from {
      padding-top: 130px;
    }
    to {
      padding-top: 170px;
    }
  }

  .message-container {
    margin: 0 auto;
    width: 100%;
    max-width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-family: 'Archivo', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 1.7rem;
      line-height: 18px;
      text-align: center;
      margin-bottom: 10px;
      color: #a0afc7;
    }
    div {
      display: flex;
      margin-top: 10px;
    }
  }
`;

const StyledSearchShowBot = styled.section`
  overflow: auto;
  overflow-y: hidden;
  transform: rotateX(180deg);
  padding-left: 50px;
  padding-bottom: 20px;
  margin-top: 20px;

  @media (max-width: 700px) {
    padding-left: 15px;
  }
`;
const StyledModelList = styled.div`
  display: flex;
  transform: rotateX(180deg);
  padding-bottom: 40px;
`;

export default SearchShowBot;
