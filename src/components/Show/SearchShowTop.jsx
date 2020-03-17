import React, { useState, useEffect } from 'react';

import xImage from '../../lib/x.png';
import Header from './Header';

const SearchShowTop = ({ docset, clearAll, sortModels }) => {
  const [clear, setClear] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClearConfirm = () => {
    const clearData = window.confirm(
      'Do you really want to clear all tags and results?'
    );
    setClear(clearData);
  };

  const handleSortModel = (id, term) => {
    setSelectedId(id);
    sortModels(id, term);
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
            {docset.search_history.map(tag => (
              <div
                className={`history ${selectedId === tag.tag_id && 'selected'}`}
                key={tag.tag_id}
                onClick={() => handleSortModel(tag.tag_id, tag.term)}
              >
                {tag.term}
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
