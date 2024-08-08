import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AllocateAsset = () => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [allocation, setAllocation] = useState({ assetId: '', employeeId: '' });
  const { token } = useAuth();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/assets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched assets:', data); 
        setAssets(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error('Error fetching assets:', error);
        setAssets([]); 
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched employees:', data); 
        setEmployees(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error('Error fetching employees:', error);
        setEmployees([]); 
      }
    };

    fetchAssets();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllocation(prevState => ({ ...prevState, [name]: value }));
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
        body: JSON.stringify({ employeeId: allocation.employeeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to allocate asset');
      }

      alert('Asset allocated successfully');
      setAllocation({ assetId: '', employeeId: '' }); 
    } catch (error) {
      console.error('Error allocating asset:', error);
    }
  };

  return (
    <div>
      <h2>Allocate Asset</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Asset:
          <select name="assetId" value={allocation.assetId} onChange={handleChange} required>
            <option value="">Select an asset</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
        </label>
        <label>
          Select Employee:
          <select name="employeeId" value={allocation.employeeId} onChange={handleChange} required>
            <option value="">Select an employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Allocate Asset</button>
      </form>
    </div>
  );
};

export default AllocateAsset;
