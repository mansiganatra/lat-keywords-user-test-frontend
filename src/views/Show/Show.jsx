import React from 'react';
// import { useLocation } from 'react-router-dom';

import './Show.css';
import SearchResults from '../../components/Show/SearchResults';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const Show = ({ docset, clearAll, sortModels, deleteModel }) => {
  // let query = useQuery();
  // let apiToken = query.get('apiToken');
  // let server = query.get('server');
  // let origin = query.get('origin');
  // let documentSetId = query.get('documentSetId');
  // let [search, setSearch] = useState(null);

  return (
    <div className="show-container">
      <SearchResults
        docset={docset}
        deleteModel={deleteModel}
        clearAll={clearAll}
        sortModels={sortModels}
      />
    </div>
  );
};

export default Show;
