import React, {Component} from 'react';
import "./App.css"
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Chat from "./Pages/Chat/Chat"
import Profile from "./Pages/Profile/Profile"
import firebase from "./Services/firebase"
import {toast ,ToastContainer} from "react-toastify"

class App extends Component{

  showToast = (type,message)=>{
    switch(type){
      case 0:
      toast.warning(message)
      case 1:
      toast.success(message)
      default:
      break;
    }
  }

  render(){
    return  (
      <Router>
      <ToastContainer
      autoClose = {2000}
      hideProgressBar = {true}
      position = {toast.POSITION.BOTTON_CENTER}
      />
      <Switch>
      <Route
      path = "/"
      exact
      render = {props => <Home {...props}/>}
      />

      <Route
      path = "/login"
      exact
      render = {props => <Login showToast = {this.showToast}{...props}/>}
      />

      <Route
      path = "/signup"
      exact
      render = {props => <Signup showToast = {this.showToast}{...props}/>}
      />

      <Route
      path = "/profile"
      exact
      render = {props => <Profile showToast = {this.showToast}{...props}/>}
      />

      <Route
      path = "/chat"
      exact
      render = {props => <Chat showToast = {this.showToast}{...props}/>}
      />
      </Switch>
      </Router>

    )
  }
}
export default App;
