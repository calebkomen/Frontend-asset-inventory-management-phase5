import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlusCircle, FaExchangeAlt, FaClipboardCheck, FaFileAlt } from 'react-icons/fa';
import AddAssets from './procurementManagerDash/AddAssets';
import AllocateAssets from './procurementManagerDash/AllocateAssets';
import ViewCompletedRequests from './procurementManagerDash/ViewCompletedRequests';
import ReviewRequests from './procurementManagerDash/ReviewRequests';

const ProcurementManagerDashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarLink to="add-assets">
          <FaPlusCircle />
          Add Assets
        </SidebarLink>
        <SidebarLink to="allocate-assets">
          <FaExchangeAlt />
          Allocate Assets
        </SidebarLink>
        <SidebarLink to="view-completed-requests">
          <FaClipboardCheck />
          View Completed Requests
        </SidebarLink>
        <SidebarLink to="review-requests">
          <FaFileAlt />
          Review Requests
        </SidebarLink>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route path="add-assets" element={<AddAssets />} />
          <Route path="allocate-assets" element={<AllocateAssets />} />
          <Route path="view-completed-requests" element={<ViewCompletedRequests />} />
          <Route path="review-requests" element={<ReviewRequests />} />
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
  overflow: hidden;
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

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
