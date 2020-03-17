import React, { useContext } from 'react';
import searchContext from '../../store/searchContext';
import Model from './Model';

const ModelList = () => {
  const { docset } = useContext(searchContext);
  const { models } = docset;

  if (!models.length) return <h1>Search models</h1>;
  return (
    <div className="model-list">
      {models.map((model, i) => (
        <Model key={i} model={model} />
      ))}
    </div>
  );
};

export default ModelList;
