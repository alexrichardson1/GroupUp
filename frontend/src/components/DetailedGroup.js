import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ListGroup, Table, Modal } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { UserContext } from "components/auth/UserContext";
import ContactDetails from "components/ContactDetails";

const DetailedGroup = () => {
  const { id } = useParams();
  const groupId = parseInt(id);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [leader, setLeader] = useState("");
  const [maxMembers, setMaxMembers] = useState(0);
  const [teammates, setTeammates] = useState([]);
  const [requirements, setRequirements] = useState({});
  const [adRequirements, setAdRequirements] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  const hide = () => {
    setShow(false);
  };
  const { value } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(maxMembers, teammates.length);
  const leaderFirstName = leader.split(" ")[0];

  const joinGroup = async () => {
    var result = {};
    await axios
      .post(`${config.API_URL}/group/join`, {
        groupid: groupId,
        name: value,
      })
      .then((res) => {
        const group = res.data;
        result = group;
        alert("Successfully joined group!");
        setTeammates([...teammates, value]);
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  };

  useEffect(() => {
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
          setProjectId(group.projectid);
          setEmail(group.leaderemail);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getProject = async () => {
      var result = "";
      await axios
        .get(`${config.API_URL}/project`)
        .then((res) => {
          const projects = res.data;
          result = projects.filter((proj) => proj.id === projectId)[0];
          setProject(result);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    document.title = `${leader}'s Group`;
    getProject();
    getGroup();
  }, [groupId, projectId, leader]);

  const isJoined = () => {
    return leader === value || teammates.some((name) => name === value);
  };

  return (
    <React.Fragment>
      <NavBar
        renderBool={[true, true, true, true]}
        id={projectId}
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
          {Object.entries(requirements).map(([key, val]) => (
            <tr>
              <td>
                {project.requirements[key] === "Timezone"
                  ? "Timezone (UTC +/-)"
                  : project.requirements[key]}
              </td>
              <td>
                {project.requirements[key] === "Timezone"
                  ? val > -1
                    ? "+" + val
                    : val
                  : val}
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
          if (value) joinGroup();
        }}
        disabled={isJoined() ? "disabled" : ""}
      >
        {isJoined() ? "Already joined" : "Join Group"}
      </Button>
    </React.Fragment>
  );
};

export default DetailedGroup;
