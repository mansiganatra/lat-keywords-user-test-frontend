import React from 'react';
import styled from 'styled-components';
import { StyledButton } from './styles';

interface TagXProps {
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
}

const TagX = ({ handleDelete, selected }: TagXProps): JSX.Element => {
  return (
    <TagBtn onClick={handleDelete}>
      {selected ? (
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.707107"
            y1="1"
            x2="6.36396"
            y2="6.65685"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="0.5"
            y1="-0.5"
            x2="8.5"
            y2="-0.5"
            transform="matrix(-0.707107 0.707107 0.707107 0.707107 7.36426 1)"
            stroke="white"
            stroke-linecap="round"
          />
        </svg>
      ) : (
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.707107"
            y1="1"
            x2="6.36396"
            y2="6.65685"
            stroke="#172D3B"
            stroke-linecap="round"
          />
          <line
            x1="0.5"
            y1="-0.5"
            x2="8.5"
            y2="-0.5"
            transform="matrix(-0.707107 0.707107 0.707107 0.707107 7.36426 1)"
            stroke="#172D3B"
            stroke-linecap="round"
          />
        </svg>
      )}
    </TagBtn>
  );
};

const TagBtn = styled(StyledButton)`
  &:hover {
    transform: scale(1.3);
  }
`;

export default TagX;
