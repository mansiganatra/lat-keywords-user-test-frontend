import React from 'react';
import Keyword from './Keyword';

const KeywordList = ({ kw, removeKey, modelId }) => {
  if (!kw || !kw.length) return <p>No Keywords Left</p>;

  return (
    <div>
      {kw.map((word, i) => (
        <Keyword
          word={word}
          key={word}
          index={i}
          removeKey={removeKey}
          modelId={modelId}
        />
      ))}
    </div>
  );
};

export default KeywordList;
