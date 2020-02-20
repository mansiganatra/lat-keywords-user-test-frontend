import React from 'react';
import styled from 'styled-components';

const CrossButton = ({ removeHandler }) => (
  <Button onClick={removeHandler}>X</Button>
);

const Button = styled.button`
  padding: 10px;
  background-color: white;
  border: 1px solid black;
  color: black;
  cursor: pointer;
`;

export default CrossButton;
