import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron, Card, ListGroup } from "react-bootstrap";
import NavBar from "components/NavBar";

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
        <h3 className="groupsHome">Groups you're already in.</h3>
        <Card border="secondary">
          <Card.Body>
            <Card.Title>Jason Bourne's Group</Card.Title>
            <Card.Text>
              <ListGroup.Item variant="dark">Other Members:</ListGroup.Item>
              <ListGroup.Item variant="flush">You</ListGroup.Item>
              <ListGroup.Item variant="flush">Alex Duku</ListGroup.Item>
              <ListGroup.Item variant="flush">Jaimi Ajmeera</ListGroup.Item>
            </Card.Text>
            <LinkContainer to={"/group/0"}>
              <Button>More Info</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
        <Card border="secondary">
          <Card.Body>
            <Card.Title>Alice Ecila's Group</Card.Title>
            <Card.Text>
              <ListGroup.Item variant="dark">Other Members:</ListGroup.Item>
              <ListGroup.Item variant="flush">You</ListGroup.Item>
              <ListGroup.Item variant="flush">Jeff Jeffery</ListGroup.Item>
              <ListGroup.Item variant="flush">Harry Arnold</ListGroup.Item>
            </Card.Text>
            <LinkContainer to={"/group/1"}>
              <Button>More Info</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Jumbotron>
    </div>
  );
};

export default Home;
