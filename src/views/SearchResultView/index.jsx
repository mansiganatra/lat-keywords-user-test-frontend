import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ModelList from '../../components/ModelList';
import SearchBar from '../../components/SearchBar';

import './SearchResultView.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultView = ({
  docset,
  match,
  removeKey,
  getKeywords,
  deleteModel
}) => {
  // match.params.docset -> mueller
  const result = docset.find(item => 'mueller' === item.name);
  const [search, setSearch] = useState();

  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data.event === 'notify:documentListParams') {
        const term = e.data.args[0].q;
        getKeywords(term, 'mueller');
        setSearch(term);
      }
    });

    return () =>
      window.removeEventListener('message', () => {
        console.log('done');
      });
  });

  if (!result) return <p>No Docsets Available</p>;

  return (
    <div className="container">
      {/* <div className="searchbar-container">
        <SearchBar getKeywords={getKeywords} />
      </div>
      <div className="message">
        {result.msg.length > 0 && <h1>{result.msg}</h1>}
        <div>
          {result.alt_arr.length > 0 &&
            result.alt_arr.map(item => <p key={item}>{item},</p>)}
        </div>
      </div> */}
      {search}
      <ModelList
        models={result.models}
        removeKey={removeKey}
        getKeywords={getKeywords}
        deleteModel={deleteModel}
      />
    </div>
  );
};

export default SearchResultView;
