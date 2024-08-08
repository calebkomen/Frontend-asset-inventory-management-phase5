import React from 'react';
import styled from 'styled-components';
import Assets from '../Assets'; // Adjust the path if necessary

const Home = () => {
  return (
    <Container>
      <Title>Welcome to the Asset Management System</Title>
      <Assets /> {/* Importing and using the Assets component */}
    </Container>
  );
};

export default Home;

// Styling
const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;
