// src/context/RequestContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for requests
const RequestContext = createContext();

// Custom hook to use the RequestContext
export const useRequestContext = () => {
  return useContext(RequestContext);
};

// RequestProvider component to provide request context to the rest of the app
export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const addRequest = (request) => {
    setRequests([...requests, request]);
  };

  const removeRequest = (requestId) => {
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, removeRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
