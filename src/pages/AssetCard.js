import React from 'react';
import styled from 'styled-components';

const AssetCard = ({ name, description, category, image }) => {
  console.log('Rendering AssetCard with image URL:', image); // Log the image URL

  return (
    <Card>
      <AssetImage src={image} alt={name} onError={(e) => e.target.src = 'fallback-image-url.jpg'} />
      <AssetDetails>
        <AssetName>{name}</AssetName>
        <AssetDescription>{description}</AssetDescription>
        <AssetCategory>{category}</AssetCategory>
      </AssetDetails>
    </Card>
  );
};

export default AssetCard;

// Styling
const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
`;

const AssetImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const AssetDetails = styled.div`
  text-align: left;
`;

const AssetName = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin: 0 0 10px;
`;

const AssetDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 10px;
`;

const AssetCategory = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;
