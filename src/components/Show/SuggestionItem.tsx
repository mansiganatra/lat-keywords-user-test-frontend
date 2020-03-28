import React from 'react';
import styled from 'styled-components';

interface SuggestionItemProps {
  suggested: string;
}

const handleClick = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
  e.stopPropagation();
  // setKeywordRef(true); // COMMENT TO ENABLE NEW SEARCH ON CLICK
  const message = {
    call: 'setDocumentListParams', // call
    args: [{ q: `${text}` }] // arguments
  };
  window.parent.postMessage(message, '*');
};

const SuggestionItem = ({ suggested }: SuggestionItemProps) => {
  return (
    <StyledSuggestionItem onClick={e => handleClick(e, suggested)}>
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
    font-family: 'Archivo', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
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
