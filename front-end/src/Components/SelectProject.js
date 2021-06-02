import { Link } from "react-router-dom";

const SelectProject = (props) => {
  return (
    <div>
      {/* <DropdownMenu /> */}
      <Link to="/listings">
        <button className="btn">Join a group</button>
      </Link>
      <DropdownMenu />
    </div>
  );
};

export default SelectProject;
