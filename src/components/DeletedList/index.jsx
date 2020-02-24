import React from 'react';
import Deleted from './Deleted';

import './DeletedList.css';

const DeletedList = ({ deleted_kw }) => {
  return (
    <>
      <h2>Deleted keywords:</h2>
      <div className="deleted">
        {deleted_kw.map((deleted, i) => (
          <Deleted key={i} deleted={deleted} />
        ))}
      </div>
    </>
  );
};

export default DeletedList;
