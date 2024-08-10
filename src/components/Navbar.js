import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoo from '../logoo.jpeg';

const Nav = styled.nav`
  background: #2e7d32; /* Deeper green */
  color: #c2e3be;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between; /* Space between for logo and links */
  align-items: center; /* Center items vertically */
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

const Logo = styled.img`
  height: 50px; /* Adjust as needed */
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
      <Logo src={logoo} alt="Logo" />
      <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {/* <NavLink to="/assets">Assets</NavLink>
        <NavLink to="/requests">Requests</NavLink> */}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </div>
    </Nav>
  );
};

export default Navbar;
