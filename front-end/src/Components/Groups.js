import Group from "./Group";
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from "react-router-dom";

const Groups = ({ groups }) => {
  const { id } = useParams();
  const groupId = parseInt(id);
  const totalGroups = groups.length

  return (
    <div>
      <h3>{totalGroups} Groups looking for members in Hackathon</h3>
      <LinkContainer to="/createGroup">
        <Button>Advertise my group!</Button>
      </LinkContainer>
      {groups.filter((group) => (group.projectId === groupId)).map((group) => (
        <Group group={group} key={group.id} />
      ))}
    </div>
  );
};

export default Groups;
