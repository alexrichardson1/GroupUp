import React from "react";
// import ReactDOM from "react-dom";
import data from "./teams";
import Groups from "./Components/Groups";
// import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Test from "./Components/Test";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <h3> 2 Groups looking for members in Project X</h3>
              <Groups groups={data} />
            </div>
          )}
        ></Route>
        <Route path="/test" component={Test}></Route>
        <Link to="/test">A LINK</Link>
      </div>
    </Router>
  );
};

// Wrap everything in Router
// Specify routes at the beginning, so whenever you link to the
// path specified, it will take you to whatever is rendered.
// If the thing you want to render is just a component, you can
// link that directly without using render=... .

export default App;
