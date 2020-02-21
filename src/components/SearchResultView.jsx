import React from 'react';
import SearchBar from './SearchBar';
import ModelList from './ModelList';

const SearchResultView = ({ docset, match, removeKey, getKeywords }) => {
  const result = docset.find(
    item => match.params.docset.split('=')[1] === item.name
  );

  if (!result) return <p>No Docsets Available</p>;

  return (
    <div>
      <SearchBar getKeywords={getKeywords} />
      <ModelList models={result.models} removeKey={removeKey} />
    </div>
  );
};

export default SearchResultView;
