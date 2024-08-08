import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

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
    <div>
      <h2>Completed Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <div>
              <p><strong>Request ID:</strong> {request.id}</p>
              <p><strong>Reason:</strong> {request.reason}</p>
              <p><strong>Quantity:</strong> {request.quantity}</p>
              <p><strong>Urgency:</strong> {request.urgency}</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedRequests;
