import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path ="/signup" component={SignIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
