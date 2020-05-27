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
  if (!progress) return <div></div>;

  const { fraction, n_ahead_in_queue, returncode, error } = progress;

  if (error && fraction! === 1 && returncode !== 0) {
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
        <StyledLoadingBar>
          <StyledLoadingFiller fraction={fraction} />
        </StyledLoadingBar>
        <StyledTopSection>
          <StyledImgContainer>
            <img src={LoadImgOne} alt="" />
          </StyledImgContainer>
          <StyledHeaderSection>
            <StyledHeader>
              Processing your documents may take up to ten minutes
            </StyledHeader>
          </StyledHeaderSection>
        </StyledTopSection>
      </LoadingPageContainer>
    );
  }

  if (fraction < 0.75) {
    return (
      <LoadingPageContainer>
        <StyledLoadingBar>
          <StyledLoadingFiller fraction={fraction} />
        </StyledLoadingBar>
        <StyledTopSection>
          <StyledImgContainer>
            <img src={LoadImgTwo} alt="" />
          </StyledImgContainer>
          <StyledHeaderSection>
            <StyledHeader>Results are coming in as we speak</StyledHeader>
          </StyledHeaderSection>
        </StyledTopSection>
      </LoadingPageContainer>
    );
  }

  return (
    <LoadingPageContainer>
      <StyledLoadingBar>
        <StyledLoadingFiller fraction={fraction} />
      </StyledLoadingBar>
      <StyledTopSection>
        <StyledImgContainer>
          <img src={LoadImgThree} alt="" />
        </StyledImgContainer>
        <StyledHeaderSection>
          <StyledHeader>
            Find word associated with your search in a few minutes
          </StyledHeader>
        </StyledHeaderSection>
      </StyledTopSection>
    </LoadingPageContainer>
  );
};

export default LoadingPage;
