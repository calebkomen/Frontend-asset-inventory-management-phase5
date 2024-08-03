import React from 'react';
import { useRequestContext } from '../../context/RequestContext';


const ViewUserRequests = () => {
  const { requests } = useRequestContext();

  return (
    <div>
      <h2>View User Requests</h2>
      {requests.length === 0 ? (
        <p>No requests submitted yet.</p>
      ) : (
        <ul>
          {requests.map((request, index) => (
            <li key={index}>
              <p>Asset ID: {request.asset_id}</p>
              <p>Reason: {request.reason}</p>
              <p>Quantity: {request.quantity}</p>
              <p>Urgency: {request.urgency}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewUserRequests;
