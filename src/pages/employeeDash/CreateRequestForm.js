import React, { useState } from 'react';
import { useRequestContext } from '../../context/RequestContext';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const CreateRequestForm = () => {
  const [formData, setFormData] = useState({
    asset_id: '',
    reason: '',
    quantity: '',
    urgency: ''
  });

  const { addRequest } = useRequestContext();
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Request submitted successfully');
        addRequest(data);
        setFormData({
          asset_id: '',
          reason: '',
          quantity: '',
          urgency: ''
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('An error occurred while submitting the request.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create Request Form</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="asset_id">Asset ID:</Label>
        <Input
          type="text"
          id="asset_id"
          name="asset_id"
          value={formData.asset_id}
          onChange={handleChange}
          required
        />
        <Label htmlFor="reason">Reason:</Label>
        <Input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <Label htmlFor="quantity">Quantity:</Label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <Label htmlFor="urgency">Urgency:</Label>
        <Select
          id="urgency"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
        >
          <option value="">Select urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Button type="submit">Submit Request</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateRequestForm;

// Styling
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
