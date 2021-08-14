import { Button, Card, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { GroupT } from "types/types";

const MONTH_IN_MS = 2629800000;
const WEEK_IN_MS = 604800000;
const DAY_IN_MS = 86400000;

interface Props {
  group: GroupT;
  requirementNames: string[];
  projectId: number;
}

const Group = ({ group, requirementNames, projectId }: Props) => {
  const { id, leader, requirements, posted } = group;

  let groupDetailsLink = "/group/" + id + "/" + projectId;

  const getPostedTimeAgo = () => {
    if (posted == null) {
      return "Date unknown";
    }
    console.log(posted);
    const dayAsDate = new Date(posted.substring(0, 10)).getTime();
    console.log("Day as milli: " + dayAsDate);

    const difference = Date.now() - dayAsDate;

    if (difference < MONTH_IN_MS) {
      if (difference > WEEK_IN_MS) {
        return "Posted " + Math.floor(difference / WEEK_IN_MS) + " weeks ago";
      } else if (difference > DAY_IN_MS) {
        return (
          "Posted " +
          Math.floor(difference / DAY_IN_MS) +
          (Math.floor(difference / DAY_IN_MS) === 1 ? " day ago" : " days ago")
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
                      {requirementNames[parseInt(key)] === "Timezone"
                        ? "Timezone (UTC +/-)"
                        : requirementNames[parseInt(key)]}
                    </td>
                    <td>
                      {requirementNames[parseInt(key)] === "Timezone"
                        ? parseInt(val) > -1
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
