import React, { useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Keyword = ({ word }) => {
  // const { keywordMode } = useContext(searchContext);

  const handleClick = e => {
    e.stopPropagation();
    // keywordMode.current = true;
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: `${word[0]}` }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <CopyToClipboard text={word[0]}>
      <StyledKWButton onClick={handleClick}>
        <StyledKWItem>
          <StyledText>{word[0]}</StyledText>
          <StyledFreq>{word[1]}</StyledFreq>
        </StyledKWItem>
      </StyledKWButton>
    </CopyToClipboard>
  );
};

const StyledText = styled.p`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-transform: capitalize;
`;
const StyledFreq = styled(StyledText)`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
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
const StyledKWButton = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;

  background: rgba(244, 244, 244, 0.75);
  border-radius: 21px;
  margin-bottom: 7px;
`;

export default Keyword;
