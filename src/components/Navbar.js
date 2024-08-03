import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #2e7d32; /* Deeper green */
  color: #c2e3be;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end; /* Right align the links */
`;

const NavLink = styled(Link)`
  color: #fff;
  margin: 0 10px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/assets">Assets</NavLink>
      <NavLink to="/requests">Requests</NavLink>
      <NavLink to="/login">Login</NavLink>
    </Nav>
  );
};

export default Navbar;
