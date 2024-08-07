import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // useEffect(() => {
  //   // Retrieve token from local storage if available
  //   const storedToken = localStorage.getItem('authToken');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  const login = (user, access_token, role) => {
    setUser(user);
    setToken(access_token);
    console.log(access_token)
    setRole(role);
    //localStorage.setItem('authToken', token); // Store token in local storage
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
   // localStorage.removeItem('authToken'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
