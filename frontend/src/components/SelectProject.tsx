import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { ProjectT } from "types/types";

const SelectProject = () => {
  const [projects, setProjects] = useState<ProjectT[]>([]);

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
    document.title = "Select a Hackathon";
    getProjects();
  }, []);

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
      <LinkContainer to="/createHackathon">
        <Button className="advertBtn">Add my Hackathon</Button>
      </LinkContainer>
    </div>
  );
};

export default SelectProject;
