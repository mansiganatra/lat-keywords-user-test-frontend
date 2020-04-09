import React, { useState } from 'react';
import styled from 'styled-components';

import { SimilarToken } from '../../types';
import Plus from './Plus';

interface Props {
  word: SimilarToken;
  setKeywordRef: (bool: boolean) => void;
  color: string;
  handleTokenSelect: (token: string, id: number) => void;
  selectedToken: string | null;
  searchedId: number;
  tokenId: number | null;
  handleHoverEnable: () => void;
  handleHoverDisable: () => void;
  hover: boolean;
}
//setKeywordRef
const Keyword = ({
  word,
  setKeywordRef,
  color,
  handleTokenSelect,
  selectedToken,
  searchedId,
  tokenId,
  handleHoverEnable,
  handleHoverDisable,
  hover
}: Props): JSX.Element => {
  const { count, token, similarity } = word;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    token: string
  ) => {
    e.stopPropagation();
    setKeywordRef(true); // COMMENT TO ENABLE NEW SEARCH ON CLICK
    handleTokenSelect(token, searchedId);
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: `${token}` }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  const handleNewClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    token: string
  ): Promise<void> => {
    e.stopPropagation();
    try {
      handleTokenSelect(token, searchedId);
      const message = {
        call: 'setDocumentListParams', // call
        args: [{ q: '' }] // arguments
      };
      window.parent.postMessage(message, '*');
      const otherMessage = {
        call: 'setDocumentListParams', // call
        args: [{ q: `${token}` }] // arguments
      };
      window.parent.postMessage(otherMessage, '*');
    } catch (error) {}
  };

  return (
    <StyledContainer>
      <StyledKWButton
        onClick={e => handleClick(e, token)}
        selected={selectedToken === token && tokenId === searchedId}
        color={color}
      >
        <StyledKWItem>
          <StyledText>{token}</StyledText>
          <StyledStatsContent>
            <StyledSimilarity
              color={color}
              selected={selectedToken === token && tokenId === searchedId}
            >
              {`${(similarity / 1).toFixed(2)}%`.slice(2)}
            </StyledSimilarity>
            <StyledFreq
              color={color}
              selected={selectedToken === token && tokenId === searchedId}
            >
              {count}
            </StyledFreq>
          </StyledStatsContent>
        </StyledKWItem>
      </StyledKWButton>
      {selectedToken === token && tokenId === searchedId && (
        <StyledPlusContainer>
          <StyledPlus
            color={color}
            onClick={e => handleNewClick(e, token)}
            onMouseEnter={handleHoverEnable}
            onMouseLeave={handleHoverDisable}
            hover={hover}
          >
            <Plus color={color} hover={hover} />
          </StyledPlus>
        </StyledPlusContainer>
      )}
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
const StyledKWButton = styled.button<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  border: none;

  background: ${({ selected }) => (selected ? '#286FD815' : '#F3F5F8;')};
  border-radius: 21px;
  margin-bottom: 7px;
`;

const StyledText = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-transform: capitalize;

  padding-right: 8px;
  z-index: 1;
`;
const StyledFreq = styled(StyledText)<{ selected: boolean }>`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-align: center;
  padding-right: 0px;

  color: ${({ selected }) => (selected ? '#286FD8' : 'rgba(23, 45, 59, 0.5)')};
`;
const StyledSimilarity = styled(StyledFreq)`
  padding-right: 8px;
`;
const StyledKWItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  padding: 0 8px;
  border: none;
`;

const StyledPlus = styled.button<{ color: string; hover: boolean }>`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(160, 175, 199, 0.5);

  background: ${({ hover, color }) => (hover ? '#286FD8' : '#fafafb')};
`;

const StyledPlusContainer = styled.div`
  top: 0px;
  position: absolute;

  height: 32px;
  width: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 21px;
  border-bottom-right-radius: 21px;
  animation-name: slidein;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  z-index: 0;

  @keyframes slidein {
    from {
      right: -20px;
      background: transparent;
    }
    to {
      right: -27px;
      background: #edf3fc;
    }
  }
`;

export default Keyword;
