import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { Component } from "react";
import { GroupT } from "types/types";

interface Props {}

interface State {
  groups: GroupT[];
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  filterGroupsOnName = (name: string) => {
    return this.state.groups.filter(
      (group) =>
        group.leader === name ||
        group.teammates.some((member) => member === name)
    );
  };

  override async componentDidMount() {
    this.setState({ groups: await this.getGroups() });
    document.title = "Home";
  }

  async getGroups(): Promise<GroupT[]> {
    var result: GroupT[] = [];
    await axios
      .get(`${config.API_URL}/group/`)
      .then((res) => {
        const groups = res.data;
        result = groups;
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  }

  override render() {
    return (
      <div>
        <NavBar renderBool={[true, false, false, false]} create={false} />
        <Jumbotron>
          <h1 className="title">Welcome to GroupUp</h1>
          <div>
            An easy tool for helping you find a group for your next Hackathon!
          </div>
          <LinkContainer to="/selection">
            <Button>Get Started</Button>
          </LinkContainer>
        </Jumbotron>
      </div>
    );
  }
}
