import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Show = () => {
  let query = useQuery();
  let apiToken = query.get('apiToken');
  let server = query.get('server');
  let origin = query.get('origin');
  let documentSetId = query.get('documentSetId');
  let [search, setSearch] = useState(null);

  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.event === 'notify:documentListParams') {
        const term = e.data.args[0].q;
        setSearch(term);
      }
    });

    return () =>
      window.removeEventListener('message', () => {
        console.log('done');
      });
  });
  return (
    <div>
      <h1>Show</h1>
      <h2>API Token: {apiToken}</h2>
      <h2>documentSetId: {documentSetId}</h2>
      <p>Term: {search ? search : '""'}</p>
    </div>
  );
};

export default Show;
