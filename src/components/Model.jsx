import React from 'react';
import styled from 'styled-components';
import KeywordList from './KeywordList';

const Model = ({ model, removeKey }) => {
  const { mname, kw, score, id } = model;
  return (
    <Container>
      <Header>{mname}</Header>
      <KeywordContainer>
        <KeywordList kw={kw} removeKey={removeKey} modelId={id} />
      </KeywordContainer>
      <h2>score: {score}</h2>
    </Container>
  );
};

const Header = styled.h2`
  border-bottom: 1px solid black;
`;

const KeywordContainer = styled.div`
  border-bottom: 1px solid black;
  height: 150px;
  overflow: auto;
`;

const Container = styled.div`
  height: 300px;
  max-width: 250px;
  width: 100%;
  border: 1px solid black;
  margin: 0 5px 5px 5px;
  padding: 0 10px;
  background-color: white;
`;

export default Model;
