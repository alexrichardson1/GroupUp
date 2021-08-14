import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ListGroup, Table, Modal } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { UserContext } from "components/auth/UserContext";
import { ProjectT } from "types/types";
import { dummyProject } from "api";

const DetailedGroup = () => {
  const { id, projectId } = useParams<{ id: string; projectId: string }>();
  const groupId = parseInt(id);
  const history = useHistory();
  const [email, setEmail] = useState<String>("");
  const [leader, setLeader] = useState<String>("");
  const [maxMembers, setMaxMembers] = useState<Number>(0);
  const [teammates, setTeammates] = useState<String[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]); // requirement values: e.g. Java, +1
  const [adRequirements, setAdRequirements] = useState<String>("");
  const [project, setProject] = useState(dummyProject);

  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(maxMembers, teammates.length);
  const leaderFirstName = leader.split(" ")[0];

  const joinGroup = async () => {
    var result = {};
    await axios
      .post(`${config.API_URL}/group/join`, {
        groupid: groupId,
        name: user,
      })
      .then((res) => {
        const group = res.data;
        result = group;
        alert("Successfully joined group!");
        setTeammates([...teammates, user]);
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  };

  //@ts-ignore
  useEffect(async () => {
    const getGroup = async () => {
      await axios
        .post(`${config.API_URL}/group/one`, {
          groupid: groupId,
        })
        .then((res) => {
          const group = res.data;
          console.log(group);
          setLeader(group.leader);
          setMaxMembers(group.maxmembers);
          setTeammates(group.teammates);
          setRequirements(group.requirements);
          setAdRequirements(group.adrequirements);
          setEmail(group.leaderemail);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getProject = async () => {
      var result: ProjectT = dummyProject;
      await axios
        .get(`${config.API_URL}/project`)
        .then((res) => {
          const projects: ProjectT[] = res.data;
          const filteredProjects = projects.filter(
            (proj) => proj.id === parseInt(projectId)
          );
          if (filteredProjects[0]) {
            result = filteredProjects[0];
          }
          setProject(result);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    document.title = `${leader}'s Group`;
    await getGroup();
    await getProject();
  }, []);

  const isJoined = () => {
    return leader === user || teammates.some((name) => name === user);
  };

  return (
    <React.Fragment>
      <NavBar
        renderBool={[true, true, true, true]}
        id={parseInt(projectId)}
        create={false}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Leader Email: {email}.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>{leaderFirstName}'s Group</h1>
      <div>1 members needed.</div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Needed</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(requirements).map(([key, val]: [string, string]) => (
            <tr>
              <td>
                {
                  //@ts-ignore
                  project.requirements[key] === "Timezone"
                    ? "Timezone (UTC +/-)"
                    : //@ts-ignore
                      project.requirements[key]
                }
              </td>
              <td>
                {
                  //@ts-ignore
                  project.requirements[key] === "Timezone"
                    ? parseInt(val) > -1
                      ? "+" + val
                      : val
                    : val
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ListGroup.Item variant="dark">Other Members:</ListGroup.Item>
      <ListGroup variant="flush">
        {teammates.map((person) => (
          <ListGroup.Item>{person}</ListGroup.Item>
        ))}
      </ListGroup>
      {adRequirements && (
        <div>
          <h5>Additional Requirements:</h5>
          <div>{adRequirements}</div>
        </div>
      )}
      <Button onClick={() => history.goBack()}>Go Back</Button>
      <Button onClick={handleShow}>Contact Leader</Button>
      <Button
        onClick={() => {
          if (user) joinGroup();
        }}
        disabled={isJoined()}
      >
        {isJoined() ? "Already joined" : "Join Group"}
      </Button>
    </React.Fragment>
  );
};

export default DetailedGroup;
