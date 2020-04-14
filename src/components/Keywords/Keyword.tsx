import React from 'react';
import styled from 'styled-components';

import { SimilarToken } from '../../types';
import Plus from './Plus';

interface Props {
  word: SimilarToken;
  setKeywordRef: (bool: boolean) => void;
  color: string;
  handleTokenSelect: (token: string | null, id: number | null) => void;
  selectedToken: string | null;
  searchedId: number;
  tokenId: number | null;
  handleHighlightedEnable: ({
    color,
    term
  }: {
    color: string;
    term: string;
  }) => void;
  handleHighlightedDisable: () => void;
  hover: boolean;
  nextColor: string;
  handleHover: () => void;
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
  handleHighlightedEnable,
  handleHighlightedDisable,
  hover,
  nextColor,
  handleHover
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

    handleHighlightedEnable({ color: nextColor, term: token });
  };

  const handleNewClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    token: string
  ): Promise<void> => {
    e.stopPropagation();
    try {
      handleHover();
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
      handleTokenSelect(null, null);
      handleHighlightedDisable();
    } catch (error) {}
  };

  return (
    <StyledContainer>
      <StyledKWButton
        onClick={e => handleClick(e, token)}
        selected={selectedToken === token && tokenId === searchedId}
        color={nextColor}
      >
        <StyledKWItem>
          <StyledText>{token}</StyledText>
          <StyledStatsContent>
            <StyledSimilarity
              color={nextColor}
              selected={selectedToken === token && tokenId === searchedId}
            >
              {`${(similarity / 1).toFixed(2)}%`.slice(2)}
            </StyledSimilarity>
            <StyledFreq
              color={nextColor}
              selected={selectedToken === token && tokenId === searchedId}
            >
              {count}
            </StyledFreq>
          </StyledStatsContent>
        </StyledKWItem>
      </StyledKWButton>
      {selectedToken === token && tokenId === searchedId && (
        <StyledPlusContainer color={nextColor}>
          <StyledPlus
            color={nextColor}
            onClick={e => handleNewClick(e, token)}
            hover={hover}
            onMouseLeave={handleHover}
            onMouseEnter={handleHover}
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
const StyledKWButton = styled.button<{ selected: boolean; color: string }>`
  cursor: pointer;
  width: 100%;
  border: none;

  background: ${({ selected, color }) =>
    selected ? `${color}15` : '#F3F5F8;'};
  border-radius: 21px;
  margin-bottom: 7px;

  border-bottom-right-radius: ${({ selected }) => (selected ? 0 : '21px')};
  border-top-right-radius: ${({ selected }) => (selected ? 0 : '21px')};
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
const StyledFreq = styled(StyledText)<{ selected: boolean; color: string }>`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-align: center;
  padding-right: 0px;

  color: ${({ selected, color }) =>
    selected ? color : 'rgba(23, 45, 59, 0.5)'};
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
  position: relative;
  right: 6px;

  border: 1px solid rgba(160, 175, 199, 0.5);

  background: ${({ hover, color }) => (hover ? '#286FD8' : '#fafafb')};
`;

const StyledPlusContainer = styled.div<{ color: string }>`
  top: 0px;
  position: absolute;

  height: 32px;
  width: 25px;
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
      right: -25px;
      background: ${({ color }) => `${color}15`};
    }
  }
`;

export default Keyword;
