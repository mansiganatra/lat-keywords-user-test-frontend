import React from 'react';
import ModelList from '../Models/ModelList';

const SearchShowBot = ({ docset }) => (
  <div className="search-show-bot">
    <ModelList models={docset.models} />
  </div>
);

export default SearchShowBot;
