import React, { useState, useContext } from 'react';
import searchContext from '../../store/searchContext';
import seeMoreArror from '../../lib/see_more_arrow.png';
import Keyword from '../Keywords/Keyword';
import xAlt from '../../lib/x_alt.png';

const Model = ({ model }) => {
  const { kw, search_term, id, sorted_kw } = model;
  const [hover, setHover] = useState(false);
  const { deleteModel, sortBy } = useContext(searchContext);

  const handleHoverEnable = () => {
    if (!hover) return setHover(true);
  };
  const handleHoverDisable = () => {
    if (hover) return setHover(false);
  };

  return (
    <div
      className="result-model-container"
      onMouseEnter={handleHoverEnable}
      onMouseLeave={handleHoverDisable}
    >
      <header className="model-header-container">
        <div className="top">
          <h1>{search_term}</h1>
          <button>
            <img src={xAlt} alt="x" onClick={e => deleteModel(e, id)} />
          </button>
        </div>
        <div className="bot">
          <div className="word">Word</div>
          <div className="word-partner">No. of Mentions</div>
        </div>
      </header>
      <div className="result-list-container">
        <div className="result-kw-list">
          {sortBy === 'relevance'
            ? kw.map((word, i) => <Keyword key={word} word={word} />)
            : sorted_kw.map((word, i) => <Keyword key={word} word={word} />)}
        </div>
        {/* <div className="see-more-container">
          <div className="content">
            <p>SEE MORE</p>
            <img src={seeMoreArror} alt="arrow" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Model;
