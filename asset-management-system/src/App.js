import React, { useState } from 'react';
import AvailableAssets from './components/assets/AvailableAssets';
import AssetForm from './components/assets/AssetForm';
const App = () => {
  const [assets, setAssets] = useState([]);

  const addAsset = (newAsset) => {
    setAssets((prevAssets) => [...prevAssets, newAsset]);
  };

  const updateAsset = (updatedAsset) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.asset_id === updatedAsset.asset_id ? updatedAsset : asset
      )
    );
  };

  const deleteAsset = (assetId) => {
    setAssets((prevAssets) =>
      prevAssets.filter((asset) => asset.asset_id !== assetId)
    );
  };

  return (
    <div>
      <h1>Asset Management System</h1>
      <AvailableAssets assets={assets} onUpdate={updateAsset} onDelete={deleteAsset} />
      <AssetForm onSubmit={addAsset} />
    </div>
  );
};

export default App;
