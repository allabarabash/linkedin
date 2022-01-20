import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import { getUserAuth } from './actions';
import {connect} from "react-redux";

function App(props) {
    useEffect(() => {
        props.getUserAuth();
    }, []);
  return (
    <BrowserRouter basename="/linkedin">
      <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path='/home' element={[<Header/>,<Home/>]}/>
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    getUserAuth: () => {
        return dispatch(getUserAuth());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
