import React, { useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';

import useAxios from '../../utils/hooks/useAxios';
import LoadImgOne from '../../lib/loading1.png';
import LoadImgTwo from '../../lib/loading2.png';
import LoadImgThree from '../../lib/loading3.png';
import LoadComplete from '../../lib/load_complete.png';

const initialState = {
  header: 'Uploading the database may take about twenty minutes',
  subHeader: `Lorem ipsum dolor sit amet, consectetur ala lo adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  img: LoadImgOne,
  completed: true
};

const reducer = (state = initialState, action) => {
  switch (action.payload) {
    case action.payload >= 33:
      return {
        ...state,
        header: 'we’ll let you know when it’s ready so check back in',
        subHeader: `Lorem ipsum dolor sit amet, consectetur ala lo adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        img: LoadImgTwo
      };
    case action.payload >= 66:
      return {
        ...state,
        header: 'find words associated with your search in a few minutes',
        subHeader: `Lorem ipsum dolor sit amet, consectetur ala lo adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        img: LoadImgThree
      };
    case action.payload === 100:
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
};

const LoadingPage = () => {
  const [{ header, subHeader, img, completed }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [percent, setPercent] = useState(35);
  const res = useAxios('post', '/upload');

  return (
    <LoadingPageContainer>
      {completed ? (
        <StyledLoadComplete>
          <StyledImgComplete>
            <img src={LoadComplete} alt="" />
          </StyledImgComplete>
          <StyledLoadHeader>
            <StyledHeader>Start Searching Now</StyledHeader>
            <StyledSubHeader>{subHeader}</StyledSubHeader>
          </StyledLoadHeader>
        </StyledLoadComplete>
      ) : (
        <>
          <StyledTopSection>
            <StyledHeaderSection>
              <StyledHeader>{header}</StyledHeader>
              <StyledSubHeader>{subHeader}</StyledSubHeader>
            </StyledHeaderSection>
            <StyledImgContainer>
              <img src={img} alt="" />
            </StyledImgContainer>
          </StyledTopSection>
          <StyledLoadingBar>
            <StyledLoadingFiller percent={percent} />
          </StyledLoadingBar>
        </>
      )}
    </LoadingPageContainer>
  );
};

const LoadingPageContainer = styled.div`
  padding-top: 75px;
`;
const StyledTopSection = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  @media (max-width: 700px) {
    margin-right: 0;
  }
`;
const StyledHeaderSection = styled.header`
  width: 100%;
  max-width: 300px;
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
const StyledImgContainer = styled.div`
  padding-right: 60px;
`;

const StyledLoadingBar = styled.div`
  position: relative;
  margin-top: 35px;
  width: 100%;
  max-width: 620px;
  height: 7px;

  background: #dfe2e5;
`;
const StyledLoadingFiller = styled.div`
  background: #43d0ce;
  height: 100%;
  width: ${({ percent }) => (percent ? percent : 0)}%;
`;

const StyledLoadComplete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledImgComplete = styled.div`
  margin-bottom: 10px;
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

export default LoadingPage;
