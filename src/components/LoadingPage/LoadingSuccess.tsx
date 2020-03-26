import React from 'react';
import styled from 'styled-components';

import LoadComplete from '../../lib/load_complete.png';

interface LoadingSuccessProps {}

const LoadingSuccess = (props: LoadingSuccessProps): JSX.Element => {
  return (
    <StyledLoadComplete>
      <StyledImgComplete>
        <img src={LoadComplete} alt="" />
      </StyledImgComplete>
      <StyledLoadHeader>
        <StyledHeader>Start Searching Now</StyledHeader>
        <StyledSubHeader>MEssage</StyledSubHeader>
      </StyledLoadHeader>
    </StyledLoadComplete>
  );
};

const StyledLoadComplete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
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

export default LoadingSuccess;
