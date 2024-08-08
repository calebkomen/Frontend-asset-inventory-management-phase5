import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaTasks, FaUser, FaClipboardList, FaPlusCircle } from 'react-icons/fa';
import Home from './employeeDash/Home';
import Tasks from './employeeDash/Tasks';
import Profile from './employeeDash/Profile';
import ViewUserRequests from './employeeDash/ViewUserRequests';
import CreateRequestForm from './employeeDash/CreateRequestForm';

const EmployeeDashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarLink to="home">
          <FaHome />
          Home
        </SidebarLink>
        <SidebarLink to="tasks">
          <FaTasks />
          Tasks
        </SidebarLink>
        <SidebarLink to="profile">
          <FaUser />
          Profile
        </SidebarLink>
        <SidebarLink to="view-requests">
          <FaClipboardList />
          View User Requests
        </SidebarLink>
        <SidebarLink to="create-request">
          <FaPlusCircle />
          Create Request Form
        </SidebarLink>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="view-requests" element={<ViewUserRequests />} />
          <Route path="create-request" element={<CreateRequestForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;

// Styled Components

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px); /* Adjust for the height of the navbar */
`;

const Sidebar = styled.div`
  width: 250px;
  background: #c2e3be; /* Deeper green */
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: sticky; /* Make the sidebar sticky */
  top: 10px; /* Position it just below the navbar */
  height: calc(100vh - 70px); /* Adjust for the height of the navbar */
  overflow-y: auto; /* Allow vertical scrolling if needed */
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
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
  overflow-y: auto; /* Allow vertical scrolling for main content */
`;
