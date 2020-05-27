import React from 'react';
import styled from 'styled-components';

import Keyword from '../Keywords/Keyword';
import { SearchedItem, SimilarToken } from '../../types';
import SearchItemX from './SearchItemX';

interface Props {
  searchedItem: SearchedItem;
  topBarColor: string;
  selected?: boolean;
  sortBy: string;
  selectedId: number | null;
  selectModel: (id: number | null, className?: string) => void;
  setKeywordRef: (bool: boolean) => void;
  deleteModel: (modelId: number) => void;
  term: string | null;
  selectedToken: string | null;
  handleTokenSelect: (token: string | null, id: number | null) => void;
  tokenId: number | null;
  handleHighlightedEnable: ({
    color,
    term
  }: {
    color: string;
    term: string;
  }) => void;
  handleHighlightedDisable: () => void;
  hover: boolean;
  nextColor: string;
  handleHover: () => void;
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
  tokenId,
  handleHighlightedEnable,
  handleHighlightedDisable,
  hover,
  nextColor,
  handleHover
}: Props): JSX.Element => {
  const {
    similarTokens,
    foundTokens,
    id,
    sortedSimilarTokensByCount
  } = searchedItem;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    deleteModel(id);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    let message;
    setKeywordRef(true);

    message = {
      call: 'setDocumentListParams', // call
      args: [{ q: `${term}` }] // arguments
    };
    selectModel(id, `.a${foundTokens[0].replace(/'/, '')}${id}`);
    window.parent.postMessage(message, '*');
  };

  const handleSortList = (): JSX.Element => {
    if (sortBy === 'similarity') {
      return (
        <>
          {similarTokens.slice(0, 10).map(
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
                handleHighlightedEnable={handleHighlightedEnable}
                handleHighlightedDisable={handleHighlightedDisable}
                hover={hover}
                nextColor={nextColor}
                handleHover={handleHover}
              />
            )
          )}
        </>
      );
    }
    if (sortBy === 'countAsc') {
      return (
        <>
          {sortedSimilarTokensByCount.slice(0, 10).map(
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
                handleHighlightedEnable={handleHighlightedEnable}
                handleHighlightedDisable={handleHighlightedDisable}
                hover={hover}
                nextColor={nextColor}
                handleHover={handleHover}
              />
            )
          )}
        </>
      );
    }
    return (
      <>
        {sortedSimilarTokensByCount
          .slice(0, 10)
          .sort((a, b) => a.count - b.count)
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
                handleHighlightedEnable={handleHighlightedEnable}
                handleHighlightedDisable={handleHighlightedDisable}
                hover={hover}
                nextColor={nextColor}
                handleHover={handleHover}
              />
            )
          )}
      </>
    );
  };

  return (
    <StyledContainer className={`item a${foundTokens[0].replace(/'/, '')}${id}`}>
      <StyledModelContainer
        selected={selectedId === id}
        topBarColor={topBarColor}
        onClick={handleClick}
      >
        <StyledModelHeaderContainer>
          <StyledHeaderTop>
            <button className="header">
              <ShortHeader>{term}</ShortHeader>
            </button>
            <button onClick={handleDelete} className="header">
              <SearchItemX />
            </button>
          </StyledHeaderTop>
          <StyledHeaderBot>
            <div className="word">Word</div>
            <div className="word-partner">Similarity</div>
            <div className="word-partner">count</div>
          </StyledHeaderBot>
        </StyledModelHeaderContainer>
        <StyledKeywordListContainer>
          <StyledKeywordList>{handleSortList()}</StyledKeywordList>
        </StyledKeywordListContainer>
      </StyledModelContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 220px;
  min-width: 220px;
  padding-top: 80px;
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
`;
const Header = styled.h1`
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
`;
const ShortHeader = styled(Header)`
  font-size: 1.4rem;
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
    text-transform: capitalize;

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
