import React from 'react';

import SearchShowTop from './SearchShowTop';
import SearchShowBot from './SearchShowBot';

const SearchTopResult = ({
  getKeywords,
  size,
  startSearch,
  docset,
  saveToFile
}) => (
  <>
    <SearchShowTop
      getKeywords={getKeywords}
      size={size}
      startSearch={startSearch}
      docset={docset}
      saveToFile={saveToFile}
    />
    <SearchShowBot docset={docset} />
  </>
);

export default SearchTopResult;
