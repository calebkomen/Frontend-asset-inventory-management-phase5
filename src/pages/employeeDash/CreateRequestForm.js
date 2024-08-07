import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateRequestForm = () => {
  const [formData, setFormData] = useState({
    asset_id: '',
    reason: '',
    quantity: '',
    urgency: ''
  });

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://asset-inventory-backend.onrender.com/inventory/requests');
        // Assuming the API returns an array of assets; adjust based on actual response
        setAssets(response.data.assets || []);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      const response = await fetch('https://asset-inventory-backend.onrender.com/inventory/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Request submitted successfully!');
        setFormData({
          asset_id: '',
          reason: '',
          quantity: '',
          urgency: ''
        });
      } else {
        alert('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="asset_id">Asset ID</label>
        <input
          type="number"
          id="asset_id"
          name="asset_id"
          value={formData.asset_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="reason">Reason</label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="urgency">Urgency</label>
        <select
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
        </select>
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default CreateRequestForm;
