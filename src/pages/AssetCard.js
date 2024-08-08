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
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 250px;
  display: flex;
  flex-direction: column;
  height: 300px; /* Adjust height as needed */
`;

const AssetImage = styled.img`
  width: 100%;
  height: 150px; /* Adjust height to fit your design */
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const AssetDetails = styled.div`
  padding: 10px; /* Reduce padding to minimize white space */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Push text towards the bottom */
  flex: 1; /* Allow details to fill remaining space */
`;

const AssetName = styled.p`
  font-size: 16px; /* Slightly smaller font size */
  color: #333;
  font-weight: bold;
  margin: 0 0 8px; /* Reduce margin to save space */
`;

const AssetDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 8px; /* Reduce margin to save space */
`;

const AssetCategory = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;
