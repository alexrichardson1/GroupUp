import React, { useState } from "react";
import { Button, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import years from "../data/years.json";
import projects from "../data/projects.json";

const SelectProject = (props) => {
  // const [yearValue, setYearValue] = useState(null);
  const [projectValue, setProjectValue] = useState(null);

  return (
    <div>
      <h1>List of Competitions Available</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Project
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {projects.map((proj) => (
            <Dropdown.Item>{proj.name}</Dropdown.Item>
          ))}
          {//Add href="#/your-action" when action available
          }
        </Dropdown.Menu>
      </Dropdown>
      <LinkContainer to="/listings">
        <Button>Show groups</Button>
      </LinkContainer>
    </div >
  );
};

export default SelectProject;
