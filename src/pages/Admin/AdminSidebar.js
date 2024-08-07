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

const AdminSidebarLink = styled(NavLink)`
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  
  &.active {
    color: #007bff;
  }
`;

const AdminSidebar = () => {
  return (
    <SidebarContainer>
        <AdminSidebarLink to="/AssetForm">AssetForm</AdminSidebarLink>
        <AdminSidebarLink to="/UpdateAssetForm">UpdateAssetForm</AdminSidebarLink>
      </SidebarContainer>
  );
};

export default AdminSidebar;