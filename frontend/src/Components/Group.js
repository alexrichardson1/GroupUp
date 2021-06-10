import { Button, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Group = ({ group }) => {
  const { id, leader, requirements } = group;

  let groupDetailsLink = "/group/" + id;
  const requirementNameList = ["Language"];

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{leader}'s Group</Card.Title>
          <Card.Text>
            <ListGroup.Item variant="dark">Requirements:</ListGroup.Item>
            <ListGroup variant="flush">
              {requirements.map((req, i) => {
                return (
                  <ListGroup.Item key={i}>
                    {requirementNameList[i]}: {req}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Text>
          <LinkContainer to={groupDetailsLink}>
            <Button>Find out more</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Group;
