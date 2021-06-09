import React from "react";
import { Dropdown } from "react-bootstrap";
import projects from "../data/projects.json";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";

const SelectProject = (props) => {
  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push("/listing/" + id);
  };

  return (
    <div>
      <NavBar renderBool={[true, true, false, false]} create={false} />
      <h1>List of Competitions Available</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Project
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {projects.map((proj) => (
            <Dropdown.Item
              key={proj.id}
              onSelect={() => handleProjectClick(proj.id)}
            >
              {proj.name}
            </Dropdown.Item>
          ))}
          {
            //Add href="#/your-action" when action available
          }
        </Dropdown.Menu>
      </Dropdown>
      {/* <LinkContainer to="/listings">
        <Button>Show groups</Button>
      </LinkContainer> */}
    </div>
  );
};

export default SelectProject;
