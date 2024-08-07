import React, { useState } from 'react';
import './assetform.css';

const AddAssetForm = () => {
  const [asset, setAsset] = useState({
    name: '',
    description: '',
    category: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', asset.name);
    formData.append('description', asset.description);
    formData.append('category', asset.category);
    if (image) {
      formData.append('image', image);
    }

    formData.forEach((value, key) => {
      console.log(`FormData Key: ${key}, Value: ${value}`);
    });

    fetch('https://asset-inventory-backend.onrender.com/inventory/assets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.msg || 'Failed to add asset');
        });
      }
      return response.json();
    })
    .then((data) => {
      setSuccess('Asset added successfully');
    })
    .catch((error) => {
      setError(`Failed to add asset: ${error.message}`);
      console.error('Error adding asset:', error);
    });
  };

  return (
    <div className="add-asset-form-container">
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="add-asset-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={asset.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={asset.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={asset.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAssetForm;