import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const UpdateAssetForm = ({ assetId }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    // Add other fields as necessary
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    if (selectedFile) {
      formDataToSend.append('image', selectedFile);
    }

    fetch(`https://asset-inventory-backend.onrender.com/inventory/assets/${assetId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataToSend
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Asset updated successfully!');
          setFormData({
            name: '',
            description: '',
            category: '',
            // Reset other fields as necessary
          });
          setSelectedFile(null);
        } else {
          alert('Failed to update asset');
        }
      })
      .catch(error => {
        console.error('Error updating asset:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Asset Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other fields as necessary */}
      <div>
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Update Asset</button>
    </form>
  );
};

export default UpdateAssetForm;
