import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoo from '../logoo.jpeg'; // Ensure you have a logo image in the src folder

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://asset-inventory-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error('Login failed:', responseData);
        throw new Error(responseData.message || 'Invalid login credentials');
      }

      login(responseData.user, responseData.token, responseData.role);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message || 'Invalid login credentials');
    }
  };

  return (
    <Container>
      <LeftPanel>
        <h1>Empower the unsung heroes that support the world</h1>
      </LeftPanel>
      <RightPanel>
        <Form onSubmit={handleSubmit}>
          <Logo src={logoo} alt="Logo" />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <label htmlFor="username">Username</label>
          <Input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div>
            <Input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <ForgotPassword href="/forgot-password">Forgot password?</ForgotPassword>
          </div>
          <Button type="submit">Login</Button>
          <SSOButton type="button">Login with SSO</SSOButton>
          <SignUp>
            <span>Don't have an account yet? </span>
            <a href="/signup">Sign Up</a>
          </SignUp>
          <Terms>
            By clicking "Login" you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
          </Terms>
        </Form>
      </RightPanel>
    </Container>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: #e5f4e3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 2em;
    color: #333;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #4CAF50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;

  &:hover {
    background: #45a049;
  }
`;

const SSOButton = styled.button`
  background: #fff;
  color: #333;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;

  &:hover {
    background: #f0f0f0;
  }
`;

const ForgotPassword = styled.a`
  float: right;
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUp = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Terms = styled.p`
  font-size: 0.8em;
  color: #888;
  text-align: center;
  margin-top: 20px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

