import React from "react";
import { Dropdown, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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

  const testFunc = () => {
    console.log("hellloooo");
    console.log(projects);
  };

  return (
    <div>
      <NavBar renderBool={[true, true, false, false]} create={false} />
      <h1>List of Competitions Available</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Hackathon Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Length (hours)</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr>
              <td>{proj.name}</td>
              <td>{proj.description}</td>
              <td>{proj.date.substring(0, 10)}</td>
              <td>{proj.hours}</td>
              <td>
                <LinkContainer to={`/listing/${proj.id}`}>
                  <Button>View Listings</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <LinkContainer to="/listings">
        <Button>Show groups</Button>
      </LinkContainer> */}
    </div>
  );
};

export default SelectProject;
