import React, { useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';

import xImage from '../../lib/x.png';
import xAltImage from '../../lib/x_alt.png';

const ShowTopTagItem = ({ tag, selectedId, handleSortModel }) => {
  const { deleteModel } = useContext(searchContext);
  const { tag_id, term } = tag;

  return (
    <StyledHistoryItem
      selected={selectedId === tag_id}
      onClick={() => handleSortModel(tag_id, term)}
    >
      {term}
      <StyleRemoveBtn
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

  background: ${({ selected }) => (selected ? '#172d3b' : '#ffffff')};
  border: 1px solid rgba(182, 192, 198, 0.6);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.02);
  border-radius: 3px;
  width: 86px;
  padding: 0 10px;
  height: 24px;

  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
  line-height: 11px;
  text-align: center;
  letter-spacing: 0.08em;

  color: ${({ selected }) => (selected ? '#ffffff' : '#172d3b')};
  margin-right: 10px;
  margin-bottom: 3px;
  text-transform: capitalize;
`;
const StyleRemoveBtn = styled.button`
  border: 0;
  background-color: ${({ selected }) => (selected ? '#172d3b' : '#ffffff')};
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
