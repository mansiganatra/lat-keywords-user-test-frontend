import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import KeywordList from '../KeywordList';
import SearchBar from '../SearchBar';
import DeletedList from '../DeletedList';

import './Model.css';

const Model = ({ model, removeKey, getKeywords, deleteModel }) => {
  const { mname, kw, score, id, deleted_kw, search_term, deleted } = model;
  const [hover, setHover] = useState(false);
  const [display, setDisplay] = useState(true);
  let { docset } = useParams();

  const handleHoverEnable = () => {
    if (!hover) return setHover(true);
  };
  const handleHoverDisable = () => {
    if (hover) return setHover(false);
  };

  const handleDisplayNone = () => {
    docset = docset.split('=')[1];
    deleteModel(docset, id);
  };

  return (
    <div
      className={`model-container ${!deleted ? '' : 'disable-remove-btn'}`}
      onMouseEnter={handleHoverEnable}
      onMouseLeave={handleHoverDisable}
    >
      {hover && (
        <div className="remove-btn" onClick={handleDisplayNone}>
          x
        </div>
      )}

      <div className="header">
        <p>"{search_term}"</p>
      </div>

      <div className="keywordlist-container">
        <KeywordList kw={kw} removeKey={removeKey} modelId={id} />
      </div>

      <h2 className="score">score: {score}</h2>
      <h2>Deleted keywords:</h2>
      <div className="deletedlist-container">
        <DeletedList deleted_kw={deleted_kw} />
      </div>
    </div>
  );
};

export default Model;
