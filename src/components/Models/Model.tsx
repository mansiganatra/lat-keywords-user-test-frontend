import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';
import Keyword from '../Keywords/Keyword';
import xAlt from '../../lib/x_alt.png';

interface Props {
  model: {
    id: number;
    foundTokens: string[];
    similarTokens: {
      count: number;
      similarity: number;
      token: string;
    }[];
    sortedSimilarTokensByCount: {
      count: number;
      similarity: number;
      token: string;
    }[];
  };
  topBarColor: string;
}

const Model = ({ model, topBarColor }: Props): JSX.Element => {
  const { similarTokens, foundTokens, id, sortedSimilarTokensByCount } = model;
  const [hover, setHover] = useState(false);
  const {
    selectedId,
    selectModel,
    sortBy,
    keywordMode,
    deleteModel
  } = useContext(searchContext);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    let message;
    keywordMode.current = true;

    if (selectedId === id) {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `` }] // arguments
      };
      selectModel(null);
    } else {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `${foundTokens[0]}` }] // arguments
      };
      selectModel(id);
    }
    window.parent.postMessage(message, '*');
  };

  return (
    <StyledModelContainer
      selected={selectedId === id}
      topBarColor={topBarColor}
      onClick={handleClick}
      onMouseEnter={handleHoverEnable}
      onMouseLeave={handleHoverDisable}
    >
      <StyledModelHeaderContainer>
        <StyledHeaderTop>
          <button>
            <h1>{foundTokens[0]}</h1>
          </button>
          <button onClick={handleDelete}>
            <img src={xAlt} alt="" />
          </button>
        </StyledHeaderTop>
        <StyledHeaderBot>
          <div className="word">Word</div>
          <div className="word-partner">count</div>
        </StyledHeaderBot>
      </StyledModelHeaderContainer>
      <StyledKeywordListContainer>
        <StyledKeywordList>
          {sortBy === 'relevance'
            ? similarTokens.map(
                (word: {
                  count: number;
                  similarity: number;
                  token: string;
                }) => <Keyword key={id} word={word} />
              )
            : sortedSimilarTokensByCount.map(word => (
                <Keyword key={id} word={word} />
              ))}
        </StyledKeywordList>
        {/* <div className="see-more-container">
          <div className="content">
            <p>SEE MORE</p>
            <img src={seeMoreArror} alt="arrow" />
          </div>
        </div> */}
      </StyledKeywordListContainer>
    </StyledModelContainer>
  );
};

const StyledModelContainer = styled.div`
  border-top: 5px solid
    ${({ topBarColor }: { topBarColor: string }): string => topBarColor};
  margin-right: 27px;
  max-width: 250px;
  min-width: 250px;
  width: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin-top: ${({ selected }): string => (selected ? '-25px' : '0')};
`;
const StyledModelHeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 20px 20px 20px;

  h1 {
    text-transform: capitalize;
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 26px;
    color: #172d3b;
  }
`;
const StyledHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    cursor: pointer;
    border: none;
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
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: bold;
    font-size: 9px;
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

export default Model;
