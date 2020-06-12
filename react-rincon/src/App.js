import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Nav from './modules/nav';
/*
import List from './modules/list';
import Edit from './modules/edit';
import Add from './modules/add';
import Home from './modules/home';*/
import Profile from './modules/profile';
import Sesion from './modules/signin';


function App() {
  return (
    <Router>
    <div className="App">
      {
      <Nav/>
      /*
      <Route path="/" exact component={Home}></Route>
      <Route path="/list" exact component={List}></Route>
      <Route path="/edit/:id" component={Edit}></Route>
      <Route path="/add" component={Add}></Route>
      */}
      <Route path="/crear-perfil" component={Profile}></Route>
      <Route path="/iniciar-sesion" component={Sesion}></Route>
      

    </div>
    </Router>
  );
}

export default App;
