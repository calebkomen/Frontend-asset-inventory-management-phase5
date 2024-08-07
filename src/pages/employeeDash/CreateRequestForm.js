import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CreateRequestForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    asset_id: '',
    reason: '',
    quantity: '',
    urgency: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitting request with the following data:', formData);

    fetch('https://asset-inventory-backend.onrender.com/inventory/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to submit request');
      }
    })
    .then(data => {
      alert('Request submitted successfully!');
      setFormData({
        asset_id: '',
        reason: '',
        quantity: '',
        urgency: ''
      });
    })
    .catch(error => {
      console.error('Error submitting request:', error);
      alert('Failed to submit request');
    });
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