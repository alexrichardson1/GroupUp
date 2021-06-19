import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { UserContext } from "components/auth/UserContext";
import { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  filterGroupsOnName = (name) => {
    return this.state.groups.filter(
      (group) =>
        group.leader === name ||
        group.teammates.some((member) => member === name)
    );
  };

  async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    document.title = "Home";
  }

  async getGroups() {
    let result = "";
    await axios
      .get(`${config.API_URL}/group/`)
      .then((res) => {
        const group = res.data;
        result = group;
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ email, value }) => (
          <div>
            <NavBar renderBool={[true, false, false, false]} create={false} />
            {/* <Button onClick={() => this.getPersonalisedGroups(email)}>
              sdsd
            </Button> */}
            <Jumbotron>
              <h1 className="title">Welcome to GroupUp</h1>
              <div>
                An easy tool for helping you find a group for your next
                Hackathon!
              </div>
              <LinkContainer to="/selection">
                <Button>Get Started</Button>
              </LinkContainer>
            </Jumbotron>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
