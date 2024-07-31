import React, { createContext, useState, useContext } from 'react';

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);

  const addAsset = (asset) => setAssets([...assets, asset]);
  const updateAsset = (updatedAsset) =>
    setAssets(assets.map(asset => (asset.id === updatedAsset.id ? updatedAsset : asset)));
  const deleteAsset = (id) => setAssets(assets.filter(asset => asset.id !== id));

  return (
    <AssetContext.Provider value={{ assets, addAsset, updateAsset, deleteAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);
