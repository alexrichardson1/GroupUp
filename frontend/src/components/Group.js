import { Button, Card, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Group = ({ group, requirementNames }) => {
  const { id, leader, requirements } = group;

  let groupDetailsLink = "/group/" + id;

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{leader}'s Group</Card.Title>
          <Card.Text>
            {/* <ListGroup.Item variant="dark">Requirements:</ListGroup.Item> */}
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
                      {requirementNames[key] === "Timezone"
                        ? "Timezone (UTC +/-)"
                        : requirementNames[key]}
                    </td>
                    <td>
                      {requirementNames[key] === "Timezone"
                        ? val > -1
                          ? "+" + val
                          : val
                        : val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <ListGroup variant="flush">
              {Object.entries(requirements).map(([key, val]) => (
                <ListGroup.Item key={key}>
                  {key} {val}
                </ListGroup.Item>
              ))}
            </ListGroup> */}
          </Card.Text>
          <Card.Footer className="text-muted datePosted">1 Day Ago</Card.Footer>
          <LinkContainer to={groupDetailsLink}>
            <Button>Find out more</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Group;
