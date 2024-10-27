import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const UpdateAssetForm = ({ assetId, assetData, onClose }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (assetData) {
      setFormData({
        name: assetData.name || '',
        description: assetData.description || '',
        category: assetData.category || '',
        image: null, // Reset image to allow file re-selection
      });
    }
  }, [assetData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setSelectedFile(files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch(`https://asset-inventory-backend.onrender.com/inventory/assets/${assetId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formDataToSend,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update asset');
        }
        return response.json();
      })
      .then(data => {
        alert('Asset updated successfully');
<<<<<<< HEAD
        onClose(); // Close the form after a successful update
=======
        onClose(); // Close the form after successful update
>>>>>>> e6c7363c1fe02e9136698be57918d0932ec9c720
      })
      .catch(error => {
        console.error('Error updating asset:', error);
        alert('Failed to update asset');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Update Asset</Title>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="category">Category:</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image:</Label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </FormGroup>
        <ButtonContainer>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Asset'}
          </SubmitButton>
          <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default UpdateAssetForm;

// Styled Components
const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 300px;
  z-index: 1000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background-color: #2e7d32;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #1f434e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #e57373;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c62828;
  }
`;
