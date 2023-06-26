import React from 'react';

const AssetItem = ({ asset }) => {
  return (
    <div>
      <h3>Asset ID: {asset.asset_id}</h3>
      <p>Description: {asset.description}</p>
      <p>Physical Status: {asset.physical_status}</p>
      {/* Display other asset details here */}
    </div>
  );
};

export default AssetItem;
