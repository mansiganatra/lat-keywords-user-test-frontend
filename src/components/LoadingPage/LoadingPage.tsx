import React from 'react';
import styled from 'styled-components';

import LoadImgOne from '../../lib/loading1.png';
import LoadImgTwo from '../../lib/loading2.png';
import LoadImgThree from '../../lib/loading3.png';
import { Progress } from '../../types';

interface Props {
  progress: Progress | null;
}

const LoadingPage = ({ progress }: Props) => {
  if (!progress) return <h1>Contacting server</h1>;
  const { fraction, n_ahead_in_queue, returncode, error, message } = progress;

  if (fraction! === 1 && returncode !== 0)
    return <h1>Server crashed: {error}</h1>;
  if (n_ahead_in_queue > 0)
    return (
      <h1>
        Waiting for other {n_ahead_in_queue} uploads to finish before starting
        yours...
      </h1>
    );

  return (
    <LoadingPageContainer>
      <StyledTopSection>
        <StyledHeaderSection>
          <StyledHeader>Loading</StyledHeader>
          <StyledSubHeader>SOomething</StyledSubHeader>
        </StyledHeaderSection>
        <StyledImgContainer>
          <img src={LoadImgOne} alt="" />
        </StyledImgContainer>
      </StyledTopSection>
      <StyledLoadingBar>
        <StyledLoadingFiller fraction={fraction} />
      </StyledLoadingBar>
    </LoadingPageContainer>
  );
};

const LoadingPageContainer = styled.div`
  padding-top: 75px;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
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
  margin: 0 auto;
  margin-top: 35px;
  width: 100%;
  max-width: 620px;
  height: 7px;

  background: #dfe2e5;
`;
const StyledLoadingFiller = styled.div<{ fraction: number }>`
  background: #43d0ce;
  height: 100%;
  width: ${({ fraction }) => (fraction ? fraction * 100 : 0)}%;
`;

export default LoadingPage;
