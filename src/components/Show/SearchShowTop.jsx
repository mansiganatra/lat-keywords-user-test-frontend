import React, { useState, useEffect, useContext } from 'react';
import searchContext from '../../store/searchContext';

import ShowTopHeader from './ShowTopHeader';
import ShowTopTagList from './ShowTopTagList';

const SearchShowTop = () => {
  const [clear, setClear] = useState(false);
  const { clearAll } = useContext(searchContext);

  const handleClearConfirm = () => {
    const clearData = window.confirm(
      'Do you really want to clear all tags and results?'
    );
    setClear(clearData);
  };

  useEffect(() => {
    if (clear) {
      clearAll();
      setClear(false);
    }
  }, [clear, setClear, clearAll]);
  return (
    <div className="search-show-top">
      <div className="search-show-header-container">
        <ShowTopHeader />
      </div>
      <div className="search-show-tags-container">
        <div className="show-tags-top">
          <h2>YOU’VE SEARCHED:</h2>
          <div className="clear-history" onClick={handleClearConfirm}>
            <p>CLEAR ALL</p>{' '}
          </div>
        </div>
        <div className="tag-history">
          <ShowTopTagList />
        </div>
      </div>
    </div>
  );
};

export default SearchShowTop;
