import React from 'react';
import reactDom from 'react-dom';
// import './style.css' ;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserList from './components/users/userscrud';
// import SignIn from './components/signin/SignIn';
// import SignUp from './components/signin/SignUp';
// import Home from './components/Home/home';
// import DisplayUsers from './components/users/viewusers';
// import AssetList from './components/assets/AssetList';

// import './App.css';

// import Navbar from './components/Navbar/navbar';
// import AssetList from './components/assets/AssetList';

// import AssetDetail from './components/assets/assetDetail';
// import AssetCreate from './components/assets/assetCreate';
// import AssetEdit from './components/assets/assetEdit';



const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<UserList />}>
            {/* <Route path="/users" element={<DisplayUsers />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            */}

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