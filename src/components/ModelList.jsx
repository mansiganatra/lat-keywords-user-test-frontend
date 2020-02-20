import React from 'react';
import styled from 'styled-components';
import Model from './Model';

const ModelList = ({ models, removeKey }) => {
  if (!models || !models.length)
    return <NoModelsP>No current models</NoModelsP>;

  return (
    <Container>
      {models.map(model => (
        <Model key={model.id} model={model} removeKey={removeKey} />
      ))}
    </Container>
  );
};

const NoModelsP = styled.p`
  text-align: center;
`;

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default ModelList;
