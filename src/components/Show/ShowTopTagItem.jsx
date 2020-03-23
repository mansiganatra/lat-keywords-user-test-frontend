import React, { useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';

import xImage from '../../lib/x.png';
import xAltImage from '../../lib/x_alt.png';

const ShowTopTagItem = ({ tag, color }) => {
  const { deleteModel, selectedId, selectModel, keywordMode } = useContext(
    searchContext
  );
  const { id, token } = tag;

  const handleSelectModel = () => {
    let message;
    keywordMode.current = true;

    if (selectedId === id) {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `` }] // arguments
      };
      selectModel(null);
    } else {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `${token}` }] // arguments
      };
      selectModel(id);
    }

    window.parent.postMessage(message, '*');
  };

  const handleDelete = e => {
    e.stopPropagation();
    deleteModel(id);
  };

  return (
    <StyledHistoryItem
      color={color}
      selected={selectedId === id}
      onClick={() => handleSelectModel(id)}
    >
      <p>{token}</p>
      <StyleRemoveBtn
        color={color}
        selected={selectedId === id}
        onClick={handleDelete}
      >
        {selectedId === id ? (
          <img src={xAltImage} alt="x" />
        ) : (
          <img src={xImage} alt="x" />
        )}
      </StyleRemoveBtn>
    </StyledHistoryItem>
  );
};

const StyledHistoryItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ selected, color }) => (selected ? color : '#ffffff')};
  border: 1px solid rgba(182, 192, 198, 0.6);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.02);
  border-radius: 3px;
  min-width: 86px;
  padding: 0 10px;
  height: 24px;

  color: ${({ selected }) => (selected ? '#ffffff' : '#172D3B')};
  margin-right: 10px;
  margin-bottom: 3px;

  p {
    text-transform: capitalize;
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: bold;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    letter-spacing: 0.08em;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.02);
  }
`;
const StyleRemoveBtn = styled.button`
  border: 0;
  background-color: ${({ selected, color }) => (selected ? color : '#ffffff')};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);

  img {
    transform: scale(1.2);
  }
  &:hover {
    transform: scale(1);
  }
`;

export default ShowTopTagItem;
