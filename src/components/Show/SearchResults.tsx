import React, { useContext } from 'react';
import styled from 'styled-components';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';
import SearchShowMid from './SearchShowMid';
import searchContext from '../../store/searchContext';

const SearchTopResult = (props: any): JSX.Element => {
  const { docset, term } = useContext(searchContext);
  const { token, similarSuggestionslist } = docset!;

  const handleClick = (word: string): void => {
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: word }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <>
      <SearchShowTop />
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
      <SearchShowMid />
      <SearchShowBot />
    </>
  );
};

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
