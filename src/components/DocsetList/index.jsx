import React from 'react';
import Docset from './Docset';

const DocsetList = ({ docset }) => {
  return (
    <>
      {docset.map((item, i) => (
        <Docset key={i} item={item} />
      ))}
    </>
  );
};

export default DocsetList;
