import styled from 'styled-components';

const AvailableAssetsCards = ({ asset, onEditClick, onDelete }) => {
  const { name, description, category, image_url } = asset;

  const handleDeleteClick = () => {
    console.log('Deleting asset with ID:', asset.id);
    onDelete(asset.id);
  };

  return (
    <Card>
      <AssetImage src={image_url} alt={name} onError={(e) => e.target.src = 'fallback-image-url.jpg'} />
      <AssetDetails>
        <AssetName>{name}</AssetName>
        <AssetDescription>{description}</AssetDescription>
        <AssetCategory>{category}</AssetCategory>
        <ButtonContainer>
          <EditButton onClick={() => onEditClick(asset)}>Update</EditButton>
          <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
        </ButtonContainer>
      </AssetDetails>
    </Card>
  );
};

export default AvailableAssetsCards;

const Card = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 220px; /* Adjusted width */
  height: 275px; /* Adjusted height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const AssetImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 120px; /* Adjusted max-height */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const AssetDetails = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const AssetName = styled.p`
  font-size: 14px; /* Adjusted font size */
  color: #333;
  font-weight: bold;
  margin: 0 0 8px;
`;

const AssetDescription = styled.p`
  font-size: 12px; /* Adjusted font size */
  color: #555;
  margin: 0 0 8px;
`;

const AssetCategory = styled.p`
  font-size: 10px; /* Adjusted font size */
  color: #888;
  margin: 0;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 8px;
  width: 100%;
`;

const EditButton = styled.button`
  flex: 1;
  padding: 8px;
  background-color: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #1f434e;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 8px;
  background-color: #e57373;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #c62828;
  }
`;