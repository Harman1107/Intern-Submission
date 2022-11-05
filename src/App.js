import React, { useState, useEffect } from 'react';
import Home from "./components/Home"
import { BrowserRouter as Router , Route,Routes, Link} from "react-router-dom"
import Lazy from "./components/Lazy"
import './App.css';

const App = () => {

  return (
    <Router>
    <Routes>
      <Route extact path = "/" element = {<Home/>} /> 
      <Route extact path = "/lazy" element = {<Lazy/>} />
    </Routes>
    </Router>
  );
};

export default App;
