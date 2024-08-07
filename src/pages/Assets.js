import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AssetCard from './AssetCard'; // Ensure this path is correct

const Assets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/inventory/assets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Fetched data:', data); // Log the fetched data

        // Check if data has a data property and it's an array
        if (data.status === 'success' && Array.isArray(data.data)) {
          setAssets(data.data);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

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
