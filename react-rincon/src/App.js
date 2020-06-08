import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Nav from './module/nav';
import List from './module/list';
import Edit from './module/edit';
import Add from './module/add';
import Home from './module/home';

import Profile from './module/profile';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Route path="/" exact component={Home}></Route>
      <Route path="/list" exact component={List}></Route>
      <Route path="/edit/:id" component={Edit}></Route>
      <Route path="/add" component={Add}></Route>

      <Route path="/profile" component={Profile}></Route>
    </div>
    </Router>
  );
}

export default App;
