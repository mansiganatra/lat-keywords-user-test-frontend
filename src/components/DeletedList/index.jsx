import React from 'react';
import Deleted from './Deleted';

import './DeletedList.css';

const DeletedList = ({ deleted_kw }) => {
  return (
    <>
      <div className="deleted">
        {deleted_kw.map((deleted, i) => (
          <Deleted key={i} deleted={deleted} />
        ))}
      </div>
    </>
  );
};

export default DeletedList;
