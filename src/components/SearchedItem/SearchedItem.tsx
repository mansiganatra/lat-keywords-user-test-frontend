import React, { useState } from 'react';
import styled from 'styled-components';

import Keyword from '../Keywords/Keyword';
import xAlt from '../../lib/images/x_alt.png';
import { SearchedItem, SimilarToken } from '../../types';

interface Props {
  searchedItem: SearchedItem;
  topBarColor: string;
  selected?: boolean;
  sortBy: string;
  selectedId: number | null;
  selectModel: (id: number | null) => void;
  setKeywordRef: (bool: boolean) => void;
  deleteModel: (modelId: number) => void;
  term: string | null;
  selectedToken: string | null;
  handleTokenSelect: (token: string, id: number) => void;
  tokenId: number | null;
}

const SearchedTerm = ({
  searchedItem,
  topBarColor,
  sortBy,
  selectedId,
  selectModel,
  setKeywordRef,
  deleteModel,
  term,
  selectedToken,
  handleTokenSelect,
  tokenId
}: Props): JSX.Element => {
  const {
    similarTokens,
    foundTokens,
    id,
    sortedSimilarTokensByCount
  } = searchedItem;
  const [hover, setHover] = useState<boolean>(false);

  const handleHoverEnable = (): void => {
    if (!hover) return setHover(true);
  };
  const handleHoverDisable = (): void => {
    if (hover) return setHover(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    deleteModel(id);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    let message;
    setKeywordRef(true);

    if (selectedId === id) {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `` }] // arguments
      };
      selectModel!(null);
    } else {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `${term}` }] // arguments
      };
      selectModel(id);
    }
    window.parent.postMessage(message, '*');
  };

  return (
    <StyledContainer className="item">
      <StyledModelContainer
        selected={selectedId === id}
        topBarColor={topBarColor}
        onClick={handleClick}
        onMouseEnter={handleHoverEnable}
        onMouseLeave={handleHoverDisable}
      >
        <StyledModelHeaderContainer>
          <StyledHeaderTop>
            <button className="header">
              <h1>{term}</h1>
            </button>
            <button onClick={handleDelete} className="header">
              <img src={xAlt} alt="" />
            </button>
          </StyledHeaderTop>
          <StyledHeaderBot>
            <div className="word">Word</div>
            <div className="word-partner">count</div>
            <div className="word-partner">Similarity</div>
          </StyledHeaderBot>
        </StyledModelHeaderContainer>
        <StyledKeywordListContainer>
          <StyledKeywordList>
            {sortBy === 'relevance'
              ? similarTokens
                  .slice(0, 10)
                  .map(
                    (word: SimilarToken, i: number): JSX.Element => (
                      <Keyword
                        key={i}
                        word={word}
                        setKeywordRef={setKeywordRef}
                        color={topBarColor}
                        handleTokenSelect={handleTokenSelect}
                        selectedToken={selectedToken}
                        searchedId={id}
                        tokenId={tokenId}
                      />
                    )
                  )
              : sortedSimilarTokensByCount
                  .slice(0, 10)
                  .map(
                    (word: SimilarToken, i: number): JSX.Element => (
                      <Keyword
                        key={i}
                        word={word}
                        setKeywordRef={setKeywordRef}
                        color={topBarColor}
                        handleTokenSelect={handleTokenSelect}
                        selectedToken={selectedToken}
                        searchedId={id}
                        tokenId={tokenId}
                      />
                    )
                  )}
          </StyledKeywordList>
        </StyledKeywordListContainer>
      </StyledModelContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 220px;
  min-width: 220px;
`;
const StyledModelContainer = styled.div<{
  selected: boolean;
  topBarColor: string;
}>`
  border-top: 5px solid
    ${({ topBarColor }: { topBarColor: string }): string => topBarColor};
  margin-right: 20px;
  max-width: 200px;
  min-width: 200px;
  width: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;
const StyledModelHeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 20px 20px 20px;

  h1 {
    text-transform: capitalize;
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 2.1rem;
    line-height: 26px;
    color: #172d3b;
    width: 100%;
    max-width: 150px;
    text-align: left;
  }
`;
const StyledHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  img:hover {
    transform: scale(1.2);
  }
`;
const StyledHeaderBot = styled.div`
  display: flex;
  padding-top: 25px;
  justify-content: space-between;

  div {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 11px;
    text-align: right;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    color: rgba(23, 45, 59, 0.4);
  }
`;

const StyledKeywordListContainer = styled.div`
  background-color: #ffffff;
`;
const StyledKeywordList = styled.div`
  margin: 0 11px;
`;

export default SearchedTerm;
