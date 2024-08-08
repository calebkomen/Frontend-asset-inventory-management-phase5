import React, { useEffect, useState } from 'react';

const CompletedRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const response = await fetch('https://example-api.com/requests');
        const data = await response.json();
        setRequests(data.filter(req => req.status === 'completed'));
      } catch (error) {
        console.error('Error fetching completed requests:', error);
      }
    };

    fetchCompletedRequests();
  }, []);

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
