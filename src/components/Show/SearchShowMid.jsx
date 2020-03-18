import React, { useContext } from 'react';

import searchImg from '../../lib/search.png';
import arrowDown from '../../lib/arrow-down.png';
import searchContext from '../../store/searchContext';

const SearchShowMid = () => {
  const { setSortBy } = useContext(searchContext);

  const handleChange = e => {
    setSortBy(e.target.value);
  };

  return (
    <section className="result-header">
      <div className="result-header-left">
        WORDS ASSOCIATED WITH:
        <img src={searchImg} alt="search" />
      </div>
      <div className="result-header-right">
        <label htmlFor="sort">SORT BY</label>
        <form>
          <select name="sort" id="sort" onChange={handleChange}>
            <option value="relevance">Relevance</option>
            <option value="freq">Frequency</option>
          </select>
          <div>
            <img src={arrowDown} alt="arrow-down" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchShowMid;
