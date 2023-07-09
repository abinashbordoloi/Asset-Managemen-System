import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/assets?page=1&searchTerm=' + searchTerm).then((response) => {
      setAssets(response.data);
    });
  }, [page, searchTerm]);

//   const handlePageChange = (event) => {
//     setPage(event.target.value);
//   };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Asset List</h2>
      <div>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <ul>
        {assets.slice((page - 1) * 10, page * 10).map((asset) => (
          <li key={asset.id}>
            {asset.name} - {asset.category} ({asset.status})
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AssetList;
