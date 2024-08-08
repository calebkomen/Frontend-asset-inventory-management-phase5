import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

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
    <div>
      <h2>Review Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <div>
              <p><strong>Request ID:</strong> {request.id}</p>
              <p><strong>Reason:</strong> {request.reason}</p>
              <p><strong>Quantity:</strong> {request.quantity}</p>
              <p><strong>Urgency:</strong> {request.urgency}</p>
              <button onClick={() => handleApprove(request.id)}>Approve</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewRequests;
