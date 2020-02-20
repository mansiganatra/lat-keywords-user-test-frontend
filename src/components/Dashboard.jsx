import React from 'react';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import ModelList from './ModelList';

const Dashboard = ({ getKeywords, removeKey, saveToFile, docset }) => (
  <Container>
    <SearchBar getKeywords={getKeywords} />
    <Button onClick={saveToFile}>Download JSON</Button>
    {docset.map((item, i) => (
      <ModelList key={i} models={item.models} removeKey={removeKey} />
    ))}
  </Container>
);

const Container = styled.div``;

const Button = styled.button`
  height: 50px;
  width: 70px;
  cursor: pointer;
`;

export default Dashboard;
