import React from 'react';
import Model from './Model';

import './ModelList.css';

const ModelList = ({ models, removeKey, getKeywords }) => {
  if (!models || !models.length)
    return <div className="error-message">No current models</div>;

  return (
    <div className="modellist-container">
      {models.map(model => (
        <Model
          key={model.id}
          model={model}
          removeKey={removeKey}
          getKeywords={getKeywords}
        />
      ))}
    </div>
  );
};

export default ModelList;
