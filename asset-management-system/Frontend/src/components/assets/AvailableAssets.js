import React from 'react';
import AssetItem from './DisplayAssets';

const AssetList = ({ assets }) => {
  return (
    <div>
      <h2>Asset List</h2>
      {assets.map((asset) => (
        <AssetItem key={asset.asset_id} asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
