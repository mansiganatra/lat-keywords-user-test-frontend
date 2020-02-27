import React from 'react';
import Docset from './Docset';

const DocsetList = ({ docset }) => {
  if (!docset.length) return <div>Loading docset...</div>;
  return (
    <>
      <h2>Docset:</h2>
      <ul className="docset">
        {docset.map((item, i) => (
          <li key={i}>
            <Docset item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default DocsetList;
