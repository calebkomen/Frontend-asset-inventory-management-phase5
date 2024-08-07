import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import UpdateAssetForm from './Admin/UpdateAssetForm';
import styled from 'styled-components';
import AssetForm from './Admin/AssetForm';

const AdminDashboard = () => {
  return (
    <DashboardContainer>
      <AdminSidebar>
        <AdminSidebarLink to="AssetForm">AssetForm</AdminSidebarLink>
        <AdminSidebarLink to="UpdateAssetForm">UpdateAssetForm</AdminSidebarLink>
        </AdminSidebar>
      <Main>
        
        <Routes>
          <Route path="/AssetForm" element={<AssetForm />} />
          <Route path="/UpdateAssetForm" element={<UpdateAssetForm />} />    
          </Routes>
      </Main>
    </DashboardContainer>
  );
};

export default AdminDashboard;


const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const AdminSidebar = styled.div`
  width: 200px;
  background: #c2e3be; /* Deeper green */
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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

const Main = styled.div`
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
`;
