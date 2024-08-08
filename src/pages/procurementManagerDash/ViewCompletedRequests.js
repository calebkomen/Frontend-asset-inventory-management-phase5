import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const CompletedRequests = () => {
  const [requests, setRequests] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/requests/completed', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data.data);  
      } catch (error) {
        console.error('Error fetching completed requests:', error);
      }
    };

    fetchCompletedRequests();
  }, [token]);  

  return (
    <Container>
      <Title>Completed Requests</Title>
      <RequestList>
        {requests.map(request => (
          <RequestItem key={request.id}>
            <RequestDetails>
              <Detail><strong>Request ID:</strong> {request.id}</Detail>
              <Detail><strong>Reason:</strong> {request.reason}</Detail>
              <Detail><strong>Quantity:</strong> {request.quantity}</Detail>
              <Detail><strong>Urgency:</strong> {request.urgency}</Detail>
              <Detail><strong>Status:</strong> {request.status}</Detail>
            </RequestDetails>
          </RequestItem>
        ))}
      </RequestList>
    </Container>
  );
};

export default CompletedRequests;

// Styled Components

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const RequestList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RequestItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Detail = styled.p`
  margin: 0;
  font-size: 16px;
  color: #555;
  strong {
    color: #333;
  }
`;
