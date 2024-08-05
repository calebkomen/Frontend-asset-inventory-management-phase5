import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
          <AssetCard key={asset.id}>
            <AssetName>{asset.name}</AssetName>
          </AssetCard>
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
  text-align: c;
  margin-bottom: 20px;
`;

const AssetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const AssetCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
`;

const AssetName = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
`;
