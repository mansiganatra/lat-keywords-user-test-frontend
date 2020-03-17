import React, { useState, useEffect } from 'react';

import xImage from '../../lib/x.png';
import Header from './Header';

const SearchShowTop = ({ docset, clearAll }) => {
  const [clear, setClear] = useState(false);
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
  }, [clear, setClear]);
  return (
    <div className="search-show-top">
      <div className="search-show-header-container">
        <Header />
      </div>
      <div className="search-show-tags-container">
        <div className="show-tags-top">
          <h2>YOU’VE SEARCHED:</h2>
          <div className="clear-history" onClick={handleClearConfirm}>
            <p>CLEAR ALL</p>{' '}
          </div>
        </div>
        <div className="tag-history">
          <div className="history-list">
            {docset.search_history.map((item, i) => (
              <div className="history" key={i}>
                {item}
                <img src={xImage} alt="x" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchShowTop;
