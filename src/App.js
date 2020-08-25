import React from 'react';
import './App.css';
import LoginIn from './LoginIn'
import Todo from './Todo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="App" >
        
        <Switch>
          <Route exact path="/todo">
            <LoginIn />
          </Route>
          <Route path="/todo/todo">
            <Todo />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
