import React from "react";
import data from "./Teams";
import Groups from "./Components/Groups";
import Home from "./Components/Home";
import SelectProject from "./Components/SelectProject";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Home}></Route>
        <Route path="/selection" exact component={SelectProject}></Route>
        <Route
          path="/listings"
          exact
          render={() => (
            <div>
              <h3> 2 Groups looking for members in Project X</h3>
              <Groups groups={data} />
            </div>
          )}
        ></Route>
      </div>
    </Router>
  );
};

export default App;
