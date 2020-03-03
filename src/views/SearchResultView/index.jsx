import React from 'react';
import ModelList from '../../components/ModelList';
import SearchBar from '../../components/SearchBar';

import './SearchResultView.css';

const SearchResultView = ({
  docset,
  match,
  removeKey,
  getKeywords,
  deleteModel
}) => {
  const result = docset.find(
    item => match.params.docset.split('=')[1] === item.name
  );

  if (!result) return <p>No Docsets Available</p>;

  console.log(result);
  return (
    <div className="container">
      <div className="searchbar-container">
        <SearchBar getKeywords={getKeywords} />
      </div>
      <div className="message">
        {result.msg.length > 0 && <h1>{result.msg}</h1>}
        {result.alt_arr.length > 0 &&
          result.alt_arr.map(item => <p key={item}>{item}</p>)}
      </div>

      <ModelList
        models={result.models}
        removeKey={removeKey}
        getKeywords={getKeywords}
        deleteModel={deleteModel}
      />
    </div>
  );
};

export default SearchResultView;
