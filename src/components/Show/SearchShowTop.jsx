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
      const message = {
        call: 'setDocumentListParams', // call
        args: [{ q: '' }] // arguments
      };
      window.parent.postMessage(message, '*'); // postMessage() with message and origin
      setClear(false);
    }
  }, [clear, setClear, clearAll]);
  return (
    <section className="search-show-top">
      <div className="search-show-header-container">
        <ShowTopHeader />
      </div>
      <div className="search-show-tags-container">
        <div className="show-tags-top">
          <h2>YOU’VE SEARCHED:</h2>
          <button className="clear-history" onClick={handleClearConfirm}>
            <p>CLEAR ALL</p>{' '}
          </button>
        </div>
        <div className="tag-history">
          <ShowTopTagList />
        </div>
      </div>
    </section>
  );
};

export default SearchShowTop;
