import React from 'react';
import ModelList from '../components/ModelList';
import SearchBar from '../components/SearchBar';

const SearchResultView = ({ docset, match, removeKey, getKeywords }) => {
  const result = docset.find(
    item => match.params.docset.split('=')[1] === item.name
  );

  if (!result) return <p>No Docsets Available</p>;

  return (
    <div>
      <SearchBar getKeywords={getKeywords} />
      <ModelList
        models={result.models}
        removeKey={removeKey}
        getKeywords={getKeywords}
      />
    </div>
  );
};

export default SearchResultView;
