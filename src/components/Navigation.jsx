import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <NavContainer>
    <NavLink to="/" exact activeClassName="selectedLink">
      Upload
    </NavLink>
    <NavLink to="/dash" activeClassName="selectedLink">
      Dashboard
    </NavLink>
  </NavContainer>
);

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;

  .selectedLink {
    font-weight: 700;
    border-bottom: 2px solid black;
  }
`;

export default Navigation;
