import React from "react";
import ReactDOM from "react-dom";
import data from "./teams";
import Team from "./Team";

import "./App.css";

const App = () => {
  return (
    <main>
      <>
        <h1>Your teams</h1>
        {data.map((team) => {
          const { leader, teammates, requirements, adRequirements } = team;
          return (
            <React.Fragment>
              <h1>{leader}'s Group</h1>
              <h2>Other Members: {teammates}</h2>
              <h3>Requirements: {requirements}</h3>
              <h3>Additional Requiremetnts: {adRequirements}</h3>
            </React.Fragment>
          );
        })}
      </>
    </main>
  );
};

export default App;
