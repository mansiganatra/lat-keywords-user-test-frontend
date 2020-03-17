import React from 'react';

import searchImg from '../../lib/search.png';

const SearchShowMid = () => {
  return (
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
  );
};

export default SearchShowMid;
