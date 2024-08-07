// In src/pages/Assets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Update the path accordingly
import AssetCard from './AssetCard'; // Adjust the path if needed
import styled from 'styled-components';

const Assets = () => {
  const { token } = useAuth(); // Assumes useAuth provides a token
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://asset-inventory-backend.onrender.com/inventory/assets', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        const data = response.data;
        
        if (Array.isArray(data)) {
          setAssets(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
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
            image={asset.image}
          />
        ))}
      </AssetsContainer>
    </Container>
  );
};

export default Assets;

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const AssetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
