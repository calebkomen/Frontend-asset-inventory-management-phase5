import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { AuthProvider } from './context/AuthContext';
import { AssetProvider } from './context/AssetContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Requests from './pages/Requests';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <AssetProvider>
        <Router>
          <GlobalStyle />
          <AppContent />
        </Router>
      </AssetProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
