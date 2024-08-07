import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AssetCard from './AssetCard'; // Adjust the path if necessary

const Assets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/inventory/assets');
        const data = await response.json();
        
        console.log('Fetched data:', data); // Log the fetched data

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
            image={asset.image}
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
  text-align: center; /* Fixed typo from "text-align: c" to "center" */
  margin-bottom: 20px;
`;

const AssetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
