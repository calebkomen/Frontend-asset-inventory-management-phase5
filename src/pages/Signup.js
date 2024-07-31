import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoo from '../logoo.jpeg'; // Ensure you have a logo image in the src folder

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

const CheckboxLabel = styled.label`
  margin-left: 8px;
`;

const SignIn = styled.div`
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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Replace this with actual signup logic
    const response = { user: { name: 'User' }, token: 'token123', role: 'employee' };
    // Assuming a signup function exists
    // signup(response.user, response.token, response.role);
    navigate('/dashboard');
  };

  return (
    <Container>
      <LeftPanel>
        <h1>Join us and make a difference</h1>
      </LeftPanel>
      <RightPanel>
        <Form onSubmit={handleSubmit}>
          <Logo src={logoo} alt="Logo" />
          <label htmlFor="email">Email</label>
          <Input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <Input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <div>
            <Input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <CheckboxLabel htmlFor="terms">I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></CheckboxLabel>
          </div>
          <Button type="submit">Sign Up</Button>
          
          <SignIn>
            <span>Already have an account? </span>
            <a href="/login">Log In</a>
          </SignIn>
          <Terms>
            By clicking "Sign Up" you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
          </Terms>
        </Form>
      </RightPanel>
    </Container>
  );
};

export default Signup;
