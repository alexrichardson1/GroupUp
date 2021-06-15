import React from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../Constants";

const SelectProject = () => {
  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push("/listing/" + id);
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      await axios
        .get(`${config.API_URL}/project`)
        .then((res) => {
          const projects = res.data;
          console.log(projects);
          setProjects(projects);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProjects();
  }, []);

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
