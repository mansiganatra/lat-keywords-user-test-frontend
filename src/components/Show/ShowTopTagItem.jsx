import React, { useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';

import xImage from '../../lib/x.png';
import xAltImage from '../../lib/x_alt.png';

const ShowTopTagItem = ({ tag, color }) => {
  const { deleteModel, selectedId, selectModel } = useContext(searchContext);
  const { tag_id, term } = tag;

  const handleSelectModel = id => {
    selectModel(id);
  };

  return (
    <StyledHistoryItem
      color={color}
      selected={selectedId === tag_id}
      onClick={() => handleSelectModel(tag_id)}
    >
      <p>{term}</p>
      <StyleRemoveBtn
        color={color}
        selected={selectedId === tag_id}
        onClick={e => deleteModel(e, tag_id)}
      >
        {selectedId === tag_id ? (
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
  width: 86px;
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
