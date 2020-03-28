import React from 'react';
import styled from 'styled-components';

import arrowDown from '../../lib/images/arrow-down.png';

interface Props {
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const SearchShowMid = ({ setSortBy }: Props): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy!(e.target.value);
  };

  return (
    <StyledShowMidContainer>
      <StyledShowMidLeft>words associated with...</StyledShowMidLeft>
      <StyledShowMidRight>
        <label htmlFor="sort">Sort Associated Words by</label>
        <form>
          <select name="sort" id="sort" onChange={handleChange}>
            <option value="relevance">Relevance</option>
            <option value="freq">Frequency</option>
          </select>
          <div>
            <img src={arrowDown} alt="arrow-down" />
          </div>
        </form>
      </StyledShowMidRight>
    </StyledShowMidContainer>
  );
};

const StyledShowMidContainer = styled.section`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-left: 50px;
  margin-top: 25px;

  @media (max-width: 700px) {
    padding-left: 15px;
  }

  @media (max-width: 450px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
const StyledShowMidLeft = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-transform: capitalize;

  color: #172d3b;
  margin-bottom: 18px;

  width: 100%;
  justify-content: space-between;
  max-width: 170px;
`;
const StyledShowMidRight = styled.div`
  display: flex;
  margin-right: 34px;
  align-items: center;
  @media (max-width: 700px) {
    margin-right: 0;
  }

  label {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 15px;
    text-align: right;
    text-transform: capitalize;
    margin-right: 10px;

    color: #172d3b;
  }

  form {
    position: relative;
    display: flex;
    justify-content: space-around;

    &::after {
      pointer-events: none;
    }

    img {
      position: absolute;
      right: 15px;
      top: 10px;
      width: inherit;
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      display: block;
      border: 1.2px solid rgba(182, 192, 198, 0.5);
      box-sizing: border-box;
      border-radius: 3px;
      width: 115px;
      height: 26px;
      text-transform: capitalize;

      font-family: 'Helvetica Neue', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 1rem;
      line-height: 12px;
      padding-left: 10px;
      /* identical to box height */

      letter-spacing: 0.08em;

      color: #172d3b;
    }
  }
`;

export default SearchShowMid;
