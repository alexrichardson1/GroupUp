import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import years from "../data/years.json";
import projects from "../data/projects.json";

const SelectProject = (props) => {
  const [yearValue, setYearValue] = useState(null);
  const [projectValue, setProjectValue] = useState(null);

  return (
    <div>
      <body>
        Please give us more details about your project so we can help you find
        the best team for you.
      </body>
      <h1>Imperial</h1>
      Year{" "}
      <DropdownMenu
        promt="Select year"
        options={years}
        value={yearValue}
        id="id"
        label="id"
        onChange={(val) => setYearValue(val)}
      />
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
        <button className="btn">Find your group</button>
      </Link>
    </div>
  );
};

export default SelectProject;
