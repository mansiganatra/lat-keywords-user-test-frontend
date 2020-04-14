import React from 'react';
import styled from 'styled-components';

interface PreviewKeywordProps {
  count: number;
  similarity: number;
  token: string;
}

const PreviewKeyword = ({
  token,
  similarity,
  count
}: PreviewKeywordProps): JSX.Element => {
  return (
    <StyledContainer>
      <StyledKWButton>
        <StyledKWItem>
          <StyledText>{token}</StyledText>
          <StyledStatsContent>
            <StyledSimilarity>
              {`${(similarity / 1).toFixed(2)}%`.slice(2)}
            </StyledSimilarity>
            <StyledFreq>{count}</StyledFreq>
          </StyledStatsContent>
        </StyledKWItem>
      </StyledKWButton>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  position: relative;
`;
const StyledStatsContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 65px;
  width: 100%;
`;
const StyledText = styled.p`
  cursor: default;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-transform: capitalize;

  padding-right: 8px;
  z-index: 1;
  opacity: 0.4;
`;
const StyledFreq = styled(StyledText)`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-align: center;
  padding-right: 0px;

  color: rgba(23, 45, 59, 0.6);
`;

const StyledSimilarity = styled(StyledFreq)`
  padding-right: 8px;
`;
const StyledKWButton = styled.div`
  width: 100%;
  border: none;
  background: #f3f5f835;
  border-radius: 21px;
  margin-bottom: 7px;
  border-bottom-right-radius: 21px;
  border-top-right-radius: 21px;
`;

const StyledKWItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  padding: 0 8px;
  border: none;
`;

export default PreviewKeyword;
