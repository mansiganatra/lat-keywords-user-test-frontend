import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CrossButton from './CrossButton';

const Word = ({ word, removeKey, index, modelId }) => {
  let { docset } = useParams();

  const removeHandler = () => {
    docset = docset.split('=')[1];
    removeKey(modelId, index, docset);
  };

  return (
    <Container>
      <p>{word}</p>
      <div>
        <CrossButton removeHandler={removeHandler} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px;

  &:hover {
    border-bottom: 1px solid black;
  }
`;

export default Word;
