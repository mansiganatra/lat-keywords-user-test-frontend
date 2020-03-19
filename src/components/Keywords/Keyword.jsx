import React, { useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';

const Keyword = ({ word }) => {
  const { keywordMode } = useContext(searchContext);

  const handleClick = e => {
    keywordMode.current = true;
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: word[0] }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <>
      <StyledKWButton onClick={handleClick}>
        <StyledKWItem>
          <StyledText>{word[0]}</StyledText>
          <StyledFreq>{word[1]}</StyledFreq>
        </StyledKWItem>
      </StyledKWButton>
      <StyledHR />
    </>
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
  text-align: center;

  color: #747474;
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
  width: 100%;
  border: none;
`;
const StyledHR = styled.hr`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 0 12px;
`;

export default Keyword;
