import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './components/signin/SignIn';
import SignUp from './components/signin/SignUp';
import Home from './components/Home/home';
// import AssetList from './components/assets/AssetList';

import './App.css';

// import Navbar from './components/Navbar/navbar';
import AssetList from './components/assets/AssetList';
// import AssetDetail from './components/assets/assetDetail';
// import AssetCreate from './components/assets/assetCreate';
// import AssetEdit from './components/assets/assetEdit';



const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/home" element={<Home />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
           

            {/* <Route path="/create" element={<AssetCreate />} /> */}
            {/* <Route path="/:id" element={<AssetDetail />} /> */}
            {/* <Route path="/:id/edit" element={<AssetEdit />} /> */}

          </Route>
          {/* <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;