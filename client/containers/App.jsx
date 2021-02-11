import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from '../containers/Login.jsx';
import Signup from '../containers/Signup.jsx';
import Landing from '../containers/Landing.jsx';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <Login/>
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/landing"> */}
          <Landing />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;