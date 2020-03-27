import React from 'react';
import styled from 'styled-components';

interface SuggestionItemProps {
  suggested: string;
}

const SuggestionItem = ({ suggested }: SuggestionItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // setKeywordRef(true); // COMMENT TO ENABLE NEW SEARCH ON CLICK
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: `${suggested}` }] // arguments
    };
    window.parent.postMessage(message, '*');
  };

  return (
    <StyledSuggestionItem onClick={handleClick}>
      <p>{suggested}</p>
    </StyledSuggestionItem>
  );
};

const StyledSuggestionItem = styled.button`
  border: 1px solid #a0afc7;
  box-sizing: border-box;
  border-radius: 18px;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #1e2229;
  width: 100%;

  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #a0afc7;

    p {
      color: #1e2229;
    }
  }

  &:active {
    background-color: #1e2229;
    p {
      color: #a0afc7;
    }
  }

  p {
    font-family: 'Archivo';
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 125%;
    /* or 12px */

    text-align: center;
    text-transform: capitalize;

    color: #a0afc7;

    width: 100%;
    min-width: 45px;
  }
`;

export default SuggestionItem;
