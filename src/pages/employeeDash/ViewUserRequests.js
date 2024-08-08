import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ViewUserRequests = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch user requests from the backend API
    fetch('https://asset-inventory-backend.onrender.com/inventory/user/requests', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched user requests:', data); // Log the fetched data

      // Extract the array of requests from the response object
      if (data && Array.isArray(data.data)) {
        setRequests(data.data);
      } else {
        console.error('Expected an array but got:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching user requests:', error);
    });
  }, [token]);

  return (
    <Container>
      <Title>Your Requests</Title>
      <RequestsContainer>
        {requests.length > 0 ? (
          requests.map(request => (
            <RequestCard key={request.id}>
              <RequestInfo>
                <strong>Asset ID:</strong> {request.asset_id}
              </RequestInfo>
              <RequestInfo>
                <strong>Reason:</strong> {request.reason}
              </RequestInfo>
              <RequestInfo>
                <strong>Quantity:</strong> {request.quantity}
              </RequestInfo>
              <RequestInfo>
                <strong>Urgency:</strong> {request.urgency}
              </RequestInfo>
              <RequestInfo>
                <strong>Status:</strong> {request.status}
              </RequestInfo>
            </RequestCard>
          ))
        ) : (
          <NoRequestsMessage>No requests found.</NoRequestsMessage>
        )}
      </RequestsContainer>
    </Container>
  );
};

export default ViewUserRequests;

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

const RequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

const RequestCard = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RequestInfo = styled.div`
  margin-bottom: 10px;
`;

const NoRequestsMessage = styled.div`
  text-align: center;
  color: #777;
`;
