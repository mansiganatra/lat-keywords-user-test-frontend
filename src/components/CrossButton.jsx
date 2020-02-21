import React from 'react';

import './CrossButton.css';

const CrossButton = ({ removeHandler }) => (
  <button onClick={removeHandler}>X</button>
);

export default CrossButton;
