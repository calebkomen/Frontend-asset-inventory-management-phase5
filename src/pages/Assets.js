import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AssetCard from './AssetCard'; // Adjust the path if necessary
import { useAuth } from '../context/AuthContext'; // Adjusted import path
import { FaSearch } from 'react-icons/fa'; // Importing the search icon

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filter assets based on search term
  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Assets</Title>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </SearchContainer>
      </Header>
      <AssetsContainer>
        {filteredAssets.map(asset => (
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  flex: 1; /* Allow the title to take available space */
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 5px 15px;
  width: 200px; /* Adjust the width as needed */
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  font-size: 16px;
  width: calc(100% - 30px); /* Adjust width to account for the icon */
  border-radius: 25px;
`;

const SearchIcon = styled(FaSearch)`
  color: #aaa;
  margin-left: 10px;
`;

const AssetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;