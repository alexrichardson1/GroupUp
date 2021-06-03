import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import years from "./years.json";
import projects from "./projects.json";

const SelectProject = (props) => {
  const [value, setValue] = useState(null);

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
        value={value}
        onChange={(val) => setValue(val)}
      />
      {/* Project <DropdownMenu promt="Select project" options={projects} /> */}
      <Link to="/listings">
        <button className="btn">Find your group</button>
      </Link>
    </div>
  );
};

export default SelectProject;
