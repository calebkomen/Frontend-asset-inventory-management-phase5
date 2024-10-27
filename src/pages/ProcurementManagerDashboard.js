import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlusCircle, FaExchangeAlt, FaClipboardCheck, FaFileAlt, FaEye } from 'react-icons/fa';
import AddAssets from './procurementManagerDash/AddAssets';
import AllocateAssets from './procurementManagerDash/AllocateAssets';
import ViewRequests from './procurementManagerDash/ViewRequests'; // Use the unified component
import ReviewRequests from './procurementManagerDash/ReviewRequests';
import ViewAssets from './procurementManagerDash/ViewAssets'; 
import ViewPendingRequests from './procurementManagerDash/ViewPendingRequests'; // Import the new component

const ProcurementManagerDashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarLink to="add-assets" aria-label="Add Assets">
          <FaPlusCircle />
          Add Assets
        </SidebarLink>
        <SidebarLink to="allocate-assets" aria-label="Allocate Assets">
          <FaExchangeAlt />
          Allocate Assets
        </SidebarLink>
        <SidebarLink to="view-completed-requests" aria-label="View Completed Requests">
          <FaClipboardCheck />
          View Completed Requests
        </SidebarLink>
        <SidebarLink to="review-requests" aria-label="Review Requests">
          <FaFileAlt />
          Review Requests
        </SidebarLink>
        <SidebarLink to="view-assets" aria-label="View Assets">
          <FaEye />
          View Assets
        </SidebarLink>
        <SidebarLink to="view-pending-requests" aria-label="View Pending Requests">
          <FaFileAlt />
          View Pending Requests
        </SidebarLink>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route path="add-assets" element={<AddAssets />} />
          <Route path="allocate-assets" element={<AllocateAssets />} />
          <Route path="view-requests" element={<ViewRequests />} /> {/* Updated route */}
          <Route path="review-requests" element={<ReviewRequests />} />
          <Route path="view-assets" element={<ViewAssets />} />
          <Route path="view-pending-requests" element={<ViewPendingRequests />} /> {/* New route */}
          <Route path="/" element={<AddAssets />} /> {/* Default route */}
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

export default ProcurementManagerDashboard;

// Styled Components

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #d1e7dd; /* Light green */
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 200px;
    padding: 15px;
  }
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;

  &.active {
    color: #007bff;
    background: #e0f7fa; /* Light blue background for active link */
  }

  &:hover {
    background: #b2dfdb; /* Light green background for hover state */
  }

  svg {
    margin-right: 10px;
  }

  &:focus {
    outline: 2px solid #007bff; /* Outline for accessibility */
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
  overflow-y: auto; /* Enable vertical scrolling */

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
