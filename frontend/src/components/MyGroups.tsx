import NavBar from "components/NavBar";
import { UserContext } from "components/auth/UserContext";
import { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card, ListGroup } from "react-bootstrap";
import { GroupT } from "types/types";
import { getGroups } from "common/api";

interface Props {}

interface State {
  filteredGroups: GroupT[];
}

export default class MyGroups extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredGroups: [],
    };
  }

  static override contextType = UserContext;

  override async componentDidMount() {
    this.setState({ filteredGroups: await getGroups() }, () =>
      this.filterMyGroups()
    );
  }

  filterMyGroups = () => {
    const user = this.context.user;
    console.log("Groups");
    console.log(this.state.filteredGroups);
    this.setState({
      filteredGroups: this.state.filteredGroups.filter(
        (gr) => gr.leader === user || gr.teammates.includes(user.split(" ")[0])
      ),
    });
  };

  override render() {
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
