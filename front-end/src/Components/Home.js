import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome or something like that.</h1>
      <Link to="/selection">
        <button className="btn">Join a group</button>
      </Link>
      <button className="btn">Create a group</button>
    </div>
  );
};

export default Home;
