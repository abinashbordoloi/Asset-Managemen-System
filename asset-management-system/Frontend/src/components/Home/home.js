// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [assets, setAssets] = useState([]);

//   useEffect(() => {
//     axios.get('/assets').then((response) => {
//       setAssets(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Welcome to Asset Management System</h2>

//       <h3>Assets Overview</h3>
//       <ul>
//         {assets.map((asset) => (
//           <li key={asset.id}>
//             {asset.name} - {asset.category} ({asset.status})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get('/assets').then((response) => {
      setAssets(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to Asset Management System</h2>

      <h3 className="text-xl font-bold mb-2">Assets Overview</h3>
      <ul className="list-disc list-inside">
        {assets.map((asset) => (
          <li className="mb-2" key={asset.id}>
            {asset.name} - {asset.category} ({asset.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
