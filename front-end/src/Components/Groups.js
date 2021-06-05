import Group from "./Group";
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Groups = ({ groups }) => {
  return (
    <div>
      <h3>2 Groups looking for members in Project X</h3>
      <LinkContainer to="/createGroup">
        <Button>Advertise my group!</Button>
      </LinkContainer>
      {groups.map((group) => (
        <Group group={group} key={group.id} />
      ))}
    </div>
  );
};

export default Groups;
