import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Call logout function to clear user data
    logout();
    // Redirect to login page
    navigate('/login');
  }, [logout, navigate]);

  return null; // Render nothing as we are redirecting
};

export default Logout;
