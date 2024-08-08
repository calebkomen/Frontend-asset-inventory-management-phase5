import React, { useEffect, useState } from 'react';

const AllocateAsset = () => {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [allocation, setAllocation] = useState({ assetId: '', employeeId: '' });

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('https://example-api.com/assets');
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://example-api.com/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
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
      await fetch('https://example-api.com/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allocation),
      });
      alert('Asset allocated successfully');
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
