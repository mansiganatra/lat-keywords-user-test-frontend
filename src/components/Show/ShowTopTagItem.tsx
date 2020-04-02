import React from 'react';
import styled from 'styled-components';

import xImage from '../../lib/images/x.png';
import xAltImage from '../../lib/images/x_alt.png';
import { SearchHistory } from '../../types';

interface Props {
  tag: SearchHistory;
  color: string;
  selectModel: (id: number | null) => void;
  deleteModel: (modelId: number) => void;
  selectedId: number | null;
  setKeywordRef: (bool: boolean) => void;
}

const ShowTopTagItem = ({
  tag,
  color,
  deleteModel,
  selectModel,
  selectedId,
  setKeywordRef
}: Props): JSX.Element => {
  const { id, term } = tag;

  const handleSelectModel = (tagId: number): void => {
    let message;
    setKeywordRef(true);

    if (selectedId === tagId) {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `` }] // arguments
      };
      selectModel(null);
    } else {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `${term}` }] // arguments
      };
      selectModel(tagId);
    }

    window.parent.postMessage(message, '*');
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    tagId: number
  ): void => {
    e.stopPropagation();
    deleteModel!(tagId);
  };

  return (
    <StyledHistoryItem
      color={color}
      selected={selectedId === id}
      onClick={() => handleSelectModel(id)}
    >
      <p>{term}</p>
      <StyleRemoveBtn
        color={color}
        selected={selectedId === id}
        onClick={e => handleDelete(e, id)}
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

const StyledHistoryItem = styled.button<{ selected: boolean; color: string }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  background-color: ${({ selected, color }): string =>
    selected ? `${color}30` : '#ffffff'};
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
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 11px;
    text-align: center;
    letter-spacing: 0.08em;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.02);
  }
`;
const StyleRemoveBtn = styled.button<{ selected: boolean; color: string }>`
  border: 0;
  background-color: ${({ selected, color }): string =>
    selected ? `transparent` : '#ffffff'};
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
