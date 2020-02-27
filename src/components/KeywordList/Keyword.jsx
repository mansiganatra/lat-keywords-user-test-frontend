import React from 'react';
import { useParams } from 'react-router-dom';
import CrossButton from '../CrossButton';

import './Keyword.css';

const Word = ({ word, removeKey, index, modelId }) => {
  let { docset } = useParams();

  const removeHandler = () => {
    docset = docset.split('=')[1];
    removeKey(modelId, index, docset);
  };

  return (
    <div className="keyword-container">
      <p>
        {word[0]}({word[1]})
      </p>
      <div>
        <CrossButton removeHandler={removeHandler} />
      </div>
    </div>
  );
};

export default Word;
