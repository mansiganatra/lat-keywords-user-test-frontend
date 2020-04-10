import React from 'react';
import styled from 'styled-components';

import xImage from '../../lib/images/x.png';
import xAltImage from '../../lib/images/x_alt.png';
import { SearchHistory } from '../../types';
import TagX from './TagX';

interface Props {
  tag: SearchHistory;
  color: string;
  selectModel: (id: number | null, className?: string) => void;
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
      selectModel(null, '');
    } else {
      message = {
        call: 'setDocumentListParams', // call
        args: [{ q: `${term}` }] // arguments
      };
      selectModel(tagId, `.a${term}${tagId}`);
    }

    window.parent.postMessage(message, '*');
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    deleteModel!(id);
  };

  return (
    <StyledHistoryItem
      color={color}
      selected={selectedId === id}
      onClick={() => handleSelectModel(id)}
    >
      <p>{term}</p>
      <TagX handleDelete={handleDelete} selected={selectedId === id} />
    </StyledHistoryItem>
  );
};

const StyledHistoryItem = styled.div<{ selected: boolean; color: string }>`
  cursor: default;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ selected, color }): string =>
    selected ? color : '#ffffff'};
  border: 1px solid
    ${({ selected }): string =>
      selected ? 'rgba(23, 45, 59, 0.2)' : 'rgba(182, 192, 198, 0.6)'};
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.02);
  border-radius: 3px;
  min-width: 90px;
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

export default ShowTopTagItem;
