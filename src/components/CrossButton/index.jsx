import React from 'react';

import './CrossButton.css';

const CrossButton = ({ removeHandler }) => (
  <button className="cross-btn" onClick={removeHandler}>
    X
  </button>
);

export default CrossButton;
