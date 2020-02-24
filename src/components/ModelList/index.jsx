import React from 'react';
import Model from './Model';
import Carousel from '../Carousel';

import './ModelList.css';

const ModelList = ({ models, removeKey, getKeywords }) => {
  if (!models || !models.length)
    return <div className="error-message">No current models</div>;

  return (
    <div className="modellist-container">
      <Carousel top={265} left={0} right={0}>
        {models.map(model => (
          <Model
            key={model.id}
            model={model}
            removeKey={removeKey}
            getKeywords={getKeywords}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ModelList;
