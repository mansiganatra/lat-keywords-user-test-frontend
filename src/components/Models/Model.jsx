import React, { useState, useContext } from 'react';
import searchContext from '../../store/searchContext';
import seeMoreArror from '../../lib/see_more_arrow.png';
import KeywordList from '../Keywords/KeywordList';
import xAlt from '../../lib/x_alt.png';

const Model = ({ model }) => {
  const { kw, search_term, id } = model;
  const [hover, setHover] = useState(false);
  const { deleteModel } = useContext(searchContext);

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
        <div className="top">
          <h1>{search_term}</h1>
          <img src={xAlt} alt="x" onClick={e => deleteModel(e, id)} />
        </div>
        <div className="bot">
          <div className="word">Word</div>
          <div className="word-partner">No. of Mentions</div>
        </div>
      </div>
      <div className="result-list-container">
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
