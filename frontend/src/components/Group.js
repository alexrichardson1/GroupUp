import { Button, Card, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Group = ({ group, requirementNames }) => {
  const { id, leader, requirements, posted } = group;

  let groupDetailsLink = "/group/" + id;

  const getPostedTimeAgo = () => {
    if (posted == null) {
      return "Date unknown";
    }
    console.log(posted);
    const dayAsDate = new Date(posted.substring(0, 10)).getTime();
    console.log("Day as milli: " + dayAsDate);

    // const hoursToMills = 3600000 * parseInt(posted.substring(11, 13));
    // const minutesToMills = 60000 * parseInt(posted.substring(14, 16));

    // const datePostedAsNum = dayAsDate + hoursToMills + minutesToMills;

    const difference = Date.now() - dayAsDate;

    if (difference < 2629800000) {
      if (difference > 604800000) {
        return "Posted " + Math.floor(difference / 604800000) + " weeks ago";
      } else if (difference > 86400000) {
        return (
          "Posted " +
          Math.floor(difference / 86400000) +
          (Math.floor(difference / 86400000) === 1 ? " day ago" : " days ago")
        );
      } else {
        return "Posted less than a day ago.";
      }
    } else {
      return "Posted more than a month ago";
    }
  };

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
