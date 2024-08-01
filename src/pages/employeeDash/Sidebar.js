import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
  
  &.active {
    color: #007bff;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/home">Home</SidebarLink>
      <SidebarLink to="/tasks">Tasks</SidebarLink>
      <SidebarLink to="/profile">Profile</SidebarLink>
      <SidebarLink to="/user-dashboard">User Dashboard</SidebarLink>
      <SidebarLink to="/view-requests">View User Requests</SidebarLink>
      <SidebarLink to="/create-request">Create Request Form</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
