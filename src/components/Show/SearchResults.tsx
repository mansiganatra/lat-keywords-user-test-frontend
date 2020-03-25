import React from 'react';
import styled from 'styled-components';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';
import SearchShowMid from './SearchShowMid';
import LoadComplete from '../../lib/load_complete.png';
import { Docset } from '../../types';

interface Props {
  docset: Docset;
  term: string | null;
  setDocset: React.Dispatch<React.SetStateAction<Docset>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
  sortBy: string;
}

const SearchTopResult = ({
  docset,
  term,
  setSortBy,
  setDocset,
  selectModel,
  deleteModel,
  selectedId,
  setKeywordRef,
  sortBy
}: Props): JSX.Element => {
  const { token, similarSuggestionslist } = docset;

  const handleClick = (word: string): void => {
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: word }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <>
      {docset.models.length === 0 ? (
        <>
          <StyledLoadComplete>
            <StyledImgComplete>
              <img src={LoadComplete} alt="" />
            </StyledImgComplete>
            <StyledLoadHeader>
              <StyledHeader>Start Searching Now</StyledHeader>
              <StyledSubHeader>MEssage</StyledSubHeader>
            </StyledLoadHeader>
          </StyledLoadComplete>
        </>
      ) : (
        <>
          <SearchShowTop
            docset={docset}
            setDocset={setDocset}
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
            docset={docset}
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

const StyledHeader = styled.h1`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 26px;
  text-transform: capitalize;

  color: #172d3b;
`;
const StyledSubHeader = styled.p`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 13px;
  /* or 130% */

  color: rgba(23, 45, 59, 0.7);
`;
const StyledLoadComplete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledImgComplete = styled.div`
  margin-bottom: 10px;
`;
const StyledHeaderSection = styled.header`
  width: 100%;
  max-width: 300px;
`;
const StyledLoadHeader = styled(StyledHeaderSection)`
  text-align: center;

  h1 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }
`;

export default SearchTopResult;
