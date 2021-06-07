import React, { useState } from "react";
import { Button, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import years from "../data/years.json";
import projects from "../data/projects.json";
import { useHistory } from 'react-router-dom';

const SelectProject = (props) => {

  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push("/listing/" + id)
    // console.log("ayob")
  }

  return (
    <div>
      <h1>List of Competitions Available</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Project
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {projects.map((proj) => (
            <Dropdown.Item onSelect={() => handleProjectClick(proj.id)}>{proj.name}</Dropdown.Item>
          ))}
          {//Add href="#/your-action" when action available
          }
        </Dropdown.Menu>
      </Dropdown>
      {/* <LinkContainer to="/listings">
        <Button>Show groups</Button>
      </LinkContainer> */}
    </div >
  );
};

export default SelectProject;
