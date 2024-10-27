import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const AllocateAsset = () => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [allocation, setAllocation] = useState({ assetId: '', userId: '' });
  const { token } = useAuth();

  useEffect(() => {
    // Fetching Assets
    const fetchAssets = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/assets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch assets');
        const data = await response.json();
        setAssets(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    // Fetching Employees
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        setEmployees(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchAssets();
    fetchEmployees();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllocation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://asset-inventory-backend.onrender.com/inventory/assets/${allocation.assetId}/allocate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: allocation.userId }),
      });

      if (!response.ok) throw new Error('Failed to allocate asset');
      alert('Asset allocated successfully');
      setAllocation({ assetId: '', userId: '' });
    } catch (error) {
      console.error('Error allocating asset:', error);
    }
  };

  return (
    <Container>
      <Title>Allocate Asset</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="assetId">Select Asset:</Label>
          <Select name="assetId" value={allocation.assetId} onChange={handleChange} required>
            <option value="">Select an asset</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userId">Select Employee:</Label>
          <Select name="userId" value={allocation.userId} onChange={handleChange} required>
            <option value="">Select an employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.username}</option>
            ))}
          </Select>
        </FormGroup>
        <SubmitButton type="submit">Allocate Asset</SubmitButton>
      </Form>
    </Container>
  );
};

export default AllocateAsset;

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 15px;
  background: #006A4E;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:focus {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;
