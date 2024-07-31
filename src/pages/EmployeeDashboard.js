import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const EmployeeDashboard = () => {
  return (
    <Section>
      <h2>Employee Dashboard</h2>
      {/* Employee-specific content */}
    </Section>
  );
};

export default EmployeeDashboard;
