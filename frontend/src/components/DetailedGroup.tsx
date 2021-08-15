import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, ListGroup, Table, Modal } from "react-bootstrap";
import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { dummyProject, getGroup, getProject, joinGroup } from "common/api";

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

  //@ts-ignore
  useEffect(async () => {
    const {
      leader,
      maxmembers,
      teammates,
      requirements,
      adrequirements,
      leaderemail,
    } = await getGroup(groupId);
    setLeader(leader);
    document.title = `${leader}'s Group`;
    setMaxMembers(maxmembers);
    setTeammates(teammates);
    setRequirements(requirements);
    setAdRequirements(adrequirements);
    setEmail(leaderemail);
    setProject(await getProject(parseInt(projectId)));
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
          joinGroup(groupId, user);
        }}
        disabled={isJoined()}
      >
        {isJoined() ? "Already joined" : "Join Group"}
      </Button>
    </React.Fragment>
  );
};

export default DetailedGroup;
