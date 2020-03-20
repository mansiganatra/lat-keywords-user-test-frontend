import React from 'react';
// import { useLocation } from 'react-router-dom';

import SearchResults from '../../components/Show/SearchResults';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const Show = () => {
  // let query = useQuery();
  // let apiToken = query.get('apiToken');
  // let server = query.get('server');
  // let origin = query.get('origin');
  // let documentSetId = query.get('documentSetId');
  // let [search, setSearch] = useState(null);

  return (
    <>
      <SearchResults />
    </>
  );
};

export default Show;
