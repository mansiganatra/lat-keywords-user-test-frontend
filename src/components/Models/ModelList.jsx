import React, { useContext } from 'react';
import searchContext from '../../store/searchContext';
import Model from './Model';

const ModelList = () => {
  const { docset } = useContext(searchContext);
  const { models } = docset;

  return (
    <div className="model-list">
      {models.map((model, i) => (
        <Model key={i} model={model} />
      ))}
    </div>
  );
};

export default ModelList;
