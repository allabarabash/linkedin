import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <Router basename="/linkedin">
      <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path='/home' element={[<Header/>,<Home/>]}/>
      </Routes>
    </Router>
  );
}

export default App;
