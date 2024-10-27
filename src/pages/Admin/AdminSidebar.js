import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome as HomeIcon, FaWpforms as FormsIcon, FaEdit as EditIcon } from 'react-icons/fa';

// Styled-components for the Sidebar and Links
const SidebarContainer = styled.div`
  width: 200px;
  background: #c2e3be; /* Deeper green */
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed; /* Makes the sidebar fixed */
  top: 0;
  left: 0;
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

// Navbar styled component
const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 200px; /* Align the navbar to the right of the sidebar */
  z-index: 1;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// Main Content styled component
const MainContentContainer = styled.div`
  margin-left: 200px; /* Push content to the right by the sidebar width */
  margin-top: 60px; /* Push content down by the navbar height */
  padding: 20px;
`;

// AdminSidebar Component
const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/home">
        <HomeIcon />
        HomePage
      </SidebarLink>
      <SidebarLink to="/AssetForm">
        <FormsIcon />
        AssetForm
      </SidebarLink>
      <SidebarLink to="/EditAssets">
        <EditIcon />
        EditAssets
      </SidebarLink>
    </SidebarContainer>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <NavbarContainer>
      <h1>Admin Dashboard</h1>
    </NavbarContainer>
  );
};

// Main AdminLayout Component
const AdminLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <AdminSidebar />
      </div>
      <div>
        <MainContentContainer>
          <h2>Welcome to the Admin Dashboard</h2>
          {/* Add your main content here */}
        </MainContentContainer>
      </div>
    </div>
  );
};

export default AdminLayout;
