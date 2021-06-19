import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { UserContext } from "components/auth/UserContext";
import { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card, ListGroup } from "react-bootstrap";

export default class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredGroups: [],
    };
  }

  static contextType = UserContext;

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

  async componentDidMount() {
    this.setState({ filteredGroups: await this.getGroups() }, () =>
      this.filterMyGroups()
    );
  }

  filterMyGroups = () => {
    let value = this.context;
    const user = value.value;
    console.log(this.state.filteredGroups);
    console.log("groups ^");
    this.setState({
      filteredGroups: this.state.filteredGroups.filter(
        (gr) => gr.leader === user || gr.teammates.includes(user.split(" ")[0])
      ),
    });
  };

  render() {
    return (
      <div>
        <NavBar
          renderBool={[false, false, false, false]}
          create={false}
          savedSearches={true}
        />
        <h3 className="groupsHome">Groups you're already in.</h3>
        {this.state.filteredGroups.map((group) => (
          <Card.Body>
            <Card.Title>{group.leader}'s Group</Card.Title>
            <Card.Text>
              <ListGroup.Item variant="dark">Other Members:</ListGroup.Item>
              {group.teammates.map((teammate) => (
                <ListGroup.Item variant="flush">{teammate}</ListGroup.Item>
              ))}
            </Card.Text>
            <LinkContainer to={`/group/${group.id}`}>
              <Button>More Info</Button>
            </LinkContainer>
          </Card.Body>
        ))}
      </div>
    );
  }
}
