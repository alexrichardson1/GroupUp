import React from "react";
import Groups from "./Components/Groups";
import Home from "./Components/Home";
import SelectProject from "./Components/SelectProject";
import DetailedGroup from "./Components/DetailedGroup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import CreateGroup from "./Components/CreateGroup";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Home}></Route>
        <Route path="/selection" exact component={SelectProject}></Route>
        <Route path="/listings" exact render={() => <Groups />}></Route>
        <Route path="/group/:id" children={<DetailedGroup />}></Route>
        <Route path="/listing/:id" children={<Groups />}></Route>
        <Route path="/createGroup" exact component={CreateGroup}></Route>
      </div>
    </Router>
  );
};

export default App;
