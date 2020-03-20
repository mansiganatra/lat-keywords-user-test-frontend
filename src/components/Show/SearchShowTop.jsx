import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';
import ShowTopTagItem from './ShowTopTagItem';
import redX from '../../lib/red_x.png';
import ShowTopHeader from './ShowTopHeader';
import colorArray from '../../utils/colorArray';

const SearchShowTop = () => {
  const [clear, setClear] = useState(false);

  const { clearAll, docset } = useContext(searchContext);

  const handleClearConfirm = () => {
    const clearData = window.confirm(
      'Do you really want to clear all tags and results?'
    );
    setClear(clearData);
  };

  useEffect(() => {
    if (clear) {
      clearAll();
      const message = {
        call: 'setDocumentListParams', // call
        args: [{ q: '' }] // arguments
      };
      window.parent.postMessage(message, '*'); // postMessage() with message and origin
      setClear(false);
    }
  }, [clear, setClear, clearAll]);
  return (
    <StyledSearchShowTop>
      <div className="search-show-header-container">
        <ShowTopHeader />
      </div>
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
            {docset.search_history.map((tag, i) => (
              <ShowTopTagItem
                key={tag.tag_id}
                tag={tag}
                color={colorArray[i]}
              />
            ))}
          </StyledHistoryList>
        </StyledTagHistory>
      </StyledSearchShowTagsContainer>
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
  background-color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(182, 192, 198, 0.5);

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
  background-color: white;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 25px;
  padding-top: 20px;
  padding-bottom: 10px;
  z-index: 2;

  h2 {
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    text-transform: capitalize;

    color: #172d3b;
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

  p {
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
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
  min-height: 120px;
  max-height: 120px;
  background: #ffffff;
  border: 2px solid #f1f2f3;
  border-radius: 5px;
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
  width: 105%;
  justify-content: space-between;
  height: 100%;
  max-height: 105px;
  overflow: auto;
  padding-left: 25px;
  padding-top: 51px;
  min-height: 72px;
`;

export default SearchShowTop;
