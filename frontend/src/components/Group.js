import { Button, Card, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Group = ({ group, requirementNames }) => {
  const { id, leader, requirements, posted } = group;

  let groupDetailsLink = "/group/" + id;

  const date = new Date();

  const getPostedTimeAgo = () => {
    if (posted == null) {
      return "Date unknown";
    }
    const dayAsDate = new Date(posted.substring(0, 10));

    const hoursToMills = 3600000 * parseInt(posted.substring(11, 13));
    const minutesToMills = 60000 * parseInt(posted.substring(14, 16));
    const secondsToMills = 1000 * parseInt(posted.substring(17, 19));

    const datePostedAsNum =
      dayAsDate + hoursToMills + minutesToMills + secondsToMills;

    const difference = new Date() - datePostedAsNum;

    if (difference < 2629800000) {
      if (difference > 604800000) {
        return "Posted " + Math.floor(difference / 604800000) + " weeks ago";
      } else if (difference > 86400000) {
        return "Posted " + Math.floor(difference / 86400000) + " days ago";
      } else if (difference > 3600000) {
        return "Posted " + Math.floor(difference / 3600000) + " hours ago";
      } else {
        return "Posted less than an hour ago";
      }
    } else {
      return "Posted more than a month ago";
    }
  };

  const dbDateToNumber = (curDate) => {};

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
          </Card.Text>
          <Card.Footer className="text-muted datePosted">
            {getPostedTimeAgo()}
          </Card.Footer>
          <LinkContainer to={groupDetailsLink}>
            <Button>Find out more</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Group;
