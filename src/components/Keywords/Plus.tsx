import React from 'react';

interface PlusProps {
  color: string;
  hover: boolean;
}

const Plus = ({ color, hover }: PlusProps) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="5"
        x2="9"
        y2="5"
        stroke={hover ? 'white' : '#3E5372'}
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="5"
        y1="9"
        x2="5"
        y2="1"
        stroke={hover ? 'white' : '#3E5372'}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Plus;
