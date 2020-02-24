import React from 'react';
import ModelList from '../../components/ModelList';
import SearchBar from '../../components/SearchBar';

import './SearchResultView.css';

const SearchResultView = ({ docset, match, removeKey, getKeywords }) => {
  const result = docset.find(
    item => match.params.docset.split('=')[1] === item.name
  );

  if (!result) return <p>No Docsets Available</p>;

  return (
    <div className="container">
      <div className="searchbar-container">
        <SearchBar getKeywords={getKeywords} />
      </div>

      <ModelList
        models={result.models}
        removeKey={removeKey}
        getKeywords={getKeywords}
      />
    </div>
  );
};

export default SearchResultView;
