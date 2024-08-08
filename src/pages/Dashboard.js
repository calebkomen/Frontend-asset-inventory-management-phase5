import React from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import AdminDashboard from './AdminDashboard';
import ProcurementManagerDashboard from './ProcurementManagerDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Container = styled.div`
  padding: 20px;
`;

const Dashboard = () => {
  const { role } = useAuth();

  return (
    <Container>
      {role === 'admin' && <AdminDashboard />}
      {role === 'manager' && <ProcurementManagerDashboard />}
      {role === 'employee' && <EmployeeDashboard />}
    </Container>
  );
};

export default Dashboard;
