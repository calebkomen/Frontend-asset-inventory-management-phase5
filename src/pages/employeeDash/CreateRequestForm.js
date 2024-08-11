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
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="asset_id">Asset ID</label>
          <input
            style={styles.input}
            type="number"
            id="asset_id"
            name="asset_id"
            value={formData.asset_id}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="reason">Reason</label>
          <input
            style={styles.input}
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="quantity">Quantity</label>
          <input
            style={styles.input}
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="urgency">Urgency</label>
          <select
            style={styles.input}
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
        <button style={styles.button} type="submit">Submit Request</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#2e7d32',
    color: 'white',
    cursor: 'pointer'
  },
  buttonHover: {
    backgroundColor: '#1f434e'
  }
};

export default CreateRequestForm;
