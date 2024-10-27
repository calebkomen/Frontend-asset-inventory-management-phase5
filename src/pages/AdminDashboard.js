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
  overflow: hidden; /* Prevents scrolling at the container level */
  position: relative; /* Ensures the content inside doesn't affect the entire page layout */
`;

const ASidebar = styled.div`
  position: fixed;
  left: 0;
  top: ${AnavbarHeight};
  width: 250px;
  height: calc(100vh - ${AnavbarHeight});
  background: #c2e3be;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1;
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
  margin-left: 250px;
  padding: 10px;
  background: #f0f0f0;
  height: calc(100vh - ${AnavbarHeight});
  overflow-y: auto;
  box-sizing: border-box;
  position: fixed; /* Fixes the content similar to the sidebar */
  top: ${AnavbarHeight}; /* Aligns it below the navbar */
  right: 0; /* Ensures it fills the remaining space to the right */
  width: calc(100vw - 250px); /* Takes the full width minus the sidebar */
`;
