import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AssetCard from './AssetCard'; // Adjust the path if necessary
import { useAuth } from '../context/AuthContext'; // Adjusted import path

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    // Fetch assets from the backend API
    fetch('https://asset-inventory-backend.onrender.com/inventory/assets', {
      headers: {
        'Authorization': `Bearer ${token}` // Correctly formatted bearer token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data); // Log the fetched data

      // Extract the array of assets from the response object
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

  return (
    <Container>
      <Title>Assets</Title>
      <AssetsContainer>
        {assets.map(asset => (
          <AssetCard
            key={asset.id}
            name={asset.name}
            description={asset.description}
            category={asset.category}
            image={asset.image_url} // Ensure correct prop name
          />
        ))}
      </AssetsContainer>
    </Container>
  );
};

export default Assets;

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