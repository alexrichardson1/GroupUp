import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron } from "react-bootstrap";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <NavBar renderBool={[true, false, false, false]} create={false} />
      <Jumbotron>
        <h1 className="title">Welcome to GroupUp</h1>
        <p>
          An easy tool for helping you find a group for your next Hackathon!
        </p>
        <LinkContainer to="/selection">
          <Button>Get Started</Button>
        </LinkContainer>
      </Jumbotron>
    </div>
  );
};

export default Home;
