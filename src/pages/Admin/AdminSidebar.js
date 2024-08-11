import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome as HomeIcon, FaWpforms as FormsIcon, FaEdit as EditIcon } from 'react-icons/fa';

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

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <AdminSidebarLink to="/home">
        <HomeIcon />
        HomePage
      </AdminSidebarLink>
      <AdminSidebarLink to="/AssetForm">
        <FormsIcon />
        AssetForm
      </AdminSidebarLink>
      <AdminSidebarLink to="/EditAssets">
        <EditIcon />
        EditAssets
      </AdminSidebarLink>
    </SidebarContainer>
  );
};

export default AdminSidebar;