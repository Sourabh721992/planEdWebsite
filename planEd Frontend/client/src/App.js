import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Login from "./components/Login";
import Teacher from "./components/TeacherDashboard";
import Navbar from "./components/layout/Navbar";
import LiveSession from "./components/LiveSession";
import Content from "./components/Content";
import Message from "./components/Message";
import ScheduleSession from "./components/ScheduleSession";
import About from "./components/About";
import Help from "./components/Help";
import Student from "./components/StudentDashboard";
import ForgotPassword from "./components/ForgetPassword";
import Batch from "./components/Batch";
import MangeInstructor from "./components/ManageInstructor";
import InstiSpecificLogin from "./components/InstiSpecificLogin";
import InstiAdvertising from "./components/InstiAdvertising";
import Website from "./components/Website";

import "./App.css";

if (localStorage.getItem("user")) {
  let userDetails = JSON.parse(localStorage.getItem("user"));
  store.dispatch(setCurrentUser(userDetails));

  //Check for expiration
  const currentTime = Math.trunc(new Date().getTime() / 1000);
  if (userDetails.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/default";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Route exact path="/" component={Website}></Route>
          <Route exact path="/default" component={Login}></Route>
          <Route exact path="/teacher" component={Teacher}></Route>
          <Route exact path="/student" component={Student}></Route>
          <Route exact path="/livesession" component={LiveSession}></Route>
          <Route exact path="/content" component={Content}></Route>
          <Route exact path="/message" component={Message}></Route>
          <Route exact path="/session" component={ScheduleSession}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/help" component={Help}></Route>
          <Route exact path="/password" component={ForgotPassword}></Route>
          <Route exact path="/batch" component={Batch}></Route>
          <Route path="/login" component={InstiSpecificLogin}></Route>
          <Route
            exact
            path="/manageinstructor"
            component={MangeInstructor}
          ></Route>
          <Route
            exact
            path="/instiadvertising"
            component={InstiAdvertising}
          ></Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
