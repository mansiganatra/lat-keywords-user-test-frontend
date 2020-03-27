import React from 'react';

import {
  ErrorContainer,
  ErrorImageContainer,
  LoadingPageContainer,
  StyledTopSection,
  StyledHeaderSection,
  StyledHeader,
  StyledSubHeader,
  StyledImgContainer,
  StyledLoadingBar,
  StyledLoadingFiller
} from './LoadingStyles';
import LoadImgOne from '../../lib/images/loading1.png';
import LoadImgTwo from '../../lib/images/loading2.png';
import LoadImgThree from '../../lib/images/loading3.png';
import errorImage from '../../lib/images/error.png';
import { Progress } from '../../types';

interface Props {
  progress: Progress | null;
}

const LoadingPage = ({ progress }: Props) => {
  if (!progress) return <h1>Contacting server</h1>;

  const { fraction, n_ahead_in_queue, returncode, error, message } = progress;

  if (fraction! === 1 && returncode !== 0) {
    return (
      <ErrorContainer>
        <ErrorImageContainer>
          <img src={errorImage} alt="" />
        </ErrorImageContainer>
        <h1>Server crashed: </h1>
        <p>
          {error &&
            error
              .split(' ')
              .slice(0, 9)
              .join(' ')}
          ... Refresh server or contact your system administrator
        </p>
      </ErrorContainer>
    );
  }

  if (n_ahead_in_queue > 0)
    return (
      <h1>
        Waiting for other {n_ahead_in_queue} uploads to finish before starting
        yours...
      </h1>
    );

  if (fraction < 0.25) {
    return (
      <LoadingPageContainer>
        <StyledTopSection>
          <StyledHeaderSection>
            <StyledHeader>
              Processing your documents may take about twenty minutes
            </StyledHeader>
            <StyledSubHeader>
              Lorem ipsum odor sit amet consectur ala to adipiscing elit sed do
              emusod
            </StyledSubHeader>
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
  }

  if (fraction < 0.75) {
    return (
      <LoadingPageContainer>
        <StyledTopSection>
          <StyledHeaderSection>
            <StyledHeader>Results are coming in as we speak</StyledHeader>
            <StyledSubHeader>
              Lorem ipsum odor sit amet consectur ala to adipiscing elit sed do
              emusod
            </StyledSubHeader>
          </StyledHeaderSection>
          <StyledImgContainer>
            <img src={LoadImgTwo} alt="" />
          </StyledImgContainer>
        </StyledTopSection>
        <StyledLoadingBar>
          <StyledLoadingFiller fraction={fraction} />
        </StyledLoadingBar>
      </LoadingPageContainer>
    );
  }

  return (
    <LoadingPageContainer>
      <StyledTopSection>
        <StyledHeaderSection>
          <StyledHeader>
            Find word associated with your search in a few minutes
          </StyledHeader>
          <StyledSubHeader>
            Lorem ipsum odor sit amet consectur ala to adipiscing elit sed do
            emusod
          </StyledSubHeader>
        </StyledHeaderSection>
        <StyledImgContainer>
          <img src={LoadImgThree} alt="" />
        </StyledImgContainer>
      </StyledTopSection>
      <StyledLoadingBar>
        <StyledLoadingFiller fraction={fraction} />
      </StyledLoadingBar>
    </LoadingPageContainer>
  );
};

export default LoadingPage;
