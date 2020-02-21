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
      <BottomContent>
        {result.models.map(model => (
          <Model key={model.id} model={model} removeKey={removeKey} />
        ))}
      </BottomContent>
    </Container>
  );
};

const Container = styled.div``;
const BottomContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SearchResultView;
