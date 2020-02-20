import React from 'react';
import Word from './Word';

const KeywordList = ({ kw, removeKey, modelId }) => {
  if (!kw || !kw.length) return <p>No Keywords Left</p>;

  return (
    <div>
      {kw.map((word, i) => (
        <Word
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
