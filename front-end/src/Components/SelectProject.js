import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
// import years from "../data/years.json";
import projects from "../data/projects.json";

const SelectProject = (props) => {
  // const [yearValue, setYearValue] = useState(null);
  const [projectValue, setProjectValue] = useState(null);

  return (
    <div>
      <h1>List of Competitions Available</h1>
      Project{" "}
      <DropdownMenu
        promt="Select project"
        options={projects}
        value={projectValue}
        id="name"
        label="name"
        onChange={(val) => setProjectValue(val)}
      />
      <Link to="/listings">
        <button className="btn">Show Listings</button>
      </Link>
    </div>
  );
};

export default SelectProject;
