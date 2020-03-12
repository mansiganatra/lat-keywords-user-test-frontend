import React from 'react';
import { NavLink } from 'react-router-dom';

import './Docset.css';

const Docset = ({ item }) => {
  return (
    <div>
      <NavLink to={`/show/${item.name}`} activeClassName="selected-link" exact>
        <h3>{item.name}</h3>
      </NavLink>
    </div>
  );
};

export default Docset;
