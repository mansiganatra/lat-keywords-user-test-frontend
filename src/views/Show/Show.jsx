import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Show.css';
import SearchBar from '../../components/SearchBar';
import Slider from '../../components/Slider';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Show = ({ searched, getKeywords, startSearch }) => {
  let query = useQuery();
  let apiToken = query.get('apiToken');
  let server = query.get('server');
  let origin = query.get('origin');
  let documentSetId = query.get('documentSetId');
  let [search, setSearch] = useState(null);

  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.event === 'notify:documentListParams') {
        const term = e.data.args[0].q;
        setSearch(term);
      }
    });

    return () =>
      window.removeEventListener('message', () => {
        console.log('done');
      });
  });

  const [size, setSize] = useState(15);

  const handleResize = num => {
    setSize(num);
  };

  return (
    <div className="show-container">
      {searched ? (
        <>
          <div className="search-show-top">
            <div className="searchbar-container">
              <SearchBar
                getKeywords={getKeywords}
                size={15}
                startSearch={startSearch}
              />
              <div className="search-history">
                <div className="history">TRUMP</div>
                <div className="clear-history">CLEAR</div>
              </div>
            </div>
            <div className="search-keyword-range">
              <div className="range-left">
                <h2>How many word associations would you like to find?</h2>
                <div className="slider-container">
                  <Slider handleResize={handleResize} size={size} />
                </div>
              </div>
              <div className="range-right">
                <div>{size}</div>
                <h2>Keyword List Size</h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="header-message">
            <div className="header">
              <h1>
                Search Keywords And Find Related Words From The Document Set
              </h1>
            </div>
            <div className="subheader">
              <p>Try searching keywords like “politics” or “money.”</p>
            </div>
          </div>
          <SearchBar
            getKeywords={getKeywords}
            size={15}
            startSearch={startSearch}
          />
        </>
      )}
    </div>
  );
};

export default Show;
