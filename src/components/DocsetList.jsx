import React from 'react';
import { NavLink } from 'react-router-dom';

import './DocsetList.css';

const DocsetList = ({ docset }) => {
  return (
    <>
      {docset.map((item, i) => (
        <div key={i}>
          <NavLink
            to={`/docset=${item.name}`}
            activeClassName="selected-link"
            exact
          >
            <h3>{item.name}</h3>
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default DocsetList;
