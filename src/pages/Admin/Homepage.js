import React from 'react';
import styled from 'styled-components';
import Assets from '../Assets'; 

const Home = () => {
  return (
    <HomeContainer>
      <CenteredHeading>Admin HomePage</CenteredHeading>
      <Assets />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Horizontally center-aligns items */
  padding-top: 20px; /* Adds space from the top of the page */
  width: 100%; /* Ensures the container takes up the full width */
`;

const CenteredHeading = styled.h2`
  text-align: center; /* Center-aligns the text itself */
  margin-bottom: 20px; /* Adds some space below the heading */
  font-size: 2rem; /* Adjust font size as needed */
  color: #333; /* Adjust color as needed */
`;
