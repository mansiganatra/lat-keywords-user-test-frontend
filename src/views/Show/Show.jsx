import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModelList from '../../components/Models/ModelList';

import DownloadBtn from '../../components/DownloadBtn';

import './Show.css';
import SearchBar from '../../components/SearchBar';
import Slider from '../../components/Slider';
import xImage from '../../lib/x.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Show = ({ searched, getKeywords, startSearch, docset, saveToFile }) => {
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
  console.log(docset);
  return (
    <div className="show-container">
      {searched ? (
        <>
          <div className="search-show-top">
            <div className="searchbar-container">
              <SearchBar
                getKeywords={getKeywords}
                size={size}
                startSearch={startSearch}
              />
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
          <div className="search-show-bot">
            <div className="result-header">KEYWORDS ASSOCIATED WITH:</div>
            <ModelList models={docset.models} />
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
            size={size}
            startSearch={startSearch}
          />
        </>
      )}
    </div>
  );
};

export default Show;
