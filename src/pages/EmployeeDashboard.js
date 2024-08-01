import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from './employeeDash/Home';
import Tasks from './employeeDash/Tasks';
import Profile from './employeeDash/Profile';
import ViewUserRequests from './employeeDash/ViewUserRequests';
import CreateRequestForm from './employeeDash/CreateRequestForm';

const EmployeeDashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarLink to="home">Home</SidebarLink>
        <SidebarLink to="tasks">Tasks</SidebarLink>
        <SidebarLink to="profile">Profile</SidebarLink>
        <SidebarLink to="view-requests">View User Requests</SidebarLink>
        <SidebarLink to="create-request">Create Request Form</SidebarLink>
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
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background: #c2e3be; /* Deeper green */
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
`;
