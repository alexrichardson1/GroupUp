import Group from "./Group";
import { Link } from "react-router-dom";

const Groups = ({ groups }) => {
  return (
    <div>
      <h3>2 Groups looking for members in Project X</h3>
      <Link to="/createGroup">
        <button className="btn">Advertise my group!</button>
      </Link>
      {groups.map((group) => (
        <Group group={group} key={group.id} />
      ))}
    </div>
  );
};

export default Groups;
