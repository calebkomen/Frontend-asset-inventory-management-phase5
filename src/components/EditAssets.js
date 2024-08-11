import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AvailableAssetsCards from './AvailableAssetsCards';
import { useAuth } from '../context/AuthContext';
import UpdateAssetForm from '../pages/Admin/UpdateAssetForm';

const EditAssets = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetch('https://asset-inventory-backend.onrender.com/inventory/assets', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data.data)) {
        setAssets(data.data);
      } else {
        console.error('Expected an array but got:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching assets:', error);
    });
  }, [token]);

  const handleEditClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleDelete = (assetId) => {
    console.log(`Deleting asset with ID: ${assetId}`);
    
    fetch(`https://asset-inventory-backend.onrender.com/inventory/assets/${assetId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => {
          throw new Error(`Failed to delete asset: ${text}`);
        });
      }
    })
    .then(data => {
      console.log('Backend response:', data);
      // Check the exact structure of the response
      if (data.status === 'success') {
        // Update the assets state
        setAssets(prevAssets => {
          const updatedAssets = prevAssets.filter(asset => asset.id !== assetId);
          return updatedAssets;
        });
        console.log('Asset deleted successfully');
      } else {
        throw new Error('Failed to delete asset');
      }
    })
    .catch(error => {
      console.error('Error deleting asset:', error.message);
    });
  };

  const handleCloseForm = () => {
    setSelectedAsset(null);
  };

  return (
    <Container>
      <Title>Assets</Title>
      <AssetsContainer>
        {assets.map(asset => (
          <AvailableAssetsCards
            key={asset.id}
            asset={asset}
            onEditClick={() => handleEditClick(asset)}
            onDelete={() => handleDelete(asset.id)}
          />
        ))}
      </AssetsContainer>
      {selectedAsset && (
        <UpdateAssetForm
          assetId={selectedAsset.id}
          assetData={selectedAsset}
          onClose={handleCloseForm}
        />
      )}
    </Container>
  );
};

export default EditAssets;

// Styling
const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const AssetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
