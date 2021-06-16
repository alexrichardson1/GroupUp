import { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron, Card, ListGroup } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { UserContext } from "components/auth/UserContext";

export default class Home extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      project: "",
      requirements: [],
      filteredGroups: [],
      activeFilters: new Map(),
    };
  }

  async getGroups() {
    var result = [];
    await axios
      .get(`${config.API_URL}/group`)
      .then((res) => {
        const groups = res.data;
        result = groups;
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  async getProject() {
    var result = "";
    await axios
      .get(`${config.API_URL}/project`)
      .then((res) => {
        const projects = res.data;
        result = projects.filter(
          (proj) => proj.id === Number(this.props.id)
        )[0];
      })
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    this.setState({ project: await this.getProject() });
  }

  filterGroupsOnName = () => {
    // const { user, setUser } = this.context;
    this.state.groups.filter((group) => group.leader === "Reece");
  };

  render() {
    return (
      <div>
        <Button onClick={this.filterGroupsOnName()}></Button>
        <NavBar renderBool={[true, false, false, false]} create={false} />
        <Jumbotron>
          <h1 className="title">Welcome to GroupUp</h1>
          <div>
            An easy tool for helping you find a group for your next Hackathon!
          </div>
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
  }
}
