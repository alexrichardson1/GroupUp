import React from "react";
import ReactDOM from "react-dom";
import data from "./teams";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  return (
    <main>
      <>
        <h1>Your teams</h1>
        <div></div>
        <ul className="list-group">
          {data.map((team) => {
            const { leader, teammates, requirements, adRequirements } = team;
            return (
              <li className="list-group-item">
                <React.Fragment>
                  <h1>{leader}'s Group</h1>
                  <h2>Other Members: {teammates.map((name) => name + " ")}</h2>
                  <h3>Requirements: {requirements}</h3>
                  <h3>Additional Requiremetnts: {adRequirements}</h3>
                </React.Fragment>
              </li>
            );
          })}
        </ul>
      </>
    </main>
  );
};

export default App;
