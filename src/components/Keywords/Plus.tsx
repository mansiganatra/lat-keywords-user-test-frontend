import React from 'react';

interface PlusProps {
  color: string;
  hover: boolean;
}

const Plus = ({ color, hover }: PlusProps) => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="3.8"
        x2="7"
        y2="3.8"
        stroke={hover ? 'white' : '#3E5372'}
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="3.80005"
        y1="7"
        x2="3.80005"
        y2="1"
        stroke={hover ? 'white' : '#3E5372'}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Plus;
