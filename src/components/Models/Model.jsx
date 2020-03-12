import React, { useState } from 'react';
import seeMoreArror from '../../lib/see_more_arrow.png';
import KeywordList from '../Keywords/KeywordList';

const Model = ({ model }) => {
  const { kw, score, id, deleted_kw, search_term, deleted } = model;
  const [hover, setHover] = useState(false);

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
      <div className="model-header-container">
        <h1>“{search_term}”</h1>
        <div className={`delete ${hover ? 'hover' : ''}`}>-</div>
      </div>
      <div className="result-list-container">
        <div className="result-kw-heading list-item">
          <div className="word">Word</div>
          <div className="word-partner">No. of Mentions</div>
        </div>
        <div className="result-kw-list">
          <KeywordList kw={kw} />
        </div>
        <div className="see-more-container">
          <div className="content">
            <p>SEE MORE</p>
            <img src={seeMoreArror} alt="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
