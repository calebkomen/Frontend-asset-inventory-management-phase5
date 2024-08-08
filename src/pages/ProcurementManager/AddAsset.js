import React, { useState } from 'react';

const AddAsset = () => {
  const [asset, setAsset] = useState({ name: '', category: '', imageUrl: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://example-api.com/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asset),
      });
      alert('Asset added successfully');
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  return (
    <div>
      <h2>Add Asset</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Asset Name:
          <input type="text" name="name" value={asset.name} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={asset.category} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={asset.imageUrl} onChange={handleChange} />
        </label>
        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAsset;
