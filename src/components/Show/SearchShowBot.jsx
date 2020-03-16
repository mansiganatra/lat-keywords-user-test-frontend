import React from 'react';
import ModelList from '../Models/ModelList';

const SearchShowBot = ({ docset }) => (
  <div className="search-show-bot">
    <div className="result-header">KEYWORDS ASSOCIATED WITH:</div>
    <ModelList models={docset.models} />
  </div>
);

export default SearchShowBot;
