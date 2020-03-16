import React from 'react';

import DownloadBtn from '../DownloadBtn';
import xImage from '../../lib/x.png';

const SearchShowTop = ({ docset, saveToFile }) => (
  <div className="search-show-top">
    <div className="searchbar-container">
      <div className="search-history">
        <div className="history-list">
          {docset.search_history.map((item, i) => (
            <div className="history" key={i}>
              {item}
              <img src={xImage} alt="x" />
            </div>
          ))}
        </div>
        <div className="clear-history">CLEAR ALL</div>
      </div>
    </div>
    <div className="search-keyword-range">
      <div className="range-left">
        <h2>Suggestions</h2>
        {docset.msg.length > 0 && <p>{docset.msg}</p>}
        <div>
          {docset.alt_arr.length > 0 &&
            docset.alt_arr.map(item => <p key={item}>{item},</p>)}
        </div>
      </div>
      <div className="range-right">
        <DownloadBtn saveToFile={saveToFile} />
      </div>
    </div>
  </div>
);

export default SearchShowTop;
