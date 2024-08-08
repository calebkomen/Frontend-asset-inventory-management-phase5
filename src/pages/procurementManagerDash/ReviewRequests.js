import React, { useEffect, useState } from 'react';

const ReviewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/pending');
        const data = await response.json();
        setRequests(data.filter(req => req.status === 'pending'));
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await fetch(`https://asset-inventory-backend.onrender.com/inventory/requests/pending/${id}/`, { method: 'POST' });
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