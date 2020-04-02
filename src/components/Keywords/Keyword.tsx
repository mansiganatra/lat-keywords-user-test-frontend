import React from 'react';
import styled from 'styled-components';

import plus from '../../lib/images/plus.png';
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
}
//setKeywordRef
const Keyword = ({
  word,
  setKeywordRef,
  color,
  handleTokenSelect,
  selectedToken,
  searchedId,
  tokenId
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
          <StyledFreq
            color={color}
            selected={selectedToken === token && tokenId === searchedId}
          >
            {count}
          </StyledFreq>
          <StyledFreq
            color={color}
            selected={selectedToken === token && tokenId === searchedId}
          >
            {`${(similarity / 1).toFixed(2)}%`.slice(2)}
          </StyledFreq>
        </StyledKWItem>
      </StyledKWButton>
      {selectedToken === token && tokenId === searchedId && (
        <StyledPlus color={color} onClick={e => handleNewClick(e, token)}>
          <Plus color={color} />
        </StyledPlus>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyledKWButton = styled.button<{ selected: boolean; color: string }>`
  cursor: pointer;
  width: 100%;
  border: none;

  background: ${({ selected, color }) =>
    selected ? `${color}30` : '#F3F5F8;'};
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
`;
const StyledFreq = styled(StyledText)<{ color: string; selected: boolean }>`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-align: center;

  color: ${({ color, selected }) =>
    selected ? color : 'rgba(23, 45, 59, 0.5)'};
`;
const StyledKWItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  padding: 0 13px;
  border: none;
`;

const StyledPlus = styled.button<{ color: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ color }): string => color};

  background: #fafafb;
  box-shadow: 0px 4px 20px rgba(23, 45, 59, 0.2);

  right: -35px;
  top: 1px;
`;

export default Keyword;
