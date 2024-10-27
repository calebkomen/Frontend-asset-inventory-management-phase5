import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ViewUserRequests = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('All'); 

  useEffect(() => {
    fetch('https://asset-inventory-backend.onrender.com/inventory/user/requests', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
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

  const filteredRequests = requests.filter(request => {
    if (filter === 'Pending') return request.status.toLowerCase() === 'pending';
    if (filter === 'Approved') return request.status.toLowerCase() === 'approved';
    return true; 
  });

  return (
    <Container>
      <Title>Your Requests</Title>
      
      {/* Filter Buttons */}
      <FilterContainer>
        <FilterButton active={filter === 'All'} onClick={() => setFilter('All')}>
          All
        </FilterButton>
        <FilterButton active={filter === 'Pending'} onClick={() => setFilter('Pending')}>
          Pending
        </FilterButton>
        <FilterButton active={filter === 'Approved'} onClick={() => setFilter('Approved')}>
          Approved
        </FilterButton>
      </FilterContainer>

      <RequestsContainer>
        {filteredRequests.length > 0 ? (
          filteredRequests.map(request => (
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

const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
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
