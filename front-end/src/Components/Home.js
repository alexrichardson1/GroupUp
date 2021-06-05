import { LinkContainer } from 'react-router-bootstrap'
import { Button, Jumbotron } from 'react-bootstrap'

const Home = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to GroupUp</h1>
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
