import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const ViewPendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/requests/pending', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Corrected syntax here
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pending requests');
        }

        const data = await response.json();
        setRequests(data.data || []);
      } catch (error) {
        setError('Error fetching pending requests');
        console.error('Error fetching pending requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [token]);

  return (
    <Container>
      <Title>Pending Requests</Title>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {requests.length === 0 && !loading && <p>No pending requests found.</p>}
      <RequestList>
        {requests.map(request => (
          <RequestItem key={request.id}>
            <RequestDetails>
              <Detail><strong>Request ID:</strong> {request.id}</Detail>
              <Detail><strong>Asset:</strong> {request.assetName}</Detail>
              <Detail><strong>Employee:</strong> {request.employeeName}</Detail>
              <Detail><strong>Quantity:</strong> {request.quantity}</Detail>
              <Detail><strong>Urgency:</strong> {request.urgency}</Detail>
            </RequestDetails>
          </RequestItem>
        ))}
      </RequestList>
    </Container>
  );
};

export default ViewPendingRequests;

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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
