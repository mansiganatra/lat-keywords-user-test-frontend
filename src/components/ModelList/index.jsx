import React from 'react';
import Model from './Model';

import './ModelList.css';

const ModelList = ({ models, removeKey }) => {
  if (!models || !models.length)
    return <div className="error-message">No current models</div>;

  return (
    <div className="modellist-container">
      {models.map(model => (
        <Model key={model.id} model={model} removeKey={removeKey} />
      ))}
    </div>
  );
};

export default ModelList;
