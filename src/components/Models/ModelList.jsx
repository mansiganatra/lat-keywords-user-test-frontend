import React from 'react';
import Model from './Model';

const ModelList = models => {
  console.log(models);
  if (!models.models.length) return <h1>Search models</h1>;
  return (
    <div className="model-list">
      {models.models.map((model, i) => (
        <Model key={i} model={model} />
      ))}
    </div>
  );
};

export default ModelList;
