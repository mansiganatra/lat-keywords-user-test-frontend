import React from 'react';
import Keyword from './Keyword';

const KeywordList = ({ kw }) => {
  return (
    <>
      {kw.map((word, i) => (
        <Keyword key={word} word={word} />
      ))}
    </>
  );
};

export default KeywordList;
