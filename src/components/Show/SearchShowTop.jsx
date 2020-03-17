import React from 'react';

import DownloadBtn from '../DownloadBtn';
import xImage from '../../lib/x.png';
import Header from './Header';

const SearchShowTop = ({ docset }) => (
  <div className="search-show-top">
    <div className="search-show-header-container">
      <Header />
    </div>
    <div className="search-show-tags-container">
      <div className="show-tags-top">
        <h2>YOU’VE SEARCHED:</h2>
        <div className="clear-history">
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

export default SearchShowTop;
