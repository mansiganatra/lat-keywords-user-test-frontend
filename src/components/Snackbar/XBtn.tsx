import React from 'react';

const XBtn = (): JSX.Element => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#FE3030" />
      <line
        x1="0.5"
        y1="-0.5"
        x2="6.85919"
        y2="-0.5"
        transform="matrix(0.68497 0.728571 -0.68497 0.728571 6 7)"
        stroke="white"
        strokeLinecap="round"
      />
      <line
        x1="0.5"
        y1="-0.5"
        x2="6.85919"
        y2="-0.5"
        transform="matrix(-0.68497 0.728571 0.68497 0.728571 11.833 7)"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default XBtn;
