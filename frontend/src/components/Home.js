import { LinkContainer } from "react-router-bootstrap";
import { Button, Jumbotron, Card, ListGroup } from "react-bootstrap";
import NavBar from "components/NavBar";
import axios from "axios";
import { config } from "Constants";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "components/auth/UserContext";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const { value } = useContext(UserContext);

  const filterGroupsOnName = () => {
    return groups.filter(
      (group) =>
        group.leader === value ||
        group.teammates.some((member) => member === value)
    );
  };

  useEffect(() => {
    const getGroups = async () => {
      await axios
        .get(`${config.API_URL}/group/`)
        .then((res) => {
          const group = res.data;
          setGroups(group);
          console.log(group);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    document.title = "Home";
    getGroups();
  }, []);

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
        <h3 className="groupsHome">Groups you're already in.</h3>
        <div>
          {filterGroupsOnName().map((group) => (
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
      </Jumbotron>
    </div>
  );
};

export default Home;
