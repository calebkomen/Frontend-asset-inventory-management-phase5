import React from 'react';
import { useAssets } from '../context/AssetContext';

const Assets = () => {
  const { assets } = useAssets();
  
  return (
    <div>
      <h2>Assets</h2>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>{asset.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Assets;
