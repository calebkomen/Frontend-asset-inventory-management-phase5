import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaTasks, FaUser, FaUserCircle, FaClipboardList, FaPlusCircle } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 200px;
  background: #c2e3be; /* Deeper green */
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SidebarLink = styled(NavLink)`
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;

  &.active {
    color: #007bff;
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/home">
        <FaHome />
        Home
      </SidebarLink> 
      <SidebarLink to="/tasks">
        <FaTasks />
        Tasks
      </SidebarLink>
      <SidebarLink to="/profile">
        <FaUser />
        Profile
      </SidebarLink>
      <SidebarLink to="/user-dashboard">
        <FaUserCircle />
        User Dashboard
      </SidebarLink>
      <SidebarLink to="/view-requests">
        <FaClipboardList />
        View User Requests
      </SidebarLink>
      <SidebarLink to="/create-request">
        <FaPlusCircle />
        Create Request Form
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
