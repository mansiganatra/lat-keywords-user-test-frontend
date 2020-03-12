import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import searchImage from '../../lib/search.png';

import './Show.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Show = ({ searched }) => {
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

  return (
    <>
      {searched ? (
        <div className="searched-container">
          {/* <SearchTopSection />
          <SearchBottomResult /> */}
        </div>
      ) : (
        <div className="show-container">
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
          <form className="searchbar">
            <img src={searchImage} alt="search" />
            <input type="text" placeholder="Search keyword from document set" />
          </form>
        </div>
      )}
    </>
  );
};

export default Show;
