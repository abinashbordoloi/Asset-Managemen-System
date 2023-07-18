import React from 'react';
// import reactDom from 'react-dom';
// import './style.css' ;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAssetScreen from './components/assets/AssetScreen';

// import UserList from './components/users/usersList';
// import UserTable from './components/users/usertable';



const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          
          {/* <Route path="/" element={<UserPage/> }/>
            <Route path="/users" element={<UserList />} />  */}
            <Route path= "/assets" element={<AddAssetScreen/>} />

           


            {/* <Route path="/users" element={<DisplayUsers />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            */}

            {/* <Route path="/create" element={<AssetCreate />} /> */}
            {/* <Route path="/:id" element={<AssetDetail />} /> */}
            {/* <Route path="/:id/edit" element={<AssetEdit />} /> */}

          {/* </Route> */}
          {/* <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
