import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const LogoutButton = styled.button`
  background: transparent;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/assets">Assets</NavLink>
      <NavLink to="/requests">Requests</NavLink>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Nav>
  );
};

export default Navbar;
