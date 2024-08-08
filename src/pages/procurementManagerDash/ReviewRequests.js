import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const ReviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/requests/pending', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',    
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data.data);  
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPendingRequests();
  }, [token]);  

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`https://asset-inventory-backend.onrender.com/inventory/requests/${id}`, {
        method: 'PATCH',  
        headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',    
        },
        body: JSON.stringify({ status: 'approved' })  
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setRequests(requests.map(req => (req.id === id ? { ...req, status: 'approved' } : req)));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <Container>
      <Title>Review Requests</Title>
      <RequestList>
        {requests.map(request => (
          <RequestItem key={request.id}>
            <RequestDetails>
              <Detail><strong>Request ID:</strong> {request.id}</Detail>
              <Detail><strong>Reason:</strong> {request.reason}</Detail>
              <Detail><strong>Quantity:</strong> {request.quantity}</Detail>
              <Detail><strong>Urgency:</strong> {request.urgency}</Detail>
              <ApproveButton onClick={() => handleApprove(request.id)}>Approve</ApproveButton>
            </RequestDetails>
          </RequestItem>
        ))}
      </RequestList>
    </Container>
  );
};

export default ReviewRequests;

// Styled Components

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
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
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background 0.3s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f1f1f1;
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

const ApproveButton = styled.button`
  padding: 10px 15px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }

  &:focus {
    outline: 2px solid #218838;
    outline-offset: 2px;
  }
`;
