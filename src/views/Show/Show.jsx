import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Show.css';
import SearchResults from '../../components/Show/SearchResults';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Show = ({ searched, getKeywords, startSearch, docset, saveToFile }) => {
  let query = useQuery();
  let apiToken = query.get('apiToken');
  let server = query.get('server');
  let origin = query.get('origin');
  let documentSetId = query.get('documentSetId');
  let [search, setSearch] = useState(null);

  const [size, setSize] = useState(15);
  console.log('search');
  return (
    <div className="show-container">
      <SearchResults
        getKeywords={getKeywords}
        size={size}
        startSearch={startSearch}
        docset={docset}
        saveToFile={saveToFile}
      />
    </div>
  );
};

export default Show;
