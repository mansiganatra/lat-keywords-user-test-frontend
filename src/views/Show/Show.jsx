import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Show.css';
import LandingPage from '../../components/Show/LandingPage';
import Slider from '../../components/Slider';
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

  // useEffect(() => {
  //   window.addEventListener('message', e => {
  //     if (e.data.event === 'notify:documentListParams') {
  //       const term = e.data.args[0].q;
  //       setSearch(term);
  //     }
  //   });

  //   return () =>
  //     window.removeEventListener('message', () => {
  //       console.log('done');
  //     });
  // });

  const [size, setSize] = useState(15);

  return (
    <div className="show-container">
      {searched ? (
        <SearchResults
          getKeywords={getKeywords}
          size={size}
          startSearch={startSearch}
          docset={docset}
          saveToFile={saveToFile}
        />
      ) : (
        <LandingPage
          getKeywords={getKeywords}
          size={size}
          startSearch={startSearch}
        />
      )}
    </div>
  );
};

export default Show;
