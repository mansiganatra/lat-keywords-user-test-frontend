import React from 'react';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';
import searchImg from '../../lib/search.png';

const SearchTopResult = ({ clearAll, docset, sortModels, deleteModel }) => (
  <>
    <SearchShowTop
      docset={docset}
      clearAll={clearAll}
      sortModels={sortModels}
      deleteModel={deleteModel}
    />
    <div className="result-header">
      <div className="result-header-left">
        WORDS ASSOCIATED WITH:
        <img src={searchImg} alt="search" />
      </div>
      <div className="result-header-right">
        <div>SORT BY</div>
        <input type="text" />
      </div>
    </div>
    <SearchShowBot docset={docset} deleteModel={deleteModel} />
  </>
);

export default SearchTopResult;
