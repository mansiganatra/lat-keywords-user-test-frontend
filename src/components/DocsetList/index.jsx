import React from 'react';
import Docset from './Docset';

const DocsetList = ({ docset }) => {
  return (
    <>
      <h2>Docset:</h2>
      <ul className="docset">
        {docset.map((item, i) => (
          <li>
            <Docset key={i} item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default DocsetList;
