import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaEdit, FaWpforms } from 'react-icons/fa';
import HomePage from '../pages/Admin/Homepage'; // Correct path
import AssetForm from '../pages/Admin/AssetForm'; // Correct path
import EditAssets from '../components/EditAssets'; // Correct path

const AdminDashboard = () => {
  return (
    <ADashboardContainer>
      <ASidebar>
        <ASidebarLink to="home">
          <FaHome />
          Home
        </ASidebarLink>
        <ASidebarLink to="AssetForm">
          <FaWpforms />
          Add Asset
        </ASidebarLink>
        <ASidebarLink to="EditAssets">
          <FaEdit />
          Edit Assets
        </ASidebarLink>
      </ASidebar>
      <AMainContent>
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="AssetForm" element={<AssetForm />} />
          <Route path="EditAssets" element={<EditAssets />} />
          <Route path="/" element={<HomePage />} /> {/* Default route */}
        </Routes>
      </AMainContent>
    </ADashboardContainer>
  );
};

export default AdminDashboard;

const AnavbarHeight = '60px'; // Adjust this value to match the actual height of your navbar

const ADashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ASidebar = styled.div`
  position: fixed; /* Fixes the sidebar in place */
  left: 0; /* Aligns it to the left edge */
  top: ${AnavbarHeight}; /* Position it below the navbar */
  width: 250px;
  height: calc(100vh - ${AnavbarHeight}); /* Full height minus the navbar height */
  background: #c2e3be; /* Deeper green */
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Adds scroll if content overflows */
  z-index: 1; /* Ensures the sidebar is above other content */
`;

const ASidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;

  &.active {
    color: #007bff;
    background: #e0f7fa; /* Light blue background for active link */
  }

  &:hover {
    background: #b2dfdb; /* Light green background for hover state */
  }

  svg {
    margin-right: 20px;
  }
`;

const AMainContent = styled.div`
  margin-left: 250px; /* Offset to make space for the fixed sidebar */
  padding: 10px;
  background: #f0f0f0;
  height: calc(100vh - ${AnavbarHeight}); /* Ensure it covers the full height minus the navbar */
  overflow-y: auto; /* Allows scrolling within the main content */
  box-sizing: border-box; /* Ensure padding is included in the height */
  position: relative; /* Ensure it positions correctly relative to the sidebar */
`;
