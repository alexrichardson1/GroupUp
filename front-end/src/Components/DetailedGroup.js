import React from "react";
import { useParams } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import data from "../Teams";
import { Button, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const DetailedGroup = () => {
  const { id } = useParams();
  const groupId = parseInt(id);
  const { leader, maxMembers, teammates, requirements, adRequirements } =
    data.filter((group) => group.id === groupId)[0];
  const membersNeeded = maxMembers - teammates.length;
  console.log(maxMembers, teammates.length);
  const leaderFirstName = leader.split(" ")[0];
  const timezone = requirements["Timezone"];
  const timezoneMessage = timezone > 0 ? `+${timezone}` : `-${timezone}`;

  return (
    <React.Fragment>
      <h1>{leaderFirstName}'s Group</h1>
      <p>{membersNeeded} members needed.</p>
      <ListGroup variant="flush">
        <ListGroup.Item variant="dark">Requirements:</ListGroup.Item>
        {Object.entries(requirements).map(([key, val]) => (
          <ListGroup.Item>{key}: {val}</ListGroup.Item>
        ))}
      </ListGroup>
      <h1></h1>
      <ListGroup.Item variant="dark">Other Members:</ListGroup.Item>
      <ListGroup variant="flush">
        {teammates.map((person) => (
          <ListGroup.Item>{person}</ListGroup.Item>
        ))}
      </ListGroup>
      {adRequirements && (
        <div>
          <h5>Additional Requirements:</h5>
          <p>{adRequirements}</p>
        </div>
      )}
      <LinkContainer to="/listings">
        <Button>Go Back</Button>
      </LinkContainer>
      <Button>Show groups</Button>
    </React.Fragment>
  );
};

export default DetailedGroup;
