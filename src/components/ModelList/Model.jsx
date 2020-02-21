import React from 'react';
import KeywordList from '../KeywordList';
import SearchBar from '../SearchBar';

import './Model.css';

const Model = ({ model, removeKey, getKeywords }) => {
  const { mname, kw, score, id } = model;
  return (
    <div className="model-container">
      <SearchBar getKeywords={getKeywords} />
      <div className="header">{mname}</div>
      <div className="keywordlist-container">
        <KeywordList kw={kw} removeKey={removeKey} modelId={id} />
      </div>
      <h2>score: {score}</h2>
    </div>
  );
};

export default Model;
