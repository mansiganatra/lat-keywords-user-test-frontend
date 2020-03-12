import React from 'react';
import seeMoreArror from '../../lib/see_more_arrow.png';
import KeywordList from '../Keywords/KeywordList';

const Model = ({ model }) => {
  const { kw, score, id, deleted_kw, search_term, deleted } = model;
  return (
    <div className="result-model-container">
      <div className="model-header-container">
        <h1>“{search_term}”</h1>
        <div className="delete">-</div>
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
