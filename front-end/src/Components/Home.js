import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to GroupUp, the easy tool for helping you find a competition group.</h1>
      <Link to="/selection">
        <button className="btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
