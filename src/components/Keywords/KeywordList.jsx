import React, { useContext } from 'react';
import Keyword from './Keyword';
import searchContext from '../../store/searchContext';

const KeywordList = ({ kw, sorted_kw }) => {
  const { sortBy } = useContext(searchContext);
  console.log('sdf', sortBy);
  return (
    <>
      {sortBy === 'relevance'
        ? kw.map((word, i) => <Keyword key={word} word={word} />)
        : sorted_kw.map((word, i) => <Keyword key={word} word={word} />)}
    </>
  );
};

export default KeywordList;
