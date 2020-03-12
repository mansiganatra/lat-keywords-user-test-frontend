import React from 'react';
import SearchBar from '../SearchBar';

const LandingPage = ({ getKeywords, size, startSearch }) => {
  return (
    <>
      <div className="header-message">
        <div className="header">
          <h1>Search Keywords And Find Related Words From The Document Set</h1>
        </div>
        <div className="subheader">
          <p>Try searching keywords like “politics” or “money.”</p>
        </div>
      </div>
      <SearchBar
        getKeywords={getKeywords}
        size={size}
        startSearch={startSearch}
      />
    </>
  );
};

export default LandingPage;
