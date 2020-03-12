import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Show.css';
import SearchBar from '../../components/SearchBar';
import Slider from '../../components/Slider';
import xImage from '../../lib/x.png';
import seeMoreArror from '../../lib/see_more_arrow.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Show = ({ searched, getKeywords, startSearch, docset }) => {
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
                <div className="history-list">
                  {docset.search_history.length > 0 &&
                    docset.search_history.map(item => (
                      <div className="history">
                        TRUMP
                        <img src={xImage} alt="x" />
                      </div>
                    ))}
                </div>
                <div className="clear-history">CLEAR ALL</div>
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
          <div className="search-show-bot">
            <div className="result-header">KEYWORDS ASSOCIATED WITH:</div>
            <div className="model-list">
              <div className="result-model-container">
                <h1>“Money”</h1>
                <div className="result-list-container">
                  <div className="result-kw-heading list-item">
                    <div className="word">Word</div>
                    <div className="word-partner">No. of Mentions</div>
                  </div>
                  <div className="result-kw-list">
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                  </div>
                  <div className="see-more-container">
                    <div className="content">
                      <p>SEE MORE</p>
                      <img src={seeMoreArror} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="result-model-container">
                <h1>“Money”</h1>
                <div className="result-list-container">
                  <div className="result-kw-heading list-item">
                    <div className="word">Word</div>
                    <div className="word-partner">No. of Mentions</div>
                  </div>
                  <div className="result-kw-list">
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                  </div>
                  <div className="see-more-container">
                    <div className="content">
                      <p>SEE MORE</p>
                      <img src={seeMoreArror} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="result-model-container">
                <h1>“Money”</h1>
                <div className="result-list-container">
                  <div className="result-kw-heading list-item">
                    <div className="word">Word</div>
                    <div className="word-partner">No. of Mentions</div>
                  </div>
                  <div className="result-kw-list">
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                  </div>
                  <div className="see-more-container">
                    <div className="content">
                      <p>SEE MORE</p>
                      <img src={seeMoreArror} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="result-model-container">
                <h1>“Money”</h1>
                <div className="result-list-container">
                  <div className="result-kw-heading list-item">
                    <div className="word">Word</div>
                    <div className="word-partner">No. of Mentions</div>
                  </div>
                  <div className="result-kw-list">
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                  </div>
                  <div className="see-more-container">
                    <div className="content">
                      <p>SEE MORE</p>
                      <img src={seeMoreArror} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="result-model-container">
                <h1>“Money”</h1>
                <div className="result-list-container">
                  <div className="result-kw-heading list-item">
                    <div className="word">Word</div>
                    <div className="word-partner">No. of Mentions</div>
                  </div>
                  <div className="result-kw-list">
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                  </div>
                  <div className="see-more-container">
                    <div className="content">
                      <p>SEE MORE</p>
                      <img src={seeMoreArror} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="result-model-container">
                <h1>“Money”</h1>
                <div className="result-list-container">
                  <div className="result-kw-heading list-item">
                    <div className="word">Word</div>
                    <div className="word-partner">No. of Mentions</div>
                  </div>
                  <div className="result-kw-list">
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                    <div className="result-kw-item list-item">
                      <div className="text">Donald</div>
                      <div className="freq">150</div>
                    </div>
                  </div>
                  <div className="see-more-container">
                    <div className="content">
                      <p>SEE MORE</p>
                      <img src={seeMoreArror} alt="arrow" />
                    </div>
                  </div>
                </div>
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
