import React from 'react';
// import { useLocation } from 'react-router-dom';

import './Show.css';
import SearchResults from '../../components/Show/SearchResults';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const Show = ({ getKeywords, startSearch, docset, saveToFile, clearAll }) => {
  // let query = useQuery();
  // let apiToken = query.get('apiToken');
  // let server = query.get('server');
  // let origin = query.get('origin');
  // let documentSetId = query.get('documentSetId');
  // let [search, setSearch] = useState(null);

  return (
    <div className="show-container">
      <SearchResults
        getKeywords={getKeywords}
        startSearch={startSearch}
        docset={docset}
        saveToFile={saveToFile}
        clearAll={clearAll}
      />
    </div>
  );
};

export default Show;
