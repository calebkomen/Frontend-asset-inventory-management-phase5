import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending'); // Default to pending requests
  const { token } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError('');

      const endpoint =
        filter === 'approved'
          ? 'https://asset-inventory-backend.onrender.com/inventory/requests/completed'
          : 'https://asset-inventory-backend.onrender.com/inventory/requests/pending';

      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(data.data || []);
      } catch (error) {
        setError('Error fetching requests');
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [filter, token]);

  return (
    <Container>
      <Title>View Requests</Title>
      <FilterContainer>
        <label htmlFor="filter">Filter Requests:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="approved">Completed</option>
        </select>
      </FilterContainer>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {requests.length === 0 && !loading && <p>No requests found.</p>}
      <RequestList>
        {requests.map((request) => (
          <RequestItem key={request.id}>
            <RequestDetails>
              <Detail><strong>Request ID:</strong> {request.id}</Detail>
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

export default ViewRequests;

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

const FilterContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;

  label {
    font-weight: bold;
    margin-right: 10px;
  }

  select {
    padding: 5px;
    font-size: 16px;
  }
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
