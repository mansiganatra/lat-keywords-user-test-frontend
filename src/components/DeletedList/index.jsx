import React from 'react';
import Deleted from './Deleted';

const DeletedList = ({ deleted_kw }) => {
  return (
    <>
      <h3>Deleted keywords</h3>
      {deleted_kw.map((deleted, i) => (
        <Deleted key={i} deleted={deleted} />
      ))}
    </>
  );
};

export default DeletedList;
