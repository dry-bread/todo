import React from 'react';
import './App.css';
import LoginIn from './LoginIn'
import Todo from './Todo'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="App" >
        
        <Switch>
          <Route exact path="/">
            <LoginIn />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
