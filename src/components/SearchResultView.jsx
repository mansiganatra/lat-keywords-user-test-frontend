import React from 'react';
import styled from 'styled-components';
import Model from './Model';
import SearchBar from './SearchBar';

const SearchResultView = ({
  docset,
  match,
  removeKey,
  saveToFile,
  getKeywords
}) => {
  const result = docset.find(
    item => match.params.docset.split('=')[1] === item.name
  );

  if (!result) return <p>No Docsets Available</p>;

  return (
    <Container>
      <SearchBar getKeywords={getKeywords} />
      <Button onClick={saveToFile}>Download JSON</Button>
      <BottomContent>
        {result.models.map(model => (
          <Model key={model.id} model={model} removeKey={removeKey} />
        ))}
      </BottomContent>
    </Container>
  );
};

const Container = styled.div``;
const Button = styled.button`
  height: 50px;
  width: 70px;
  cursor: pointer;
`;
const BottomContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SearchResultView;
