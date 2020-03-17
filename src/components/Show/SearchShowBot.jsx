import React, { useContext } from 'react';
import searchContext from '../../store/searchContext';
import ModelList from '../Models/ModelList';

const SearchShowBot = () => {
  const { docset } = useContext(searchContext);
  return (
    <div className="search-show-bot">
      <ModelList models={docset.models} />
    </div>
  );
};

export default SearchShowBot;
