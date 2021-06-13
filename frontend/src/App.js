import React from "react";
import Groups from "components/Groups";
import Home from "components/Home";
import SelectProject from "components/SelectProject";
import DetailedGroup from "components/DetailedGroup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "App.css";
import CreateGroup from "components/CreateGroup";
import Login from "components/auth/Login";
import SignUp from "components/auth/SignUp";
import ForgotPassword from "components/auth/ForgotPassword";
import data from "Teams";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Login}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
        <Route path="/forgotpassword" exact component={ForgotPassword}></Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/selection" exact component={SelectProject}></Route>
        <Route path="/listings" exact render={() => <Groups />}></Route>
        <Route path="/group/:id" children={<DetailedGroup />}></Route>
        <Route
          path="/listing/:id"
          children={<Groups allGroups={data} />}
        ></Route>
        <Route path="/createGroup" exact component={CreateGroup}></Route>
      </div>
    </Router>
  );
};

export default App;
