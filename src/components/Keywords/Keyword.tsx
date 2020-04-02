import React from 'react';
import styled from 'styled-components';

import { SimilarToken } from '../../types';

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
  const { count, token } = word; //similarity

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

  return (
    <StyledKWButton
      onClick={e => handleClick(e, token)}
      selected={selectedToken === token && tokenId === searchedId}
      color={color}
    >
      <StyledKWItem>
        <StyledText>{token}</StyledText>
        <StyledFreq>{count}</StyledFreq>
      </StyledKWItem>
    </StyledKWButton>
  );
};

const StyledKWButton = styled.button<{ selected: boolean; color: string }>`
  cursor: pointer;
  width: 100%;
  border: none;

  background: ${({ selected, color }) =>
    selected ? `${color}30` : 'rgba(244, 244, 244, 0.75)'};
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
const StyledFreq = styled(StyledText)`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 15px;
  text-align: center;

  color: rgba(23, 45, 59, 0.5);
`;
const StyledKWItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 44px;
  align-items: center;
  padding: 0 13px;
  border: none;
`;

export default Keyword;
