import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import years from "./years.json";

const SelectProject = (props) => {
  return (
    <div>
      <body>
        Please give us more details about your project so we can help you find
        the best team for you.
      </body>
      <h1>Imperial</h1>
      Year <DropdownMenu promt="Select year" years={years} />
      Project <DropdownMenu promt="Select project" years={years} />
      <Link to="/listings">
        <button className="btn">Find your group</button>
      </Link>
    </div>
  );
};

export default SelectProject;
